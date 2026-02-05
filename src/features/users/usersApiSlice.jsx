import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const {
    useCreateUserMutation
} = usersApiSlice