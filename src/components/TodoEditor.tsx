import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Switch } from './Switch'
import { Card, Input, Button, Checkbox } from '@material-ui/core'
import { DurationInput } from './ImprovisedDurationInput';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../features/todoSlice';
import { SnackBarWrapper } from './SnackBarWrapper';

//lol
//07 82 56 07 14

interface Props {
    todoProp?: Todo
    id?: number
    cancelButtonHandler: () => void
}

const getDateString = (timeStamp: number): string => {
    const dateObj = new Date(timeStamp)
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`
}

const getRemainingTime = (deadline: string) => {
    const deadlineTimeStamp = Date.parse(deadline)
    const temp = deadlineTimeStamp - Date.now()
    return temp
}

export const TodoEditor: React.FC<Props> = ({ todoProp, id, cancelButtonHandler }) => {

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

    const hasDeadlineInit = ():boolean => {

    }

    const dispatch = useDispatch()

    const [date, setDate] = useState(dateinit(todoProp))
    const [errorText, setErrorText] = useState('')
    const [title, setTitle] = useState(todoProp ? todoProp.title : '')
    const [description, setDescription] = useState(todoProp ? todoProp.description : '')
    const [showError, setShowError] = useState(false)
    const [showClock, setShowClock] = useState(false)
    const [hasDeadline, setHasDeadline] = useState(false)
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
    const validationHandler = () => {
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
                    creationTimeStamp: Date.now()
                } as Todo)
                dispatch(editTodo({ todo, id }))
            } else {
                //add
                const todo = {
                    title: title,
                    description: description,
                    done: false,
                    creationTimeStamp: Date.now()
                } as Todo
                // addDeadline(todo)
                // const todo = addDeadline(todoProp)
                dispatch(addTodo(addDeadLine(todo)))
            }
            cancelButtonHandler()
        }
    }
    const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasDeadline(event.target.checked)
    }

    const getterCB = (input: number) => {
        setDuration(input)
    }

    return (
        <>
            <SnackBarWrapper
                close={(bool) => setShowError(bool)}
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
                        onOff={showClock}
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
                        Confirm
                    </Button>
                    <Button
                        onClick={() => cancelButtonHandler()}
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