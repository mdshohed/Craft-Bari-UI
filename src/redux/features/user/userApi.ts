import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllUser: builder.query({
      query:  (params, data?: Record<string, any>) => {
        console.log(data);
        const queryParams = new URLSearchParams(params).toString();
        return{
          url: `/user?${queryParams}`,
          method: 'GET',
        }},
        providesTags: ["user"]
      }
    ),
    getProfile: builder.query({
      query: () => {
        return{
          url: '/user/me',
          method: 'GET',
        }},
        providesTags: ["user"]
      }
    ),
    updateProfile: builder.mutation({
      query: ( data ) => {        
        return {
          url: '/user/update-my-profile',
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ( {id, data}) => {       
        console.log("redux",id, data);
         
        return {
          url: `/user/${id}`,
          method: 'PUT',
          body: data, 
        }
      },
      invalidatesTags: ["user"],
    })
  })
})

export const { useGetAllUserQuery, useGetProfileQuery, useUpdateProfileMutation, useUpdateUserMutation} = authApi; 