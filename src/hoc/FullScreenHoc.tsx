import React from 'react'
import styled from 'styled-components';

interface Props {
    // children: React.FC
}

export const FSHOC: React.FC<Props> = ({children}) => {
    return (
        <FullScreenWrapper>
            {children}
        </FullScreenWrapper>
    )
}

const FullScreenWrapper = styled.div`
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