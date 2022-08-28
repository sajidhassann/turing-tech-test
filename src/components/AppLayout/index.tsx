import {FC, ReactNode} from "react";
import {Layout} from "antd";
import styles from './style.module.scss'

const {Header, Footer, Content} = Layout;

type AppLayoutProps = {
    children: ReactNode
    logout?: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({children, logout}) => {
    return <Layout>
        <Header className={styles.header}>
            <img src="/imgs/TT Logo.png" width="20%"/>
            {logout}
        </Header>
        <Content>{children}</Content>
    </Layout>
}

export default AppLayout