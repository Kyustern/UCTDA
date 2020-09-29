export type Todo = {
    title: string
    description: string
    done: boolean
    duration ? : number
    creationTimeStamp: number
}



export type editTodoPayload = {
    todo: Todo
    id: number
}

// export type rmTodoAction = {
//     type : typeof RM_TODO
//     payload: number
// }