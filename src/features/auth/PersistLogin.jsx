import { Outlet, Link } from "react-router-dom"
import { selectCurrentToken } from "./authSlice"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [persistSuccess, setPersistSuccess] = useState(false)

    const [refresh,
        {
            isUninitialized,
            isLoading,
            isSuccess,
            isError,
            error
        }
    ] = useRefreshMutation()

    useEffect(() => {
        const persistRefresh = async () => {

            try {
                await refresh()

                setPersistSuccess(true)
            } catch (err) {
                console.error(err)
            }
        }

        if (persist && !token) persistRefresh()

    }, [])

    let content

    if (!persist) {
        content = <Outlet />
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        console.log('error')
        content = <p>
            {error.data?.message}
            <Link to="/login">Please, login again</Link>
        </p>
    } else if (isSuccess && persistSuccess) {
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet />
    }

    return content
}

export default PersistLogin