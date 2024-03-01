import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaCircle } from "../../../utils/iconExports.js";
import { Modal, CustomInput } from "../../index.js";
import getPriorityIconColor from "../../../utils/getPriorityIconColor.js";
import getDefaultFormData from "../../../utils/getDefaultFormData.js";
import { getFormattedDate } from "../../../utils/getFormatedDate.js";
import {
  useAddTodoMutation,
  useEditExistingTodoMutation,
} from "../../../redux/api/todoApi.js";
import styles from "./AddEditModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditModal = ({ isOpen, setIsOpen, editTodo }) => {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    editTodo ? editTodo : getDefaultFormData()
  );
  const [startDate, setStartDate] = useState(
    formData?.dueDate ? formData.dueDate : null
  );

  useEffect(() => {
    setStartDate(formData?.dueDate || null);
  }, [formData?.dueDate]);

  const formattedStartDate = startDate
    ? getFormattedDate("3", startDate)
    : "Select Due Date";

  const [addTodo, { isLoading: addTodoLoading }] = useAddTodoMutation();
  const [editExistingTodo, { isLoading: editTodoLoading }] =
    useEditExistingTodoMutation();

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextInputChange = (index, newText) => {
    const updatedTodoItems = [...formData?.todoItems];
    updatedTodoItems[index].todoText = newText;
    setFormData({ ...formData, todoItems: updatedTodoItems });
  };

  const handleCheckboxChange = (index) => {
    const newTodoItems = [...formData?.todoItems];
    newTodoItems[index].isComplete = !newTodoItems[index].isComplete;
    setFormData((prevData) => ({
      ...prevData,
      todoItems: newTodoItems,
    }));
  };

  const handleDeleteTodoItem = (index) => {
    const filteredTodos = formData.todoItems.filter((_, i) => i !== index);
    setFormData({ ...formData, todoItems: filteredTodos });
  };

  const handleAddNewTodo = () => {
    setFormData((prevData) => ({
      ...prevData,
      todoItems: [...prevData.todoItems, { todoText: "", isComplete: false }],
    }));
  };

  const validateFormData = () => {
    if (!formData.title) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.priority) {
      toast.error("Priority is required");
      return false;
    }
    if (
      formData.todoItems.length === 0 ||
      !formData.todoItems.some((item) => item.todoText.trim())
    ) {
      toast.error("At least one checklist item is required");
      return false;
    }
    return true;
  };

  const mutationFunction = editTodo ? editExistingTodo : addTodo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateFormData()) {
      try {
        const res = await mutationFunction(formData).unwrap();

        if (res?.success) {
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res?.error.data.message);
        }
      } catch (error) {
        console.error("Operation failed:", error);
        toast.error("Operation failed. Please try again.");
      }
    } else {
      console.log("Form data is not valid");
    }
  };

  const priorityOptions = ["High", "Moderate", "Low"];

  const renderTodoItems = useMemo(
    () =>
      formData.todoItems.map((todoItem, index) => (
        <CustomInput
          key={index}
          value={todoItem.todoText}
          checked={todoItem.isComplete}
          onCheckboxChange={() => handleCheckboxChange(index)}
          onTextInputChange={(event) =>
            handleTextInputChange(index, event.target.value)
          }
          isDelete={true}
          onDelete={() => handleDeleteTodoItem(index)}
          isReadOnly={false}
        />
      )),
    [formData.todoItems]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalWidth={666}>
      <form onSubmit={handleSubmit} className={styles.formFields}>
        <div className={styles.formFieldTitle}>
          <label htmlFor="title">
            Title<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Task Title"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.formFieldPriority}>
          <label>
            Select Priority<span className={styles.required}>*</span>
          </label>
          {priorityOptions.map((priority) => (
            <div
              key={priority}
              className={styles.priorityOption}
              style={{
                backgroundColor:
                  formData?.priority === priority ? "#eeecec" : "",
              }}
            >
              <div
                className={styles.priorityTab}
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, priority }))
                }
              >
                <FaCircle
                  className={styles.dotIcon}
                  style={{ color: getPriorityIconColor(priority) }}
                />
                <span className={styles.priorityText}>{priority} Priority</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.formFieldTodoItems}>
          <label htmlFor="dueDate">
            Checklist{" "}
            <span>
              (
              {
                formData?.todoItems.filter((todoItem) => todoItem.isComplete)
                  .length
              }
              /{formData?.todoItems.length})
            </span>
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.todoItems}>
            <div className={styles.todoItemsScroll}>{renderTodoItems}</div>
            <div className={styles.addNew} onClick={handleAddNewTodo}>
              <FaPlus className={styles.plusIcon} id="addNew" />
              <span htmlFor="addNew">Add New</span>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.footer}>
        <div className={styles.formFieldDueDate}>
          {datePickerIsOpen && (
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setDatePickerIsOpen(false);
              }}
              onClickOutside={() => setDatePickerIsOpen(false)}
              inline
            />
          )}
          <button
            className={`${styles.dueDateButton} ${styles.button}`}
            onClick={() => {
              setDatePickerIsOpen(true);
            }}
          >
            {formattedStartDate}
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setIsOpen(false)}
            className={`${styles.cancelButton} ${styles.button}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`${styles.submitButton} ${styles.button}`}
            disabled={addTodoLoading || editTodoLoading}
          >
            {editTodoLoading || addTodoLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditModal;
