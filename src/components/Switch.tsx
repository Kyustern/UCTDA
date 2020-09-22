import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core'

interface Props {
    onOff: boolean
    setBoolean: (onOff: boolean) => void
    buttonText: {
        left: string
        right: string
    }
}

export const Switch: React.FC<Props> = ({ onOff, setBoolean, buttonText }) => {
    return (
        <Wrapper>
            <Button
                color={onOff ? 'default' : 'secondary'}
                variant={onOff ? 'outlined' : 'contained'}
                onClick={() => setBoolean(false)}
            >
                {buttonText.left}
            </Button>
            <Button
                color={onOff ? 'secondary' : 'default'}
                variant={onOff ? 'contained' : 'outlined'}
                onClick={() => setBoolean(true)}
            >
                {buttonText.right}
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-right: 1em;

    button:first-child {
        border-radius: 10px 0 0 10px !important;
    }
    button:last-child {
        border-radius: 0 10px 10px 0 !important;
    }
`;