import React, { useState } from 'react'
import styled from 'styled-components';
import { TextField, Divider, Button } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'

import { useInputValidation } from '../hooks/useInputValidation';
import { useRegExpValidation } from '../hooks/useRegExpValidation';
import { HandlerType } from '../app/types'
import { SnackBarWrapper } from './SnackBarWrapper'
import { Switch } from './Switch'
import Loader from './Loader';

const LOGIN = gql`
    mutation Login($user: UserInput) {
        login(user: $user)
    }
`

const REGISTER = gql`
    mutation Register($user: UserInput) {
        register(user: $user)
    }
`

//Misc

//A regular expression of an email address
//i obviously stole this from the internet
// eslint-disable-next-line
const mailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

// eslint-disable-next-line
const passwordRegExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

interface Props {
    registerForm?: boolean
    closeForm: () => void
}

export const AuthForm: React.FC<Props> = ({ closeForm }) => {

    const [login, loginState] = useMutation(LOGIN)
    const [register, registerState] = useMutation(REGISTER)
    
    const [registerForm, setRegisterForm] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [errText, setErrText] = useState("Failed to proceed")
    
    const email = useRegExpValidation({}, mailRegExp)
    const password = useRegExpValidation({}, passwordRegExp)
    const passwordConfHandler = (input: string) => input === password.value
    const passwordConf = useInputValidation({}, passwordConfHandler)

    const displayError = (text: string): void => {
        setErrText(text)
        setShowErr(true)
    }


    //Handlers
    const submitHandler = () => {
        if (registerForm) {
            if (email.valid && password.valid && passwordConf.valid) {
                register({
                    variables: {
                    "email": email.value,
                    "password": password.value
                    }
                })
            } else displayError("Please correct the highlited fields")
        } else {
            if (email.valid && password.valid) {
                login({
                    variables: {
                    "email": email.value,
                    "password": password.value
                    }
                })                
            } else displayError("Please correct the highlited fields")
        }
    }

    if (loginState.error || registerState.error) displayError("Failed to proceed")

    return (
        <Wrapper>

            <SnackBarWrapper
                isOpen={showErr}
                text={errText}
                close={() => setShowErr(false)}
            />
            <InnerWrapper>

                <Switch 
                    buttonText={{left: "LOGIN", right: "REGISTER"}}
                    bool={registerForm}
                    setBoolean={setRegisterForm}
                />
                
                <TextField
                    value={email.value}
                    onChange={email.onChange as HandlerType}
                    error={!email.valid && email.initialised}
                    helperText={!email.valid && email.initialised ? "Email must be a valid address" : " "}
                    margin="dense"
                    placeholder="Email"
                    variant="outlined"
                />
                <ErrorLabel>
                    {!email.valid && email.initialised ? "Email must be a valid address" : " "}
                </ErrorLabel>
                <Separator />
                <TextField
                    value={password.value}
                    onChange={password.onChange as HandlerType}
                    error={!password.valid && password.initialised}
                    helperText={!password.valid && password.initialised ? "Password must contain at least one lowercase, one uppercase, and a numeric caracter" : " "}
                    margin="dense"
                    placeholder="Password"
                    variant="outlined"
                    type="password"
                />
                {
                    registerForm &&
                    <>
                        <Separator />
                        <TextField
                            value={passwordConf.value}
                            onChange={passwordConf.onChange as HandlerType}
                            error={!passwordConf.valid && passwordConf.initialised}
                            helperText={!passwordConf.valid && passwordConf.initialised ? "This field should have the same value as the password field" : " "}
                            margin="dense"
                            placeholder="Password confirmation"
                            variant="outlined"
                        />
                    </>
                }
                <Separator />
                {loginState.error || registerState.error ?
                <Loader />
                :
                    <>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={submitHandler}>
                            Continue
                        </Button>
                        <Button
                            onClick={closeForm}>
                            Cancel
                        </Button>
                    </>
                }
            </InnerWrapper>
        </Wrapper>
    )
}

const ErrorLabel = styled.p`
    max-width: 24em;
    overflow-wrap: break-word;
    font-size: 0.5em;
    color: var(--primary)
`;

const Separator = styled.div`
    width: 100%;
    height: 2px;
    background-color: var(--dark);
    margin-bottom: 0.5em;

`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;

`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: auto;
    height: auto;
    padding: 2.5em;
    border-radius: 20px;
`;