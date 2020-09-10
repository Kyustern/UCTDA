import { createSlice } from '@reduxjs/toolkit'

import { Todo } from '../app/types'
// import { addTodoAction, rmTodoAction, Todo } from '../app/types'

interface RootState {
    todos: Todo[]
}

const firstTodo: Todo = {title: 'first of its kind', description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', done: false}

export const todoSlice = createSlice({
    name: 'todo',

    initialState: {todos: [firstTodo]} as RootState,

    reducers: {
        addTodo: (state: RootState, action): void => {
            console.log("action", action)
            state.todos.push(action.payload.todo)
            // state.todos = [...state.todos, action.payload]
        },
        removeTodo: (state: RootState, action): void => {
            state.todos.splice(action.payload)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

export const selectTodos = (state: RootState): Todo[] => state.todos

export default todoSlice.reducer