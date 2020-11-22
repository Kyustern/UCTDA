import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editTodoPayload, Todo } from '../app/types'
// import { addTodoAction, rmTodoAction, Todo } from '../app/types'

import { RootState } from '../app/store'

interface SliceType {
    todoList: Todo[]
}

export const todoSlice: any = createSlice({
    name: 'todos',

    initialState: { todoList: [] } as SliceType,

    reducers: {
        addTodo: (state, { payload }: PayloadAction<Todo>): void => {
            state.todoList.push(payload)
        },
        editTodo: (state, { payload }: PayloadAction<editTodoPayload>): void => {
            //     state.todoList: [
            //         ...state.todoList.slice(0, payload.id),
            //         payload.todo,
            //         ...state.todoList.slice(payload.id + 1),
            //     ]
            // console.log("payload", payload)
            // console.log("edit")
            const newState = [...state.todoList]
            newState[payload.id] = payload.todo
            console.log("newState", newState)
            state.todoList = newState
        },
        removeTodo: (state, { payload }: PayloadAction<number>): void => {
            state.todoList.splice(payload)
        }
    }
})

export const { addTodo, removeTodo, editTodo } = todoSlice.actions

export const selectTodos = (state: any): Todo[] => state.todos.todoList

export const todosReducer = todoSlice.reducer


                // return [
                //     ...state.todos.todoArray.slice(0, payload.id),
                //     payload,
                //     ...state.todos.todoArray.slice(payload.id + 1),
                // ]