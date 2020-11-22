import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components';
import Loader from './Loader'
import { Card, Input, Button, Checkbox } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';

import { Todo } from '../app/types';
import { Switch } from './Switch'
import { DurationInput } from './ImprovisedDurationInput';
import { SnackBarWrapper } from './SnackBarWrapper';

interface Props {
    todoProp?: Todo
    id?: number
    cancelButtonHandler: () => void
}

const getDateString = (timeStamp: number): string => {
    const dateObj = new Date(timeStamp)
    return dayjs(dateObj).format('YYYY-MM-DD')
    // return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`
}

const getRemainingTime = (deadline: string) => {
    const deadlineTimeStamp = Date.parse(deadline)
    const temp = deadlineTimeStamp - Date.now()
    return temp
}

const ADD_TODO = gql`
mutation CreateTodo($todo: TodoInput!) {
    createTodo(todo: $todo) {
        title
    }
}
`
const EDIT_TODO = gql`
mutation ReplaceTodo($todo: TodoInput!, $id: String!) {
    replaceTodo(todo: $todo, id: $id)
}
`

export const TodoEditor: React.FC<Props> = ({ todoProp, id, cancelButtonHandler }) => {

    const [createTodo, createTodoState] = useMutation(ADD_TODO)
    const [editTodo, editTodoState] = useMutation(EDIT_TODO)

    const dateinit = (todo?: Todo) => {
        if (todo) {
            if (todo.creationTimeStamp) {
                return getDateString(todo.creationTimeStamp)
            } else {
                return ''
            }
        }
        return ''
    }

    const hasDeadlineInit = (todo?: Todo): boolean => {
        if (todo) {
            if (todo.duration) {
                return true
            } else return false
        }
        return false
    }

    const dispatch = useDispatch()

    const [date, setDate] = useState(dateinit(todoProp))
    const [errorText, setErrorText] = useState('')
    const [title, setTitle] = useState(todoProp ? todoProp.title : '')
    const [description, setDescription] = useState(todoProp ? todoProp.description : '')
    const [showError, setShowError] = useState(false)
    const [showClock, setShowClock] = useState(false)
    const [hasDeadline, setHasDeadline] = useState(hasDeadlineInit(todoProp))
    const [duration, setDuration] = useState(todoProp ? todoProp.duration ? todoProp.duration : 604800 : 604800)

    const textInputHandler = (event: any, target: string) => {
        switch (target) {
            case 'Title':
                setTitle(event.target.value)
                break;
            case 'Description':
                setDescription(event.target.value)
                break;
            default:
                break;
        }
    }

    const dateInputHandler = (event: any): void => {
        const now = Date.now()
        const dateString = event.target.value
        const dateTimeStamp = Date.parse(event.target.value)
        if (dateTimeStamp <= now) {
            //Render a SnackBar component that describes the error
        } else {
            setDate(dateString)
        }
    }

    const addDeadLine = (todo: Todo): Todo => {
        if (hasDeadline) {
            if (!showClock) {
                //duration will be equal to the number of seconds between Date.now and the selected date
                todo.duration = getRemainingTime(date)
            } else {
                //duration is in seconds, we have to convert to milliseconds so it can be compatible with other stuff
                todo.duration = duration * 1000
            }
        }
        return todo as Todo
    }

    const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasDeadline(event.target.checked)
    }

    const getterCB = (input: number) => {
        setDuration(input)
    }

    const validationHandler = async () => {
        if (!title || !description) {
            setErrorText('Please give at least a description and a title')
            setShowError(true)
        } else {
            if (todoProp) {
                //edit
                const todo = addDeadLine({
                    title: title,
                    description: description,
                    done: false,
                    creationTimeStamp: Date.now(),
                    creatorId: "creatorIdPlaceHolder"
                } as Todo)
                const res = await editTodo({variables: { "todo": todo, "id": todoProp._id }})
                // dispatch(editTodo({ todo, id }))
            } else {
                //add
                const todo = {
                    title: title,
                    description: description,
                    done: false,
                    creationTimeStamp: Date.now(),
                    creatorId: "creatorIdPlaceHolder"
                } as Todo
                console.log('add');
                
                const res = await createTodo({variables: { "todo": todo}})
            }
            cancelButtonHandler()
        }
    }

    return (
        <>
            <SnackBarWrapper
                close={() => setShowError(false)}
                text={errorText}
                isOpen={showError}
            />
            <TodoCard>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(event) => textInputHandler(event, 'Title')}
                />
                <Input
                    placeholder="Description"
                    multiline={true}
                    rows={5}
                    value={description}
                    onChange={(event) => textInputHandler(event, 'Description')}
                />
                <div className="dateTimeSelector">
                    <Checkbox
                        checked={hasDeadline}
                        onChange={checkBoxHandler}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Switch
                        disabled={!hasDeadline}
                        bool={showClock}
                        setBoolean={setShowClock}
                        buttonText={{ left: 'Date', right: 'Time' }}
                    />
                    {showClock ?
                        <DurationInput getter={getterCB} />
                        :
                        <Input
                            disabled={!hasDeadline}
                            onChange={dateInputHandler}
                            value={date}
                            type="date"
                        />
                    }

                </div>
                <div className="buttonRack">
                    <Button
                        onClick={validationHandler}
                        color="secondary"
                        aria-label="Add task"
                        startIcon={<AddIcon />}
                    >
                        {
                        createTodoState.loading || editTodoState.loading ? 
                            <Loader></Loader> 
                        : 
                            'CONFIRM'
                        }
                    </Button>
                    <Button
                        onClick={cancelButtonHandler}
                        aria-label="Cancel task"
                        variant="outlined"
                        startIcon={<CloseIcon />}
                    >
                        Cancel
                    </Button>
                </div>
            </TodoCard>
        </>
    )
}

const TodoCard = styled(Card)`
    margin-bottom: 1em;
    padding: 0 0.25em 0 0.25em;
    width: 95%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 6em  1fr auto;
    gap: 1px 1px;
    grid-template-areas:
    "title"
    "description"
    "timeoutDuration"
    "buttonRack";

    .dateTimeSelector {
        display: flex;
        height: 3em;
        align-items: center;
    }

    .buttonRack > * {
        margin-right: 1em;
        margin-left: 1em;
        margin-bottom: 0.5em;
    }

    .buttonRack {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        svg {
            height: 30px !important;
        }
    }
`;