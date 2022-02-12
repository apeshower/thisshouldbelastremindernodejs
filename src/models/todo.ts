import {ITodo} from '../types/todo'
import {model, Schema} from "mongoose";

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        list_id: {
            type: String,
            required: true
        },
        datePicked: {
            type: String,
            required: true
        },
        timePicked: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true}
)

export default model<ITodo>("Todo", todoSchema)