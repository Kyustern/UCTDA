import { type } from "os"

// export const ADD_TODO = 'ADD_TODO'
// export const RM_TODO = 'RM_TODO'

export type Todo = {
    title: string
    description: string
    done: boolean
    duration ? : number
    creationTimeStamp: number
}

// export type addTodoAction = {
//     type : typeof ADD_TODO
//     payload: Todo
// }

// export type rmTodoAction = {
//     type : typeof RM_TODO
//     payload: number
// }