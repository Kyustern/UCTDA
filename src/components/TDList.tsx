import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Divider } from '@material-ui/core'
import Loader from './Loader'
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTodos, addTodo } from "../features/todoSlice";
import { Todo } from '../app/types';
import { TodoComponent } from './TodoComponent';
import { TodoEditor } from './TodoEditor'
import AddIcon from '@material-ui/icons/Add';
import { FullscreenTodoEditor } from './FullscreenTodoEditor';
import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
{
    todos {
      _id
      title
      description
      done
      duration
      creatorId
    }
}
`

export const TDList: React.FC = () => {

    const {loading, error, data, refetch} = useQuery(GET_TODOS)

    const [creatingTodo, setCreatingTodo] = useState(false)
    const [editingTodo, setEditingTodo] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(0)

    const btnHandler = (): void => {
        setCreatingTodo(true)
    }

    const selectTodo = (id: number) => {
        setSelectedTodo(id)
        setEditingTodo(true)
    }

    if (loading) return (
        <Center>
            <Loader/>
        </Center>
    )
    if (error) return (
        <Center>
            <Button onClick={refetch}>
                Try Again
            </Button>
        </Center>
    )
    
    return (
        <Wrapper>
            <CustomButton
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddIcon />}
                onClick={btnHandler}
            >
                Create
            </CustomButton>
            {
                creatingTodo && 
                <TodoEditor 
                    cancelButtonHandler={() => {
                        setCreatingTodo(false)
                        refetch()
                    }}
                />
            }

            {
                data.todos.map((todo: Todo, index: number) => <TodoComponent key={index}keyProp={index} todoProp={todo} selectTodo={selectTodo} />)
            }

            {
            editingTodo &&
                <FullscreenTodoEditor 
                    todoProp={data.todos[selectedTodo]} 
                    id={selectedTodo}
                    cancelButtonHandler={() => {
                        setEditingTodo(false)
                        refetch()
                    }}
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
    background-color: var(--dark);
`;

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;