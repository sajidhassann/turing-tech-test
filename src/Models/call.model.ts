import {CallNode} from "../gqlCalls/response.models";
import moment from "moment";

interface INote {
    readonly id: string
    readonly content: string
}

export default class Call {
    readonly key: string
    readonly id: string
    readonly direction: string
    readonly from: string
    readonly to: string
    readonly duration: string
    readonly seconds: number
    readonly via: string
    readonly isArchived: boolean
    readonly callType: string
    readonly createdAt: string
    readonly notes: INote[]

    constructor(data: CallNode) {
        this.id = data.id ?? ''
        this.key = this.id ?? ''
        this.direction = data.direction ?? ''
        this.from = data.from ?? ''
        this.to = data.to ?? ''
        this.seconds = data.duration ?? 0
        this.duration = `${moment.utc((data.duration ?? 0) * 1000).format('mm [minutes] ss [seconds]')}`
        this.via = data.via ?? ''
        this.isArchived = data.is_archived ?? false
        this.callType = data.call_type ?? ''
        this.createdAt = moment(data.created_at ?? Date.now()).format('DD-MM-YYYY')
        this.notes = data.notes.map((item) => ({id: item.id ?? '', content: item.content ?? ''}))
    }
}