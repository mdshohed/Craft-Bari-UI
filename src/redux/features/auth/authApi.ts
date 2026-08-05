import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    login: builder.mutation({
      query: ( userInfo ) => {        
        return {
          url: '/auth/login',
          method: 'POST',
          body: userInfo, 
        }
      }
    }),
    userSignUp: builder.mutation({
      query: ( userInfo ) => {  
        console.log("auto", {userInfo})      
        return {
          url: '/auth/register',
          method: 'POST',
          body: userInfo, 
        }
      }
    }),
    // vendorSignUp: builder.mutation({
    //   query: ( userInfo ) => {        
    //     return {
    //       url: '/user/create-vendor',
    //       method: 'POST',
    //       body: userInfo, 
    //     }
    //   }
    // })
  })
})

export const { useLoginMutation, useUserSignUpMutation } = authApi; 