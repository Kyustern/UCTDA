import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core'

interface Props {
    bool: boolean
    setBoolean: (bool: boolean) => void
    buttonText: {
        left: string
        right: string
    }
    disabled?: boolean
}

export const Switch: React.FC<Props> = ({ bool, setBoolean, buttonText, disabled }) => {
    return (
        <Wrapper>
            <Button
                disabled={disabled}
                color={bool ? 'default' : 'secondary'}
                variant={bool ? 'outlined' : 'contained'}
                onClick={() => setBoolean(false)}
            >
                {buttonText.left}
            </Button>
            <Button
                disabled={disabled}
                color={bool ? 'secondary' : 'default'}
                variant={bool ? 'contained' : 'outlined'}
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