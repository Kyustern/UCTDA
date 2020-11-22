import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client';

const getTodosCount = gql`
    {
        todos {
            title
        }
    }
`

export const Sidebar: React.FC = () => {

    const [count, setCount] = useState(0)

    const apolloClient = useApolloClient()

    useEffect(() => {

        // https://github.com/zenparsing/zen-observable
        // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ObservableQuery

        const subscription = apolloClient.watchQuery({
            query: getTodosCount,
            fetchPolicy: 'cache-only'
        }).subscribe(x => {
            // console.log("Sidebar:React.FC -> x", x)
            if (x.data.todos) {
                const todosNumber = x.data.todos.length
                setCount(todosNumber)    
            }
        })

        return () => {
            //even if the component never unmounts, https://i.kym-cdn.com/entries/icons/mobile/000/028/306/Screen_Shot_2019-01-24_at_3.23.42_PM.jpg
            subscription.unsubscribe()
        }
    }, [])

    return (
        <Wrapper>
            <ButtonRack>
                Filters
                <Divider />
                <Button variant="contained" color="primary">Alphabetical</Button>
                <Button variant="contained" color="primary">Priority</Button>
                <Button variant="contained" color="primary">Creation Date</Button>
                Infos
                <Divider />
                <div>
                    <List>
                        <ListItem>
                            <ListItemText primary="Projects" secondary={count ? count.toString() : 'Nothing to do.... yet'}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Hotel ?" secondary="Trivago"/>
                        </ListItem>
                        <Divider />
                    </List>
                </div>
            </ButtonRack>


        </Wrapper>
    )

}

// const Divider = styled.div`
//     width: 100%;
//     height: 3px;
//     /* box-shadow: 0 2px 2px 1px var(--grey); */
//     background-color: var(--dark);
// `;

const ButtonRack = styled.div`
    margin: 1em auto 0 auto;
    height: 100%;
    width: 70%;
    row-gap: 1em;
    display: flex;
    flex-direction: column;
    /* grid-area: filter; */
`

const Wrapper = styled.div`
    box-shadow: inset -3px 0 3px var(--dark);
    height: 100%;
    width: 100%;
    grid-area: sidebar;
    /* display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto; */
    /* gap: 0px 0px;
    grid-template-areas:
        "filter"
        "info"
        "."; */
`;