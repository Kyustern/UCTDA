import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, addTodo } from "../features/todoSlice";
import { Todo } from '../app/types';
import { TodoComponent } from './TodoComponent';
import { TodoEditor } from './TodoEditor'
import AddIcon from '@material-ui/icons/Add';
import { FullscreenTodoEditor } from './FullscreenTodoEditor';
import { idText } from 'typescript';

export const TDList: React.FC = () => {

    const [creatingTodo, setCreatingTodo] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(0)
    const [editingTodo, setEditingTodo] = useState(false)

    const dispatch = useDispatch()
    const todos = useSelector(selectTodos)

    useEffect((): void => {
        console.log("TDList:React.FC -> todo", todos)
    }, [todos])

    const btnHandler = (): void => {
        setCreatingTodo(true)
    }

    const selectTodo = (id: number) => {
        setSelectedTodo(id)
        setEditingTodo(true)
    }
    return (
        <Wrapper>
            <CustomButton
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => btnHandler()}
            >
                Create
            </CustomButton>
            {
                creatingTodo && 
                <TodoEditor 
                    cancelButtonHandler={() => setCreatingTodo(false)}
                />
            }
            {
                todos.map((todo: Todo, index: number) => <TodoComponent key={index}keyProp={index} todoProp={todo} selectTodo={selectTodo} />)
            }

            {
            editingTodo &&
                <FullscreenTodoEditor 
                    todoProp={todos[0]} 
                    id={0} 
                    cancelButtonHandler={() => setEditingTodo(false)} 
                />
            }
            

        </Wrapper>
    )
}

const CustomButton = styled(Button)`
    width: 95%;
    height: 2.5em;
    margin-top: 1em !important;
    margin-bottom: 1em !important;

`;

const Wrapper = styled.div`
    transition: all 0.2s ease-in-out;
    grid-area: todos;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
`;