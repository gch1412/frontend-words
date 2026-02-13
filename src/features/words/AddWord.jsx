import { useState, useEffect } from "react"

import { Form } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Button } from "react-bootstrap"

import setWordCategory from "../../utils/functions/setWordCategory"
import { useAddWordMutation } from "../words/wordsApiSlice"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons"

const AddWord = () => {

  const [addWord, { isLoading, isSuccess, isError, error }] = useAddWordMutation()

  const [word, setWord] = useState('')
  const [wordClass, setWordClass] = useState('')
  const [translations, setTranslations] = useState([""])

  const allTranslationsAreValid = translations.every(Boolean)

  const canAddNewTranslation = Boolean(translations[translations.length - 1]) === true

  const canSave = [word, wordClass, translations].every(Boolean) && allTranslationsAreValid && !isLoading

  const handleTranslationChange = (index, value) => {
    setTranslations(prev =>
      prev.map((t, i) => (i === index ? value : t))
    )
  }

  const handleAddTranslation = () => {
    setTranslations(prev => [...prev, ""])
  }

  const handleRemoveTranslation = () => {
    setTranslations(prev => prev.filter((_, i) => i < prev.length - 1))
  }

  const translationLength = (len) => {
    if (translations.length > len) return true

    else return false
  }

  const isLastTranslation = (index) => {
    if (index === translations.length) return true

    else return false
  }

  const style = {
    translationInput: {
      color: "rgb(32, 32, 64)",
      backgroundColor: "white",
      border: "2px solid rgb(32, 32, 64)",
      borderTop: 0,
    }
  }

  const handleAddWord = async (e) => {
    e.preventDefault()

    const addedWord = { word, wordClass: wordClass.toLowerCase(), category: setWordCategory(wordClass), translations }


    if (!addedWord.word || !addedWord.wordClass || !addedWord.translations) {
      return new Error('All fields and required!')
    }

    if (!addedWord.translations.every(Boolean)) {
      return new Error('No translation must be an empty string!')
    }

    if (!addedWord.translations.length > 3) {
      return new Error('There should be at most three translations!')
    }

    if (canSave) {
      await addWord({ ...addedWord })
    }
  }

  useEffect(() => {
    setWord("")
    setWordClass("")
    setTranslations([""])
  }, [isSuccess])

  return (
    <Container className="d-flex justify-content-center align-items-start py-4">
      <div className="w-100" style={{ maxWidth: "720px"}}>

        {isError && <p className="text-danger">{error.data?.message}</p>}
        {isSuccess && <p className="text-success">Word added!</p>}

        <Form
          id="form"
          className="border rounded p-4 d-flex flex-column align-items-center"
        >

          <Form.Group className="w-100 my-3">
            <Form.Label htmlFor="wordInput" className="fs-4">
              Word
            </Form.Label>
            <Form.Control
              id="wordInput"
              className="border-2 border-black fs-5"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="w-100 my-3">
            <Form.Label htmlFor="categorySelect" className="fs-4">
              Word Class
            </Form.Label>
            <Form.Select
              id="categorySelect"
              className="border-2 border-black fs-5"
              value={wordClass}
              onChange={(e) => setWordClass(e.target.value)}
            >
              <option value="">---</option>
              <option value="Noun">Noun</option>
              <option value="Article">Article</option>
              <option value="Numeral">Numeral</option>
              <option value="Pronoun">Pronoun</option>
              <option value="Adjective">Adjective</option>
              <option value="Adverb">Adverb</option>
              <option value="Verb">Verb</option>
              <option value="Preposition">Preposition</option>
              <option value="Conjunction">Conjunction</option>
              <option value="Interjection">Interjection</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="w-100 my-3">
            {translations.map((transl, index) => (
              <div key={index} className="d-flex flex-column mb-2">
                <Form.Label className="fs-4">
                  Translation {index + 1}
                </Form.Label>
                <Form.Control
                  className="border-2 border-black fs-5"
                  value={transl}
                  onChange={(e) =>
                    handleTranslationChange(index, e.target.value)
                  }
                  placeholder={`Translation ${index + 1}`}
                />
              </div>
            ))}

            {!translationLength(2) && canAddNewTranslation && (
              <Button
                type="button"
                className="fs-6 mt-2"
                style={style.translationInput}
                onClick={handleAddTranslation}
              >
                <FontAwesomeIcon icon={faPlusCircle} /> Add new translation
              </Button>
            )}

            {translationLength(1) && (
              <Button
                type="button"
                className="fs-6 mt-2"
                style={{
                  color: "rgb(255, 32, 32)",
                  backgroundColor: "white",
                  border: "2px solid rgb(255, 32, 32)",
                }}
                onClick={handleRemoveTranslation}
              >
                <FontAwesomeIcon icon={faMinusCircle} /> Remove translation
              </Button>
            )}
          </Form.Group>

          <Button
            type="button"
            className="w-100 mt-4 fs-4"
            style={{ backgroundColor: "rgb(32,32,64)", border: 0 }}
            disabled={!canSave}
            onClick={handleAddWord}
          >
            Add new word
          </Button>

        </Form>
      </div>
    </Container>
  )
}

export default AddWord