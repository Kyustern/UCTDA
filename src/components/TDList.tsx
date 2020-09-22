import React, { useEffect } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, addTodo, todoSlice } from "../features/todoSlice";
import { Todo } from '../app/types';
import { TodoComponent } from './TodoComponent';
import { TodoEditor } from './TodoEditor'
import AddIcon from '@material-ui/icons/Add';

export const TDList: React.FC = () => {

    const dispatch = useDispatch()
    const todos = useSelector(selectTodos)

    useEffect((): void => {
        console.log("TDList:React.FC -> todo", todos)
    }, [todos])

    const btnHandler = (): void => {
        dispatch(addTodo(
            { title: 'first of its kind', description: 'patience is  aaaar erear tttttttttet etzet ee aetaett aaaar erear tttttttttet etzet ee aetaett aaaar erear tttttttttet etzet ee aetaett aaaar erear tttttttttet etzet ee aetaett aaaar erear tttttttttet etzet ee aetaett aaaar erear tttttttttet etzet ee aetaett', done: false } as Todo
        ))
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
            <TodoEditor />
            {
                todos.map((todo: Todo, index: number) => <TodoComponent key={index} keyProp={index} todoProp={todo} />)
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
    grid-area: todos;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
`;