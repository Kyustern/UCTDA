import React, { useState } from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Switch } from './Switch'
import { Card, Input, Button, IconButton } from '@material-ui/core'
import { DurationInput } from './ImprovisedDurationInput';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { SnackBarWrapper } from './SnackBarWrapper';

interface Props {
    todoProp?: Todo
}

const getDateString = (timeStamp: number): string => {
    const dateObj = new Date(timeStamp)
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`
}

export const TodoEditor: React.FC<Props> = () => {

    const dispatch = useDispatch()

    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [showClock, setShowClock] = useState(false)
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState<number | undefined>(undefined)

    const textInputHandler = (event: any, target: string) => {
        switch (target) {
            case 'Title':
                setTitle(event.target.value)
                break;
            case 'Description':
                setDescription(event.target.value)
            default:
                break;
        }
    }

    const dateInputHandler = (event: any): void => {
        const now = Date.now()
        const dateString = event.target.value
        const dateTimeStamp = Date.parse(event.target.value)
        console.log("dateTimeStamp", dateTimeStamp)
        if (dateTimeStamp <= now) {
            console.log("pas good");
            //Render a SnackBar component that describes the error
        } else {
            setDate(dateString)
            console.log("dateTimeStamp", dateTimeStamp)
            console.log("event.target.value", event.target.value)
        }
    }

    const getterCB = (input: number) => {
        setDuration(input)
        console.log("getter -> input", input)
    }

    const validationHandler = () => {
        if (!title || !description || !date) {
            setErrorText('Please give a title, a description, and a deadline')
            setShowError(true)
        } else {
            dispatch(addTodo(
                {
                    title: title, 
                    description: description, 
                    done: false, 
                    creationTimeStamp: Date.now()
                }
            ))
        }
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
                <Switch 
                    onOff={showClock} 
                    setBoolean={setShowClock} 
                    buttonText={{right: 'Time', left: 'Date'}} 
                />
                    {showClock ?
                        <DurationInput getter={getterCB} />
                        :
                        <Input
                            onChange={dateInputHandler}
                            value={date}
                            type="date"
                        />
                    }

                </div>
                <div className="buttonRack">
                    <IconButton
                        onClick={validationHandler}
                        color="secondary" 
                        aria-label="Add task"
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton aria-label="Cancel task">
                        <DeleteIcon />
                    </IconButton>
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