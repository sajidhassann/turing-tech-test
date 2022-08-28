import {FC, ReactNode, useCallback, useEffect} from "react";
import {useRouter} from "next/router";

type AuthProviderProps = {
    children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({children}) => {

    const router = useRouter()

    const redirectTo = useCallback((path: string) => {
        router.replace(path).finally(() => Promise.resolve())
    }, [router])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            redirectTo('/')
        } else if (localStorage.getItem('re_token')) {
            // get token
        } else {
            redirectTo('/login')
        }
    }, [])

    return <>
        {children}
    </>
}

export default AuthProvider