import { useState } from 'react'

import { HandlerType } from '../app/types'

//This hook may look a bit unecessary, but i created it so that i won't have
//to manage 60045495121 booleans and string variables in my form components, 
//or anything that uses a text input

interface Options {
    initialValue?: string,
    initialValid?: boolean,
    isInitialised?: boolean
}
export const useInputValidation = (
    {initialValue = "", initialValid = false, isInitialised = false}: Options,
    inputVerifier?: (input: string) => boolean
) => {

    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(initialValid)
    const [initialised, setInitialized] = useState(isInitialised)

    const cb = (input: string): void => {
        setValue(input)
        if (!initialised) setInitialized(true)
        if (inputVerifier) setValid(inputVerifier(input))
    }

    const onChange: HandlerType = (e) => cb(e.target.value)

    return {
        value,
        valid,
        initialised,
        onChange
    }
}