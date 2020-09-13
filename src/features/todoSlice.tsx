import { createSlice } from '@reduxjs/toolkit'

import { Todo } from '../app/types'
// import { addTodoAction, rmTodoAction, Todo } from '../app/types'

interface RootState {
    todos: Todo[]
}

const firstTodo = {title: 'first of its kind', description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', done: false} as Todo

export const todoSlice = createSlice({
    name: 'todo',

    initialState: {todos: [firstTodo]} as RootState,

    reducers: {
        addTodo: (state: RootState, action): void => {
            state.todos.push(action.payload)
        },
        removeTodo: (state: RootState, action): void => {
            state.todos.splice(action.payload)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

//   w   t   f
export const selectTodos = (state: any): Todo[] => state.todos.todos

export default todoSlice.reducer