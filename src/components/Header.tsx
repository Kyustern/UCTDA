import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { SnackBarWrapper } from './SnackBarWrapper'

import { setAuthState, isAuthenticated } from '../features/authSlice'
import Loader from './Loader'
import { FSHOC } from '../hoc/FullScreenHoc'
import { AuthForm } from './AuthForm'

const LOGIN = gql`
    mutation Login($user: UserInput) {
        login(user: $user)            
    }
`

export const Header: React.FC = () => {

    // HOOK(ER)S

    const [showErr, setShowErr] = useState<boolean>(false)
    const [showForm, setShowForm] = useState<boolean>(true)
    const [errText, setErrText] = useState<string>("Error trying to connect")

    const dispatch = useDispatch()

    const isAuth = useSelector(isAuthenticated)

    const [login, loginState] = useMutation(LOGIN)
    const [logout, logoutState] = useMutation(LOGIN)

    // HANDLERS

    const snackBarCloseHandler = ():void => {
        //Clear form inputs, etc...
        setShowErr(false)
    }

    const btnHandler = async (): Promise<boolean> => {
        login({
            variables: {
                "email": "leont562@gmail.com",
                "password": "123456789"
            }
        })

        return true
    }

    // if (showForm) return (
    //     <FSHOC>
    //         <AuthForm />
    //     </FSHOC>
    // )        

    return (
        <Wrapper>
            {showForm && 
                <FSHOC>
                    <AuthForm closeForm={() => setShowForm(false)} />
                </FSHOC>
            }
            <SnackBarWrapper
                text={errText}
                isOpen={showErr}
                close={snackBarCloseHandler}
            />
            <Title>UCTDA</Title>
            <LoginWrapper>
                {
                    logoutState.loading || loginState.loading ?
                        <Loader />
                        :
                        isAuth ?
                            <CustomButton
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={btnHandler}
                            >
                                LOGOUT
                            </CustomButton>
                            :
                            <>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={btnHandler}>
                                    REGISTER
                                </Button>
                                <CustomButton
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={btnHandler}>
                                    LOGIN
                                </CustomButton>
                            </>
                }
            </LoginWrapper>
        </Wrapper>
    )
}

const CustomButton = styled(Button)`
    margin-left: 0.5em !important;
`

const Title = styled.h1`
    padding: 0;
    margin: 0;
    grid-area: title;
`;

const LoginWrapper = styled.div`
    grid-area: login;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.3fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "title . login";
    grid-area: header;
    width: 100%;
    background: rgb(245,0,87);
    background: linear-gradient(0deg, rgba(245,0,87,1) 0%, rgba(63,81,181,1) 100%); 
`;

    //Render Methods

    // const renderButtons = (): <JSX.Element | undefined> => {
    //     if (logoutState.loading || loginState.loading) return <Loader />

    //     if (isAuth) return (
    //         <CustomButton
    //             variant="contained"
    //             color="secondary"
    //             size="large"
    //             onClick={btnHandler}
    //         >
    //             LOGOUT
    //         </CustomButton>
    //     )
    //     if (!isAuth) return (
    //         <>
    //             <Button
    //                 variant="contained"
    //                 color="secondary"
    //                 size="large"
    //                 onClick={btnHandler}>
    //                 REGISTER
    //             </Button>
    //             <Button
    //                 variant="contained"
    //                 color="secondary"
    //                 size="large"
    //                 onClick={btnHandler}>
    //                 LOGIN
    //             </Button>
    //         </>
    //     )
    // }