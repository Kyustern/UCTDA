import React, { useEffect } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, addTodo } from "../features/todoSlice";
import { Todo } from '../app/types';
import { TodoComponent } from './TodoComponents';

export const TDList: React.FC = () => {

    const dispatch = useDispatch()

    const todos = useSelector(selectTodos)

    useEffect(() => {
        console.log("TDList:React.FC -> todos", todos)
    }, [todos])

const btnHandler = () => {
    dispatch(addTodo({title: 'first of its kind', description: 'patience is virtue and fffffffffffucjkckgvsonvlsc', done: false}))
}

return (
    <Wrapper>
        <CustomButton
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<span className="material-icons">add</span>}
            onClick={() => btnHandler()}
        >
            Create
        </CustomButton>

        {/* {todos.map((todo: Todo) => <TodoComponent Todo={todo}/>)} */}
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