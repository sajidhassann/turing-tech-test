import apolloClient from "./apollo";
import Mutation from "./mutations";
import Query from "./queries";
import {GetCallsRequest, LoginRequest} from "./request.models";
import {CallNode, GetCallsResponse, LoginResponse} from "./response.models";

export default class GQLCalls {

    static readonly login = async (input: LoginRequest): Promise<LoginResponse> => {
        const response = await apolloClient.mutate({
            mutation: Mutation.login,
            variables: {
                input
            }
        })
        return response?.data?.login
    }

    static readonly refreshToken = async (): Promise<LoginResponse> => {
        const response = await apolloClient.mutate({
            mutation: Mutation.refreshToken,
        })
        return response?.data?.refreshTokenV2
    }

    static readonly getCalls = async ({offset, limit}: GetCallsRequest): Promise<GetCallsResponse> => {
        const response = await apolloClient.query({
            query: Query.getCalls,
            variables: {
                offset,
                limit,
            }
        })
        console.log(response)
        return response?.data?.paginatedCalls
    }

    static readonly archiveCall = async (id: string): Promise<CallNode> => {
        const response = await apolloClient.mutate({
            mutation: Mutation.archive,
            variables: {
                id
            }
        })
        console.log(response)
        return response?.data?.archiveCall
    }

    // static readonly onUpdateCall = async (id: string): Promise<CallNode> => {
    //     const response = await apolloClient.subscribe({
    //         query: Subscription.onCallUpdate,
    //         variables: {
    //             id
    //         }
    //     })
    //     console.log(response)
    //     return response
    // }
}