import api from "./authMiddleware";

export const todoApi = api.injectEndpoints({
  reducerPath: "todoApi",
  endpoints: (builder) => ({
    fetchAnalytics: builder.query({
      query: (userId) => `todo/analytics/${userId}`,
    }),

    addTodo: builder.mutation({
      query: (todoDetails) => ({
        url: "todo/add",
        method: "POST",
        body: todoDetails,
      }),
    }),

    editTodo: builder.mutation({
      query: (editTodoDetails) => ({
        url: "todo/edit",
        method: "PUT",
        body: editTodoDetails,
      }),
    }),

    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: "todo/delete",
        method: "DELETE",
        body: { id: todoId },
      }),
    }),

    fetchUniqueLink: builder.query({
      query: (linkId) => ({
        url: "todo/details",
        method: "GET",
        body: { linkId },
      }),
    }),
  }),
});

export const {
  useFetchAnalyticsQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useFetchUniqueLinkQuery,
} = todoApi;
