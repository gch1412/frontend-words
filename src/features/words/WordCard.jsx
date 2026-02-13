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

    <Container className="py-4">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 64px)" }}>
        <Card className="w-100 d-flex align-items-center justify-content-around flex-row border mb-5" style={{minHeight: "500px", maxWidth: "500px"}}>
          <Button onClick={onPreviousClicked} disabled={!canClickPrevious}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Card.Body className="d-flex flex-column align-items-center gap-3 text-center">
            <div>
              <p className="fs-1 my-0">{word.word}</p>
              <p className="fs-6 my-0">{word.wordClass}</p>
            </div>

            <div className="d-flex flex-column align-items-center gap-4 fs-4">
              {showTranslation ? wordContent : (
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
      </div >
    </Container >

  )
}

export default WordCard