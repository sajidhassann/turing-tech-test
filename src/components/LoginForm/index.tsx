import {FC, useCallback, useState} from "react";
import {Button, Card, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import GQLCalls from "../../gqlCalls";
import {useRouter} from "next/router";


const LoginForm: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const redirectTo = useCallback((path: string) => {
        router.replace(path).finally(() => Promise.resolve())
    }, [router])

    const onFinish = useCallback(async (values: any) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        try {
            const response = await GQLCalls.login(values)
            console.log({response})
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('re_token', response.refresh_token)
            localStorage.setItem('ex_token', String(Date.now() + (10 * 60 * 1000)))
            redirectTo('/')
        } catch (err) {
            console.log({err})
            setLoading(false)
        }
    }, []);

    return <Card className="login-form-card">
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    </Card>

}

export default LoginForm