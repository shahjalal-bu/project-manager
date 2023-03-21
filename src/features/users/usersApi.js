import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetAllUserQuery, useAddUserMutation } =
  usersApi;
