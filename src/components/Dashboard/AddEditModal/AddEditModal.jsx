import React, { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaCircle } from "../../../utils/iconExports.js";
import { Modal, CustomInput } from "../../index.js";
import getPriorityIconColor from "../../../utils/getPriorityIconColor.js";
import getDefaultFormData from "../../../utils/getDefaultFormData.js";
import styles from "./AddEditModal.module.css";

const dummyData = {
  title: "",
  priority: "",
  dueDate: "",
  todoItems: [
    {
      todoText: "Text1",
      isComplete: true,
    },
    {
      todoText: "Text2",
      isComplete: false,
    },
  ],
};

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      popperPlacement="bottom-start"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "5px, 10px", // Adjust as needed
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport",
        },
      }}
    />
  );
};

const AddEditModal = ({ isOpen, setIsOpen, editTodo }) => {
  const [formData, setFormData] = useState(editTodo ?? getDefaultFormData());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const handelDeleteTodoItem = (index) => {
    const filteredTodos = formData.todoItems.filter((_, i) => i !== index);
    setFormData({ ...formData, todoItems: filteredTodos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform API call here with formData
    console.log("Form data: ", formData);
    // setIsOpen(false);
  };

  const handleAddNewTodo = () => {
    setFormData((prevData) => ({
      ...prevData,
      todoItems: [...prevData.todoItems, { todoText: "", isComplete: false }],
    }));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalWidth={666}>
      <form onSubmit={handleSubmit} className={styles.formFields}>
        {/* Title */}
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
        {/* Priority */}
        <div className={styles.formFieldPriority}>
          <label>
            Select Priority<span className={styles.required}>*</span>
          </label>
          {["High", "Moderate", "Low"].map((priority) => (
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
        {/* Todo Items */}
        <div className={styles.formFieldTodoItems}>
          <label htmlFor="dueDate">
            Checklist{" "}
            <span>
              (
              {
                formData?.todoItems?.filter((todoItem) => todoItem.isComplete)
                  .length
              }
              /{formData?.todoItems?.length})
            </span>
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.todoItems}>
            <div className={styles.todoItemsScroll}>
              {formData.todoItems.map((todoItem, index) => (
                <CustomInput
                  key={index}
                  value={todoItem.todoText}
                  checked={todoItem.isComplete}
                  onCheckboxChange={() => handleCheckboxChange(index)}
                  onTextInputChange={(event) =>
                    handleTextInputChange(index, event.target.value)
                  }
                  isDelete={true}
                  onDelete={() => handelDeleteTodoItem(index)}
                />
              ))}
            </div>
            <div className={styles.addNew} onClick={handleAddNewTodo}>
              <FaPlus className={styles.plusIcon} id="addNew" />
              <span htmlFor="addNew">Add New</span>
            </div>
          </div>
        </div>
      </form>
      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.formFieldDueDate}>
          <button
            className={`${styles.dueDateButton} ${styles.button}`}
            onClick={() => {
              setIsDatePickerOpen((prev) => !prev);
            }}
          >
            {selectedDate ? selectedDate.toDateString() : "Select Due Date"}
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
          >
            Save
          </button>
        </div>
      </div>

      {isDatePickerOpen && (
        <CustomDatePicker
          selectedDate={selectedDate}
          handleDateChange={() => {
            setSelectedDate(date);
          }}
        />
      )}
    </Modal>
  );
};

export default AddEditModal;
