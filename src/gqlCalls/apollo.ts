import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import Mutation from "./mutations";

const httpLink = createHttpLink({
    uri: 'https://frontend-test-api.aircall.io/graphql',
});


const refreshLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('re_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const getAccessToken = async (): Promise<string> => {
    if (Date.now() >= Number(localStorage.getItem('ex_token') ?? 0) && localStorage.getItem('re_token')) {
        const apolloClient = new ApolloClient({
            link: refreshLink.concat(httpLink),
            cache: new InMemoryCache()
        })
        try {
            const response = await apolloClient.mutate({
                mutation: Mutation.refreshToken,
            })
            const data = response?.data?.refreshTokenV2
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('re_token', data.refresh_token)
            localStorage.setItem('ex_token', String(Date.now() + (10 * 60 * 1000)))
        } catch (err) {

        }
    }
    return localStorage.getItem('token') ?? ''
}


const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;