import { useState, useEffect } from 'react'
import React from 'react'

import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

import { useUpdateWordMutation } from './wordsApiSlice'
import { makeWordsSelectors } from './wordsApiSlice'
import { useSelector } from 'react-redux'
import capitalizeFirstLetter from '../../utils/functions/capitzalize'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import setwordCategory from '../../utils/functions/setWordCategory'

const EditWord = () => {

  const [updateWord, { isLoading, isSuccess, isError, error }] = useUpdateWordMutation()

  const style = {
    translationInput: {
      color: "rgb(32, 32, 64)",
      backgroundColor: "white",
      border: "2px solid rgb(32, 32, 64)",
      borderTop: 0,
    }
  }

  const navigate = useNavigate()
  const params = useParams()
  const category = params.category
  const id = parseInt(params.id)

  const { selectById } = makeWordsSelectors(category)

  const word = useSelector(state => selectById(state, id))

  const [updatedWord, setUpdatedWord] = useState("")
  const [wordClass, setWordClass] = useState('')
  const [previousCategory, setPreviousCategory] = useState("")
  const [nextCategory, setNextCategory] = useState("")
  const [updateTranslations, setUpdateTranslations] = useState([""])
  const [custom, setCustom] = useState(false)

  useEffect(() => {
    if (word) {
      setUpdatedWord(word.word)
      setWordClass(word.wordClass)
      setPreviousCategory(setwordCategory(word.wordClass))
      setNextCategory(setwordCategory(word.wordClass))
      setUpdateTranslations(word.translations)
      setCustom(true)
    }
  }, [word])

  useEffect(() => {
    setNextCategory(setwordCategory(wordClass))
  }, [wordClass])

  const allTranslationsAreValid = updateTranslations.every(Boolean)

  const canAddNewTranslation = Boolean(updateTranslations[updateTranslations.length - 1]) === true

  const canSave = [updatedWord, wordClass, updateTranslations].every(Boolean) && allTranslationsAreValid

  const handleTranslationChange = (index, value) => {
    setUpdateTranslations(prev => prev.map((t, i) => i === index ? value : t))
  }

  const handleAddTranslation = () => {
    setUpdateTranslations(prev => [...prev, ""])
  }

  const handleRemoveTranslation = () => {
    setUpdateTranslations(prev => prev.filter((_, i) => i < prev.length - 1))
  }

  const translationLength = (len) => {
    if (updateTranslations.length > len) return true

    else return false
  }

  const isLastTranslation = (index) => {
    if (index === updateTranslations.length) return true

    else return false
  }

  const handleWordUpdate = async (e) => {
    e.preventDefault()

    const newWordUpdated = { id: id, word: updatedWord, previousCategory, wordClass: wordClass.toLowerCase(), nextCategory, translations: updateTranslations, custom: custom }

    console.log(newWordUpdated)

    if (!newWordUpdated.word || !newWordUpdated.wordClass || !newWordUpdated.previousCategory || !newWordUpdated.nextCategory || !newWordUpdated.translations) {
      return new Error('All fields and required!')
    }

    if (!newWordUpdated.translations.every(Boolean)) {
      return new Error('No translation must be an empty string!')
    }

    if (!newWordUpdated.translations.length > 3) {
      return new Error('There should be at most three translations!')
    }

    if (canSave) {
      await updateWord(newWordUpdated).unwrap()

      setTimeout(() => {
        navigate(`/words/${nextCategory}`, { state: { params } })
      }, 750)
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "720px" }}>

        <p className="text-danger">{isError && error.data?.message}</p>
        {isSuccess && <p className="text-success">Word updated!</p>}

        <Form
          id="form"
          className="w-100 d-flex flex-column align-items-center p-2"
          onSubmit={handleWordUpdate}
        >

          <Form.Group className="w-100 d-flex flex-column my-3">
            <Form.Label htmlFor="wordInput" className="fs-3">
              Word
            </Form.Label>
            <Form.Control
              id="wordInput"
              className="border-2 border-black fs-4"
              value={updatedWord}
              onChange={(e) => setUpdatedWord(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="w-100 d-flex flex-column my-3">
            <Form.Label htmlFor="categorySelect" className="fs-3">
              Word Class
            </Form.Label>
            <Form.Select
              id="categorySelect"
              className="border-2 border-black fs-4"
              value={capitalizeFirstLetter(wordClass)}
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

          <Form.Group className="w-100 d-flex flex-column my-3">
            {updateTranslations.map((transl, index) => (
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
                <FontAwesomeIcon icon={faPlusCircle} /> Add new translation
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
                <FontAwesomeIcon icon={faMinusCircle} /> Remove translation
              </Button>
            )}
          </Form.Group>

          <Button
            id="btnUpdateWord"
            type="submit"
            className="w-100 mt-3 mb-3 fs-3"
            style={{ backgroundColor: "rgb(32,32,64)", border: 0 }}
            disabled={!canSave}
          >
            Update word
          </Button>

        </Form>
      </div>
    </Container>
  )
}

export default EditWord