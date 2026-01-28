import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://backend-words-pc6d.vercel.app',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set(`Token ${token}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Words'],
    endpoints: builder => ({})
})