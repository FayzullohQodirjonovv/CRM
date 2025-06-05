import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://admin-crm.onrender.com/api/auth/',  
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: 'sign-in',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
})

export const { useSignInMutation } = authApi
