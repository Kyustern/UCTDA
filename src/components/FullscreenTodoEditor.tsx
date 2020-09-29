import React from 'react'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { TodoEditor } from './TodoEditor';

type Props = React.ComponentProps<typeof TodoEditor>

export const FullscreenTodoEditor: React.FC<Props> = (props) => {
    return (
        <FullscreenWrapper>
            <InnerWrapper>
                <TodoEditor {...props}>

                </TodoEditor>
            </InnerWrapper>
        </FullscreenWrapper>
    )
}

const InnerWrapper = styled.div`
    width: 70%;
`;

const FullscreenWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;