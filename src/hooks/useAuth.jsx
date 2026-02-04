import { selectCurrentToken } from "../features/auth/authSlice"
import { useSelector } from "react-redux"

const useAuth = () => {

    const token = useSelector(selectCurrentToken)

    if (token) {
        return { accessToken: token }
    }

    return { accessToken: undefined }
}

export default useAuth