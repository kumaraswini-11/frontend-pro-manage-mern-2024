import api from "./authMiddleware";

export const todoApi = api.injectEndpoints({
  reducerPath: "todoApi",
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchAllTodosByTimePeriod: builder.query({
      // Use query parameter for timePeriod
      query: (timePeriod) => `todo/allTodos/?timePeriod=${timePeriod}`,
      // transformResponse: (response) => response.reverse(),
      providesTags: ["Todos"],
    }),

    fetchAnalytics: builder.query({
      query: (userId) => `todo/analytics/${userId}`,
      // providesTags: (result, error, userId) =>
      //   userId ? [{ type: "Todos" }] : [],
    }),

    addTodo: builder.mutation({
      query: (todoDetails) => ({
        url: "todo/add",
        method: "POST",
        body: todoDetails,
      }),
      invalidatesTags: ["Todos"],
      // async onQueryStarted(todo, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData("getTodos", undefined, (draft) => {
      //       draft.unshift(todo);
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),

    editExistingTodo: builder.mutation({
      query: (editTodoDetails) => ({
        url: "todo/edit",
        method: "PUT",
        body: editTodoDetails,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: "todo/delete",
        method: "DELETE",
        body: { id: todoId },
      }),
      invalidatesTags: ["Todos"],
    }),

    // fetchUniqueLink: builder.query({
    //   query: (linkId) => `todo/shared-todo-details/${linkId}`,
    // }),

    updateSection: builder.mutation({
      query: ({ todoId, section }) => ({
        url: "todo/update-section",
        method: "PATCH",
        body: { todoId, section },
      }),
      invalidatesTags: ["Todos"],
    }),

    updateCheckbox: builder.mutation({
      query: ({ todoItemId, isComplete }) => ({
        url: "todo/update-checkbox",
        method: "PATCH",
        body: {
          todoItemId,
          isComplete,
        },
      }),
      invalidatesTags: ["Todos"],
    }),

    fetchSharedTodoDetails: builder.query({
      query: (linkId) => `todo/shared-todo-details/?linkId=${linkId}`,
    }),
  }),
});

export const {
  useFetchAllTodosByTimePeriodQuery,
  useFetchAnalyticsQuery,
  useAddTodoMutation,
  useEditExistingTodoMutation,
  useDeleteTodoMutation,
  // useFetchUniqueLinkQuery,
  useUpdateSectionMutation,
  useUpdateCheckboxMutation,
  useFetchSharedTodoDetailsQuery,
} = todoApi;

export default todoApi;
