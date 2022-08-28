import {gql} from "@apollo/client";


export default class Subscription {
    static readonly onCallUpdate = gql(`
        subscription ($id: ID!) {
            onUpdatedCall (id: $id) {
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