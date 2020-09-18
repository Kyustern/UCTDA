import React, { useState } from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Card, Input, Button, duration } from '@material-ui/core'
import { DurationInput } from './ImprovisedDurationInput';

interface Props {
    todoProp?: Todo
}

export const TodoEditor: React.FC<Props> = () => {

    const [showClock, setShowClock] = useState(false)
    const [date, setDate] = useState<number>(Date.now() + 604800)
    const [duration, setDuration] = useState<number | undefined>(undefined)

    const getDateString = (timeStamp: number): string => {
        const dateObj = new Date(timeStamp)
        return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`
    }

    const dateInputHandler = (event: any): void => {
        const now = Date.now()
        const selection = Date.parse(event.target.value)
        console.log("selection", selection)
        if (selection <= now) {
            console.log("pas good");
        } else {
            setDate(selection)
            console.log("event.target.value", event.target.value)
        }
    }

    const getterCB = (input: number) => {
        setDuration(input)
        console.log("getter -> input", input)
    }
    

    return (
        <TodoCard>
            <Input placeholder="Title" />
            <Input placeholder="Description" multiline={true} rows={5} />
            <div className="dateTimeSelector">
                <div className="switch">
                    <Button 
                        color={showClock ? 'default' : 'secondary'}
                        variant={showClock ? 'outlined' : 'contained'}
                        onClick={() => setShowClock(false)}

                    >
                        Date
                    </Button>
                    <Button 
                        color={showClock ? 'secondary' : 'default'}
                        variant={showClock ? 'contained' : 'outlined'}
                        onClick={() => setShowClock(true)}
                    >
                        Time
                    </Button>
                </div>
                {showClock ? 
                    <DurationInput getter={getterCB}/>
                : 
                    <Input
                        onChange={dateInputHandler}
                        value={date} 
                        type="date"
                    />
                }

            </div>
            <div>buttons</div>
        </TodoCard>
    )
}

const DualButton = styled(Button)`
  
`;


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
`;

const TodoCard = styled(Card)`
    padding: 0 0.25em 0 0.25em;
    width: 95%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 6em  1fr 1fr;
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

    .switch {
        margin-right: 1em;
    }

    .switch button:first-child {
        border-radius: 10px 0 0 10px !important;
    }

    .switch button:last-child {
        border-radius: 0 10px 10px 0 !important;
    }

`;