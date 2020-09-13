import React from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Card, Typography } from '@material-ui/core';
import { ReactComponent as Done } from '../svg/done.svg'
import { ReactComponent as NotDone } from '../svg/warning.svg'

interface Props {
    Todo: Todo
    keyProp: number
}

export const TodoComponent: React.FC<Props> = ({Todo}) => {
    return (
        <TodoCard>
            <h4 className="title">
                {Todo.title}
            </h4>
            <div className="status">
                {Todo.done ? <Done/> : <NotDone/> }
                <div className="timer">
                    sample text
                </div>
            </div>
            <Typography className="description">
                {Todo.description}
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