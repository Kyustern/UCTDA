import React from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { Card, Typography } from '@material-ui/core';
import { ReactComponent as Done } from '../svg/done.svg'

interface Props {
    Todo: Todo
}

export const TodoComponent: React.FC<Props> = () => {
    return (
        <TodoCard>
            <h4 className="title">
                Leu titr
            </h4>
            <Done />
            <Typography className="description">
                Leu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titr
                Leu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titrLeu titr
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
    svg {
        margin: auto;
        width: 50%;
        height: 100%;
        grid-area: status;
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