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

    const addedWord = { word, wordClass: wordClass.toLowerCase(), category: setWordCategory(wordClass) ,translations }
    console.log(addedWord)

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
  <Container>


      {isError && <p className="text-danger">{error.data?.message}</p>}
      {isSuccess && <p className="text-success">Word added!</p>}

      <Form
        id="form"
        className="w-100 d-flex flex-column align-items-center justify-content-evenly p-2"
      >

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label htmlFor="wordInput" className="fs-3">
            Word
          </Form.Label>
          <Form.Control
            id="wordInput"
            className="border-2 border-black fs-4"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label htmlFor="categorySelect" className="fs-3">
            Word Class
          </Form.Label>
          <Form.Select
            id="categorySelect"
            className="border-2 border-black fs-4"
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

        <Form.Group className="w-75 d-flex flex-column my-3">

          {translations.map((transl, index) => (
            <div key={index} className="d-flex flex-column">
              <Form.Label
                htmlFor={`inputTranslation_${index + 1}`}
                className="fs-3"
              >
                Translation {index + 1}
              </Form.Label>

              <Form.Control
                id={`inputTranslation_${index + 1}`}
                className="border-2 border-black fs-4"
                value={transl}
                onChange={(e) =>
                  handleTranslationChange(index, e.target.value)
                }
                placeholder={`Translation ${index + 1}`}
                style={
                  isLastTranslation(index + 1)
                    ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                    : {}
                }
              />
            </div>
          ))}

          {!translationLength(2) && canAddNewTranslation && (
            <Button
              id="btnAddTranslation"
              type="button"
              className="fs-6"
              style={
                translationLength(1)
                  ? { ...style.translationInput, borderRadius: 0 }
                  : {
                      ...style.translationInput,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }
              }
              onClick={handleAddTranslation}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              {" "}Add new translation
            </Button>
          )}

          {translationLength(1) && (
            <Button
              id="btnRemoveTranslation"
              type="button"
              className="fs-6"
              style={{
                color: "rgb(255, 32, 32)",
                backgroundColor: "white",
                border: "2px solid rgb(255, 32, 32)",
                borderTop: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              onClick={handleRemoveTranslation}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
              {" "}Remove translation
            </Button>
          )}
        </Form.Group>

        <Button
          id="btnAddWord"
          type="button"
          className="w-75 mt-3 mb-3 fs-3"
          style={{ backgroundColor: "rgb(32,32,64)", border: 0 }}
          disabled={!canSave}
          onClick={handleAddWord}
        >
          Add new word
        </Button>

      </Form>
  </Container>
)
}

export default AddWord