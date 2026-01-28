import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDeleteWordMutation } from "./wordsApiSlice"
import { makeWordsSelectors } from "./wordsApiSlice"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const WordsList = ({ handleShowWordsList }) => {
  const params = useParams()
  const { category } = useParams()
  const navigate = useNavigate()

  const [selectedWord, setSelectedWord] = useState("")
  const [id, setId] = useState(0)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [searchTermEnglish, setSearchTermEnglish] = useState("")
  const [searchTermPortuguese, setSearchTermPortuguese] = useState("")

  const { selectAll } = makeWordsSelectors(category)

  const words = useSelector((state) => selectAll(state))

  const [deleteWord, { isSuccess, isError, error }] = useDeleteWordMutation()

  const handleShowModalDelete = (word) => {
    setSelectedWord(word.word)
    setId(word.id)
    setShowModalDelete(true)
  }

  const handleDelete = async (id, category) => {
    const wordToDelete = { id, category }

    setShowModalDelete(false)
    setSearchTermEnglish("")

    await deleteWord(wordToDelete).unwrap()
  }

  const handleSearchEnglish = (value) => {
    setSearchTermEnglish(value)
  }

  const handleSearchPortuguese= (value) => {
    setSearchTermPortuguese(value)
  }

  const displayedWords = searchTermEnglish ? words.filter((word) => word.word.toLowerCase().includes(searchTermEnglish.toLowerCase())) : searchTermPortuguese ? words.filter((word) => word.translations.some(transl => transl.toLowerCase().includes(searchTermPortuguese.toLowerCase()))) : words


  return (
    <Container className="min-vh-50 d-flex flex-column align-items-center">

      <Button id="btnList" className="mb-4" onClick={handleShowWordsList}>
        Voltar
      </Button>

      <Modal show={showModalDelete} centered>
        <Modal.Header>
          <h2>Deletar palavra?</h2>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar <b>{selectedWord} (id = {id})</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleDelete(id, category)}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      <Form className="w-100 mb-5" style={{ backgroundColor: "transparent" }}>
        {!searchTermPortuguese && <Form.Control className="w-100 w-md-75 border-1 border-black fs-3 mb-3" placeholder="Search term in English" value={searchTermEnglish} onChange={(e) => handleSearchEnglish(e.target.value)} />}

        {!searchTermEnglish && <Form.Control className="w-100 w-md-75 border-1 border-black fs-3 mt-3" placeholder="Search term in Portuguese" value={searchTermPortuguese} onChange={(e) => handleSearchPortuguese(e.target.value)} />}


      </Form>

      {!displayedWords.length ? (<p>Não há palavras para serem mostradas</p>) : displayedWords.map(word => (
        <Card
          key={word.id}
          id={`word_${word.id}`}
          className="w-100 w-md-75 d-flex flex-column mt-3 mb-3 border-1 border-black"
        >
          <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">

            <Card.Text className="fs-4 m-0 text-center text-md-start">
              {word.word}
            </Card.Text>

            <div className="fs-5 text-center text-md-start">
              {word.translations.length > 1 ? (
                <ol className="mb-0">
                  {word.translations.map((trans, i) => (
                    <li key={`translation_${word.id}_${i}`}>{trans}</li>
                  ))}
                </ol>
              ) : (
                <p className="mb-0">{word.translations[0]}</p>
              )}
            </div>

          </Card.Body>

          {word.custom && (
            <Card.Footer className="d-flex align-items-center justify-content-around">

              <Link to={`/words/${category}/${word.id}`}>
                <FontAwesomeIcon icon={faPencil} />
              </Link>

              <Button onClick={() => handleShowModalDelete(word)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>

            </Card.Footer>
          )}
        </Card>
      ))}
    </Container>
  )
}

export default WordsList