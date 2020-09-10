import React from 'react'
import styled from 'styled-components';
import { FilterButton } from './FilterButton'
import Button from '@material-ui/core/Button'

export const Filter: React.FC = () => {

    return (
        <Wrapper>
            <ButtonRack>
                <Button variant="contained" color="primary">Alphabetical</Button>
                <Button variant="contained" color="primary">Priority</Button>
                <Button variant="contained" color="primary">Creation Date</Button>
            </ButtonRack>
        </Wrapper>
    )

}

const ButtonRack = styled.div`
    margin: 1em auto 0 auto;
    height: 100%;
    width: 70%;
    row-gap: 1em;
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    height: 100%;
    grid-area: filter;
    display: flex;
    flex-direction: column;
`;