import {gql} from "@apollo/client";

export default class Mutation {
    static readonly login = gql(`
        mutation ($input: LoginInput!) {
            login (input: $input){
                access_token
                refresh_token
                user {
                  id
                  username
                }
            }
        }
    `)

    static readonly refreshToken = gql(`
        mutation {
            refreshTokenV2 {
                access_token
                refresh_token
                user {
                  id
                  username
                }
            }
        }
    `)
    static readonly archive = gql(`
        mutation ($id: ID!) {
            archiveCall (id: $id) {
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
        }
    `)
}