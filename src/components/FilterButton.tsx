import React from 'react'
import styled from 'styled-components';

interface Props {
    filterDesc : string
}

export const FilterButton: React.FC<Props> = ({filterDesc}) => {

    return (
        <Button>
            {filterDesc}
        </Button>
    )
}

const Button = styled.button`
    font: inherit;
    height: 2.5rem;
    font-size: inherit;
    background-color: var(--grey);
    border-radius: 10px;
    cursor: pointer;
    
    :hover {
        background-color: var(--main-accent);
    }
`;