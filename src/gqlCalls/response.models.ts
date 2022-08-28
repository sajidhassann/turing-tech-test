export interface LoginResponse {
    access_token: string,
    refresh_token: string
}

export interface CallNode {
    id: string
    direction: string
    from: string
    to: string
    duration: number
    via: string
    is_archived: boolean
    call_type: string
    created_at: string
    notes: {
        id: string
        content: string
    }[]
}

export interface GetCallsResponse {
    nodes: CallNode[]
    totalCount: number
    hasNextPage: boolean
}