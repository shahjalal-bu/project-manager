import { apiSlice } from "../api/apiSlice";
export const projectsApi = apiSlice.injectEndpoints({
  tagTypes: ["projects"],
  endpoints: (builder) => ({
    getProject: builder.query({
      query: (email) => {
        
        return `/projects?email=${email}`;
      },
      providesTags: ["projects"],
    }),
    updateColumn: builder.mutation({
      query: ({ _id, data }) => {
        return {
          url: `/projects/${_id}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        

        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProject",
            arg.data.userEmail,
            (draft) => {
              const matchDraftProject = draft.find((el) => el._id == arg._id);
              matchDraftProject.column = arg.data.column;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    addProjects: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => {
     
        return {
          url: `/projects/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectQuery,
  useUpdateColumnMutation,
  useAddProjectsMutation,
  useDeleteProjectMutation,
} = projectsApi;
