import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import capitalizeFirstLetter from "../../utils/functions/capitzalize";

const wordsAdapter = createEntityAdapter({})

const initialState = wordsAdapter.getInitialState()

export const wordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWords: builder.query({
            query: (category) => ({
                url: `/words/${category}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: (response) => {
                return wordsAdapter.setAll(initialState, response)
            },
            providesTags: (result, error, category) => {
                if (result?.ids) {
                    return [
                        { type: 'Words', id: `${capitalizeFirstLetter(category)}` },
                        ...result.ids.map(id => ({ type: 'Words', id: `${category}_${id}` }))
                    ]
                } else return [{
                    type: 'Words', id: `${capitalizeFirstLetter(category)}`
                }]
            }
        }),

        addWord: builder.mutation({
            query: newWordData => ({
                url: '/words/',
                method: 'POST',
                body: {
                    ...newWordData
                }
            }),
            invalidatesTags: (result, error, newWordData) => [
                {
                    type: 'Words',
                    id: capitalizeFirstLetter(newWordData.category)
                }
            ]
        }),
        updateWord: builder.mutation({
            query: wordData => ({
                url: '/words/',
                method: 'PATCH',
                body: {
                    ...wordData
                }
            }),
            invalidatesTags: (result, error, wordData) => {
                const tags = []

                tags.push({
                    type: 'Words',
                    id: `CATEGORY_${wordData.previousCategory}`
                })

                tags.push({
                    type: 'Words',
                    id: `${wordData.previousCategory}_${wordData.id}`
                })

                if (wordData.previousCategory !== wordData.nextCategory) {
                    tags.push({
                        type: 'Words',
                        id: `CATEGORY_${wordData.nextCategory}`
                    })

                    tags.push({
                        type: 'Words',
                        id: `${wordData.nextCategory}_${wordData.id}`
                    })
                }

                return tags
            }
        }),

        deleteWord: builder.mutation({
            query: wordData => ({
                url: '/words',
                method: 'DELETE',
                body: {
                    ...wordData
                }
            }),
            invalidatesTags: (result, error, wordData) => [
                { type: 'Words', id: capitalizeFirstLetter(wordData.category) },
                { type: 'Words', id: `${wordData.category}_${wordData.id}` }
            ]
        })

    })
})

export const {
    useGetWordsQuery,
    useAddWordMutation,
    useUpdateWordMutation,
    useDeleteWordMutation
} = wordsApiSlice

export const makeWordsSelectors = (arg) => wordsAdapter.getSelectors(
    (state) => wordsApiSlice.endpoints.getWords.select(arg)(state)?.data ?? initialState
)