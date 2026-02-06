import { useGetWordsQuery } from "./wordsApiSlice"
import WordsQueueComponent from "./WordsQueue"
import WordsQueue from "../../utils/classes/WordsQueue"
import { useSelector } from "react-redux"
import { makeWordsSelectors } from "./wordsApiSlice"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Error from '../../components/Error'
import Loading from '../../components/Loading'

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
        content = <Loading />

    } else if (isError) {
        content = <Error error={error} />
    } else if (isSuccess) {
        const wordsQueue = new WordsQueue(ids)
        content =
            <>
                <WordsQueueComponent wordsQueue={wordsQueue} />
            </>
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-center vh-100">
                {content}
            </div >
        </Container >
    )
}

export default Words