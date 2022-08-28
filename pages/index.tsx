import type {NextPage} from 'next'
import AppLayout from "../src/components/AppLayout";
import Home from "../src/components/Home";
import {Button} from "antd";
import {useRouter} from "next/router";
import {useCallback} from "react";

const HomePage: NextPage = () => {

    const router = useRouter()

    const redirectTo = useCallback((path: string) => {
        router.replace(path).finally(() => Promise.resolve())
    }, [router])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('re_token')
        localStorage.removeItem('ex_token')
        redirectTo('/login')
    }, [])

    return (<AppLayout logout={<Button type="primary" onClick={logout}>Logout</Button>}>
            <Home/>
        </AppLayout>
    )
}

export default HomePage
