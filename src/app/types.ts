import { ChangeEvent } from 'react'

export type Todo = {
    _id: String | undefined
    title: string
    description: string
    done: boolean
    duration ? : number
    creationTimeStamp: number
    creatorId: string
}

export type editTodoPayload = {
    todo: Todo
    id: number
}

export type HandlerType = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void | undefined

// export type rmTodoAction = {
//     type : typeof RM_TODO
//     payload: number
// }