import {NextPage} from "next";
import AppLayout from "../src/components/AppLayout";
import LoginForm from "../src/components/LoginForm";

const Login: NextPage = (): JSX.Element => {

    return <AppLayout>
        <div className="login-page">
            <LoginForm/>
        </div>
    </AppLayout>
}

export default Login