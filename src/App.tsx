import React from 'react';
import styled from 'styled-components';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar'
import { TDList } from './components/TDList'

function App() {
    return (
        <Wrapper>
            <Header />
            <Sidebar />
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
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
    "header header"
    "sidebar todos";
`;

export default App;
