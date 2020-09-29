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
    background: rgb(245,0,87);
    background: linear-gradient(0deg, rgba(245,0,87,1) 0%, rgba(63,81,181,1) 100%); 
`;