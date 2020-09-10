import React from 'react'
import styled from 'styled-components';

export const Header: React.FC = () => {
    return(
        <Wrapper>
            <Title>UCTDA</Title>
        </Wrapper>
    )
}

const Title = styled.h1`
    padding: 0;
    margin: 0;
`;

const Wrapper = styled.div`
    grid-area: header;
    width: 100%;
    background-color: var(--light-grey);
`;