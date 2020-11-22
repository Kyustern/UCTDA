import {useState} from 'react'

import { HandlerType } from '../app/types'

interface Options {
    initialValue?: string,
    initialValid?: boolean, 
    isInitialised?: boolean
}

export const useRegExpValidation = (
        {
            initialValue = "" , 
            initialValid = false, 
            isInitialised = false 
        }: Options, 
        regularExpression: RegExp
    ) => {

    const validationCallback = (input: string): void => {
        setInitialized(true)
        setValue(input)
        setValid(regularExpression.test(input))
    }
    

    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(initialValid)
    const [initialised, setInitialized] = useState(isInitialised)

    const onChange: HandlerType = (e) => validationCallback(e.target.value)

    return {
        value,
        valid,
        initialised,
        onChange
    }
}