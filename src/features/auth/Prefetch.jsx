import { store } from '../../app/store'
import { wordsApiSlice } from '../words/wordsApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useParams } from 'react-router-dom'


const Prefetch = () => {

    const params = useParams()
    const category = params.category
    
    useEffect(() => {
        store.dispatch(wordsApiSlice.util.prefetch('getWords', category))
    }, [category])

    return <Outlet/>
}

export default Prefetch