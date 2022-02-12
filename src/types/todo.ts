import {Document} from "mongoose"

export interface ITodo extends Document {
    title: string,
    description: string,
    list_id: string,
    datePicked: string,
    timePicked: string,
    status: boolean,
    completed: boolean
}

export interface IList extends Document {
    title: string,
    color: string,
    status: boolean
}