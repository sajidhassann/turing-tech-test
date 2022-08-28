import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import AuthProvider from "../src/providers/AuthProvider";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../src/gqlCalls/apollo";
import {FC, ReactNode} from "react";
import dynamic from "next/dynamic";

const SafeHydrate: FC<{ children: ReactNode }> = (props) => {
    const {children} = props
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

function MyApp({Component, pageProps}: AppProps) {
    return <SafeHydrate>
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ApolloProvider>
    </SafeHydrate>
}

export default dynamic(() => Promise.resolve(MyApp), {ssr: false})
