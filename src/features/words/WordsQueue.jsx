import { useState } from 'react'
import WordCard from './WordCard'
import WordsList from './WordsList'
import { useLocation } from 'react-router-dom'

const WordsQueueComponent = ({ wordsQueue }) => {
    const location = useLocation()

    const redirectFromEdit = location.state?.params?.category && location.state?.params?.id

    const [selectedId, setSelectedId] = useState(wordsQueue.selected)
    const [showWordsList, setShowWordsList] = useState(redirectFromEdit ? true : false)

    const handlePreviousClicked = () => {
        setSelectedId(wordsQueue.previous())
    }

    const handleNextClicked = () => {
        setSelectedId(wordsQueue.next())
    }

    const handleShowWordsList = () => {
        setShowWordsList(prev => !prev)
    }

    return (
        <>
            {showWordsList ?
                <WordsList handleShowWordsList={handleShowWordsList}/> :
                <WordCard id={selectedId} handlePreviousClicked={handlePreviousClicked} handleNextClicked={handleNextClicked} handleShowWordsList={handleShowWordsList}/>
            }
        </>
    )
}

export default WordsQueueComponent