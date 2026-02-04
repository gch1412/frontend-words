import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Token ${token}`)
        }

        return headers
    }
})

const baseQueryWithReath = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)

    if(result?.error?.status === 403){
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult)

        if(refreshResult?.data){
            api.dispatch(setCredentials({...refreshResult.data}))

            result = await baseQuery(args, api, extraOptions)
        } else {
            if(refreshResult?.error?.status === 403){
                refreshResult.error.data.message = 'Your login has expired'
            }

            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReath,
    tagTypes: ['Words'],
    endpoints: builder => ({})
})