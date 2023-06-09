import { apiSlice } from "../api/apiSlice";
import { addteams } from "./teamsSlice";

export const teamsApi = apiSlice.injectEndpoints({
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?email=${email}`,
      providesTags: ["teams"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "teams",
            JSON.stringify({
              teams: result.data,
            })
          );
          dispatch(
            addteams({
              teams: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teams"],
    }),
    editTeam: builder.mutation({
      query: (data) => {
        return {
          url: `/teams/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => {
        return {
          url: `/teams/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
