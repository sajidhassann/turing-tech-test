import {gql} from "@apollo/client";

export default class Query {

    static readonly getCalls = gql(`
        query ($offset: Float = 0, $limit: Float = 10) {
            paginatedCalls (offset: $offset limit: $limit) {
                nodes {
                    id
                    direction
                    from
                    to
                    duration
                    via
                    is_archived
                    call_type
                    created_at
                    notes {
                        id
                        content
                    }
                }
                totalCount
                hasNextPage
            }
        }
    `)
}