import api from "./authMiddleware";

export const authenticationApi = api.injectEndpoints({
  reducerPath: "authenticationApi",
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userDetails) => ({
        url: "user/register",
        method: "POST",
        body: userDetails,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
    }),

    changePassword: builder.mutation({
      query: (newCredential) => ({
        url: "user/change-password",
        method: "POST",
        body: newCredential,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authenticationApi;
