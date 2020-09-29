import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { editTodoPayload, Todo } from '../app/types'
// import { addTodoAction, rmTodoAction, Todo } from '../app/types'

import { RootState } from '../app/store'

interface SliceType {
    todoList: Todo[]
}

const firstTodo: Todo = { 
    title: 'first of its kind', 
    description: 'un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté un texte un peu long, mais pas trop quand même ta capté', 
    done: false,
    duration: 89757,
    creationTimeStamp: 1600812494847
}

const second: Todo = { 
    title: 'first of its kind', 
    description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', 
    done: false,
    duration: undefined,
    creationTimeStamp: 1600812494847
}

export const todoSlice: any = createSlice({
    name: 'todos',

    initialState: {todoList: [firstTodo, second]} as SliceType,

    reducers: {
        addTodo: (state, {payload}: PayloadAction<Todo> ): void => {
            //add the todo to the graphQL db
            state.todoList.push(payload)
        },
        editTodo: (state, {payload}: PayloadAction<editTodoPayload>): void => {
            //     state.todoList: [
            //         ...state.todoList.slice(0, payload.id),
            //         payload.todo,
            //         ...state.todoList.slice(payload.id + 1),
            //     ]

            
            console.log("payload", payload)

            const newState = [...state.todoList]
            newState[payload.id] = payload.todo
            state.todoList = newState
        },
        removeTodo: (state, {payload}: PayloadAction<number>): void => {
            state.todoList.splice(payload)
        }
    }
})

export const { addTodo, removeTodo, editTodo } = todoSlice.actions

//   w   t   f
export const selectTodos = (state: any): Todo[] => state.todos.todoList

export default todoSlice.reducer