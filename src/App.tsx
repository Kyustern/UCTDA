import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { Filter } from './components/Filter'
import { TDList } from './components/TDList'

function App() {
    return (
        <Wrapper>
            <Header />
            <Filter />
            <TDList />
        </Wrapper>

    );
}

const Wrapper = styled.div`
    height: 100vh;
    display: grid;
    font-size: calc(10px + 2vmin);
    font-family: Helvetica,Arial,courier;
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    grid-template-rows: 0.2fr 1fr;
    grid-template-areas:
    "header header"
    "filter todos";
`;

export default App;
