import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Card, Typography } from '@material-ui/core';
import { ReactComponent as Done } from '../svg/done.svg'
import { ReactComponent as NotDone } from '../svg/warning.svg'
import { ReactComponent as Alarm } from '../svg/alarm.svg'

interface Props {
    todoProp: Todo
    keyProp: number
}

const getWDHM = (seconds: number): string => {
    //returns the weeks or days or Hours or Minutes

    const plurial = (n: number) => n > 1 ? 's' : ''

    if (seconds > 604800) {
        const n = Math.floor(seconds / 604800)
        return `${n} week${plurial(n)} left`
    } else if(seconds > 86400) {
        const n = Math.floor(seconds / 86400)
        return `${n} day${plurial(n)} left`
    } else if(seconds > 3600) {
        const n = Math.floor(seconds / 3600)
        return `${n} hour${plurial(n)} left`
    } else if(seconds > 60) {
        const n = Math.floor(seconds / 60)
        return `${n} minute${plurial(n)} left`
    }

    return ''
}

const getStatus = (todo: Todo): string => {
    if (!todo.duration) {
        return 'not done :('
    }
    const deadLine = todo.creationTimeStamp + todo.duration
    const remainingTime = deadLine - Math.floor(Date.now() / 1000)
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

export const TodoComponent: React.FC<Props> = ({ todoProp }) => {

    return (
        <TodoCard>
            <h4 className="title">
                {todoProp.title}
            </h4>
            <div className="status">
                {getSvg(todoProp)}
                <div className="timer">
                    {todoProp.done ? 'done :)' : getStatus(todoProp)}
                </div>
            </div>
            <Typography className="description">
                {todoProp.description}
            </Typography>
        </TodoCard>
    )
}

const TodoCard = styled(Card)`
    margin-top: 0.5em;
    font-size: 29px;
    padding-left: 0.5em;
    width: 95%;
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    grid-template-rows: auto 3.6em;
    gap: 1px 1px;
    grid-template-areas:
    "title status"
    "description status";

    .status {
        padding-left: 0.5em;
        padding-right: 0.5em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 0.2fr;
        grid-template-areas:
            "icon"
            "timer";
        grid-area: status;
    }

    .timer {
        grid-area: timer;
    }

    svg {
        margin: auto;
        width: 50%;
        height: 100%;
        grid-area: icon;
    }

    .title {
        margin: 0.5em;
        padding: auto;
        height: fit-content;
    }

    .description {
        /*https://css-tricks.com/line-clampin/ */
        line-height: 2em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

`;