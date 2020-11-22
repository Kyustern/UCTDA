import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Button, Card } from '@material-ui/core';
import { ReactComponent as Done } from '../svg/done.svg'
import { ReactComponent as NotDone } from '../svg/warning.svg'
import { ReactComponent as Alarm } from '../svg/alarm.svg'
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';

const isBetween = (a: number, b: number, x: number): boolean => {
    return x >= a && x < b
}
const isExpired = (n: number) => {
    if (n < 0) {
        return 'since deadline'
    } else if (n > 0) {
        return 'left'
    } else {
        return ''
    }
}
const plurial = (n: number) => n > 1 ? 's' : ''

// const expired = (n: number) => n <= 0 ? 'since deadline' : 'left'

const getWDHM = (milliseconds: number): string => {
    //returns the weeks or days or Hours or Minutes
    const seconds = Math.round(milliseconds / 1000)
    const absoluteValue = Math.abs(seconds)

    if (absoluteValue >= 604800) {
        const n = Math.round(absoluteValue / 604800)
        return `${n} week${plurial(n)} ${isExpired(seconds)}`

    } else if (isBetween(86400, 604800, absoluteValue)) {
        const n = Math.round(absoluteValue / 86400)
        return `${n} day${plurial(n)} ${isExpired(seconds)}`

    } else if (isBetween(3600, 86400, absoluteValue)) {
        const n = Math.round(absoluteValue / 3600)
        return `${n} hour${plurial(n)} ${isExpired(seconds)}`

    } else if (isBetween(60, 3600, absoluteValue)) {
        const n = Math.round(absoluteValue / 60)
        return `${n} minute${plurial(n)} ${isExpired(seconds)}`
    }

    return ''
}

const getStatus = (todo: Todo): string => {
    if (!todo.duration) {
        return 'not done :('
    }
    const deadLine = todo.creationTimeStamp + todo.duration
    const remainingTime = deadLine - Date.now()
    return getWDHM(remainingTime)
}

const getSvg = (todo: Todo): JSX.Element => {
    if (todo.done === true) {
        return <Done />
    } else {
        if (todo.duration) {
            return <Alarm />
        } else {
            return <NotDone />
        }
    }
}

interface Props {
    todoProp: Todo
    keyProp: number
    selectTodo: (id: number) => void
}

export const TodoComponent: React.FC<Props> = ({ todoProp, keyProp, selectTodo }) => {

    const todoRef = useRef<any>()
    const [isExpanded, setIsExpanded] = useState(false)
    const [height, setHeight] = useState<number>(0)

    // useEffect(() => {
    //     if(todoRef) {
    //         console.log("todoRef", typeof todoRef.current)
    //         setHeight(todoRef.current.clientHeight)
    //     }
    // }, [todoRef])
    return (
        // <Collapse in={isExpanded} collapsedHeight={height + 10} >
        <TodoCard
            isExpanded={isExpanded}
            ref={todoRef}
        >
            <Title
                className="title"
            >
                {todoProp.title}
            </Title>
            <Description
                onClick={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}
            >
                {todoProp.description}
            </Description>
            <Status>
                {getSvg(todoProp)}
                <div style={{ gridArea: 'timer' }}>
                    {todoProp.done ? 'done :)' : getStatus(todoProp)}
                </div>
                <IconButton startIcon={<EditIcon />} onClick={() => {selectTodo(keyProp)}}>
                    EDIT
                </IconButton>
            </Status>

            <ExpandIcon 
                onClick={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}>
                <ExpandMoreSharpIcon />
            </ExpandIcon>
        </TodoCard>
        // </Collapse>
    )
}

const TodoCard = styled(Card) <{ isExpanded: boolean }>`
    margin-bottom: 0.7em;
    padding-left: 0.5em;
    font-size: 29px;
    height: fit-content;
    width: 95% !important;
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    grid-template-rows:
        auto 
        ${props => props.isExpanded ? 'minmax(3.6em, auto)' : '3.6em'}
        50px;
    gap: 1px 1px;
    grid-template-areas:
    "title status"
    "description status"
    "arrow arrow";
    transition: all 0.2s ease-in-out;

    svg {
        margin: auto;
        width: 50%;
        height: 100%;
        grid-area: icon;
    }
`;



const ExpandIcon = styled.div<{ isExpanded: boolean }>`
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    grid-area: arrow;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: ${props => props.isExpanded ? 'rotate(0.5turn)' : 'rotate(0turn)'};
`;

const Title = styled.h4`
    margin: 0.5em;
    padding: auto;
    height: fit-content;
`;

const Description = styled.span<{ isExpanded: boolean }>`
    grid-area: description;
    cursor: pointer;
    width: 100%;
    ${props => props.isExpanded ?
        ''
        :
        `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        `
    }

`;
const Status = styled.div`
    padding-left: 0.5em;
    padding-right: 0.5em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.2fr 0.2fr;
    grid-template-areas:
        "icon"
        "timer"
        "editbutton";
    grid-area: status;
    height: fit-content;
`;

const IconButton = styled(Button)`
    grid-area: editbutton;
    padding-left: 1em;
    padding-right: 1em;
    svg {
        width: 1em;
        height: 1em;
        margin: 0;
    }
`