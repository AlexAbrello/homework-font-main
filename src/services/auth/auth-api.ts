import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<MeResponse | null, void>({
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: `v1/auth/me`,
            method: 'GET',
          })

          if (result.error) {
            // but refetch on another error
            return { data: null }
          }

          return { data: result.data } as { data: MeResponse }
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: data => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: data,
          }
        },
        transformErrorResponse: (response: any) => console.log(response),
        invalidatesTags: ['Me'],
      }),
      registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
        query: ({ email, password }) => {
          return {
            url: 'v1/auth/sign-up',
            method: 'POST',
            body: { email, password },
          }
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: 'v1/auth/logout',
            method: 'POST',
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Me'],
      }),
      editPersonalInfo: builder.mutation<MeResponse, EditArgs>({
        query: (args) => {

          const formData = new FormData()

          args.avatar && formData.append('avatar', args.avatar)

          return {
            url: 'v1/auth/me',
            method: 'PATCH',
            body: formData,
            formData: true,
          }
        },
        invalidatesTags: ['Me'],
      })
    }
  },
})


export const { useLoginMutation, useMeQuery, useRegistrationMutation, useLogoutMutation, useEditPersonalInfoMutation } = authApi

export type MeResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

type LoginResponse = {
  accessToken: string
}

type LoginRequest = {
  password: string
  email: string
  rememberMe: boolean
}

type RegistrationResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

type RegistrationRequest = {
  html: string
  name: string
  password: string
  email: string
  subject: string
  sendConfirmationEmail: boolean
}

type EditArgs = {
  avatar: string
  name: string
  email: string
}
