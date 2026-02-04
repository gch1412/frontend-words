import { useState, useEffect } from "react"

const usePersist = () => {

    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persistLangApp")) || false)

    useEffect(()=>{
        localStorage.setItem("persistLangApp", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}

export default usePersist