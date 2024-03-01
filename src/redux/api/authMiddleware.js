import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authenticationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${String(import.meta.env.VITE_BACKEND_URL)}/api/v1/`,
  credentials: "include",
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 401) {
//     console.log("Sending refresh token...");
//     // Send refresh token to get new access token
//     const refreshResult = await baseQuery("user/token", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().authentication.user;
//       // Store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // Retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// };

// const api = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });

const api = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});

export default api;
