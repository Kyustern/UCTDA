import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Todo } from '../app/types'
// import { addTodoAction, rmTodoAction, Todo } from '../app/types'

import { RootState } from '../app/store'

interface SliceType {
    todoList: Todo[]
}

const firstTodo: Todo = { 
    title: 'first of its kind', 
    description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', 
    done: false,
    duration: 89757,
    creationTimeStamp: Math.floor(1600187100150 / 1000)
}

const second: Todo = { 
    title: 'first of its kind', 
    description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', 
    done: false,
    duration: undefined,
    creationTimeStamp: Math.floor(1600187100150 / 1000)
}

export const todoSlice: any = createSlice({
    name: 'todos',

    initialState: {todoList: [firstTodo, second]} as SliceType,

    reducers: {
        addTodo: (state, {payload}: PayloadAction<Todo> ): void => {
            //add the todo to the graphQL db
            state.todoList.push(payload)
        },
        removeTodo: (state, {payload}: PayloadAction<number>): void => {
            state.todoList.splice(payload)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

//   w   t   f
export const selectTodos = (state: any): Todo[] => state.todos.todoList

export default todoSlice.reducer