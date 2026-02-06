import { useGetWordsQuery } from "./wordsApiSlice"
import WordsQueueComponent from "./WordsQueue"
import WordsQueue from "../../utils/classes/WordsQueue"
import { useSelector } from "react-redux"
import { makeWordsSelectors } from "./wordsApiSlice"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

const Words = () => {
    const { category } = useParams()

    const location = useLocation()

    const {
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetWordsQuery(category, {
        skip: !category,
        refetchOnMountOrArgChange: true
    })

    const { selectIds } = makeWordsSelectors(category)
    const ids = useSelector(selectIds)

    let content

    if (isLoading) {
        content = <p>Loading...</p>

    } else if (isError) {
        content = <p>{error.code} - {error.message}</p>
    } else if (isSuccess) {
        const wordsQueue = new WordsQueue(ids)
        content =
            <>
                <WordsQueueComponent wordsQueue={wordsQueue} />
            </>
    }

    return content
}

export default Words