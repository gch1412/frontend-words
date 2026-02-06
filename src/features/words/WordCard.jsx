import { useState } from "react"
import { useSelector } from "react-redux"
import { makeWordsSelectors } from "./wordsApiSlice"
import { Button } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"

const WordCard = ({ id, handlePreviousClicked, handleNextClicked, handleShowWordsList }) => {

  const [showTranslation, setShowTranslation] = useState(false)

  const { category } = useParams()
  const { selectById, selectIds } = makeWordsSelectors(category)

  const word = useSelector(state => selectById(state, id))
  const ids = useSelector(state => selectIds(state))

  const onPreviousClicked = () => {
    handlePreviousClicked()
    setShowTranslation(false)
  }

  const onNextClicked = () => {
    handleNextClicked()
    setShowTranslation(false)
  }

  const canClickPrevious = id === 1 ? false : true
  const canClickNext = id === ids.length ? false : true

  let wordContent

  if (word.translations.length > 1) {
    wordContent = <ol>
      {word.translations.map((trans, id) => <li key={id}>{trans}</li>)}
    </ol>
  } else if (word.translations) {
    wordContent = <p>{word.translations[0]}</p>
  } else {
    wordContent = <p>Não há traduções informadas para a palavra {word.word}</p>
  }

  return (
    <Card className="vh-75 w-100 d-flex align-items-center justify-content-around flex-row border-1 border-black mb-5">
      <Button onClick={onPreviousClicked} disabled={!canClickPrevious}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Card.Body className="h-100 w-50 d-flex flex-column align-items-center justify-content-evenly">
        <div className="h-25">
          <p className="fs-1 my-0">{word.word}</p>
          <p className="fs-6 my-0">{word.wordClass}</p>
        </div>
        <div className="fs-4 d-flex flex-column align-items-center justify-content-around h-50">
          {showTranslation ? (
            wordContent
          ) : (
            <Button onClick={() => setShowTranslation(true)}>
              Mostrar tradução
            </Button>
          )}
          <Button onClick={handleShowWordsList}>
            Ver todos
          </Button>
        </div>
      </Card.Body>
      <Button onClick={onNextClicked} disabled={!canClickNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </Card>
  )
}

export default WordCard