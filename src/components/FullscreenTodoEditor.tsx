import React, { useEffect, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components';
import { Todo } from '../app/types';
import { TodoEditor } from './TodoEditor';

type Props = React.ComponentProps<typeof TodoEditor>

const duration = 250;

export const FullscreenTodoEditor: React.FC<Props> = (props) => {

    const [mounted, setMounted] = useState(false)
    // useEffect(() => {
    //     setMounted(true)
    // }
    // return () => {

    // }
    // , [])

    useEffect(() => {
        setMounted(true)
        // return () => setMounted(false)
    }, [])

    return (
        <Transition in={mounted} timeout={duration} unmountOnExit>
            {
                state => (
                    <FullscreenWrapper transitionState={state}>
                        <InnerWrapper>
                            <TodoEditor {...props} />
                        </InnerWrapper>
                    </FullscreenWrapper>
                )
            }

        </Transition>
    )
}

const InnerWrapper = styled.div`
    width: 70%;
`;

const FullscreenWrapper = styled.div<{ transitionState: string }>`
    transition: ${duration / 1000}s;
    opacity: ${props => opacitySwitch(props.transitionState)};
    position: fixed;
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

const opacitySwitch = (state: string): string => {
    console.log("state", state)
    switch (state) {
        case "entering":
            return "0"
        case "entered":
            return "1"
        case "exiting":
            return "1"
        case "exited":
            return "0"
        default:
            return "1"
    }
}