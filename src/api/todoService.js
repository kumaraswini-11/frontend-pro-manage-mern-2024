import axiosInstance from "./axiosConfig";

export const getTodoAnalytics = async (todoId, signal) => {
  const endpoint = "/todo/delete";
  const response = await axiosInstance.post(endpoint, todoId, {
    signal,
  });
  return response.data;
};

export const addTodo = async (addNewTodo, signal) => {
  const endpoint = "/todo/add";
  const response = await axiosInstance.post(endpoint, addNewTodo, {
    signal,
  });
  return response.data;
};

export const editTodo = async (editTodo, signal) => {
  const endpoint = "/todo/edit";
  const response = await axiosInstance.post(endpoint, editTodo, {
    signal,
  });
  return response.data;
};

export const deleteTodo = async (deleteTodo, signal) => {
  const endpoint = "/todo/delete";
  const response = await axiosInstance.delete(endpoint, deleteTodo, {
    signal,
  });
  return response.data;
};
