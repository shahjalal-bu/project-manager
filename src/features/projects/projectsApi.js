import { apiSlice } from "../api/apiSlice";
export const messagesApi = apiSlice.injectEndpoints({
  tagTypes: ["projects"],
  endpoints: (builder) => ({
    getProject: builder.query({
      query: (email) => `/projects`,
      // `/projects?teammembers_like=${email}&_sort=createat&_order=desc`,
      providesTags: ["projects"],
    }),
    updateColumn: builder.mutation({
      query: ({ _id, data }) => {
        console.log(data);
        return {
          url: `/projects/${_id}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProject",
            arg.data.userEmail,
            (draft) => {
              console.log(draft);
              const draftProject = draft.find((c) => c._id == arg._id);
              draftProject.column = arg.data.column;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getProject",
              data.creator.email,
              (draft) => {
                draft.unshift(data);
              }
            )
          );
        } catch {}
      },
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectQuery,
  useUpdateColumnMutation,
  useAddProjectsMutation,
  useDeleteProjectMutation,
} = messagesApi;
