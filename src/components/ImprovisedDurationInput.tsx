import styled from 'styled-components';
import React, {useState, useEffect} from 'react'
import { MenuItem, Select, Input } from '@material-ui/core';

interface Props {
    getter: (input: number) => void
}

export const DurationInput: React.FC<Props> = ({getter}) => {

    const [textInputErr, setTextInputErr] = useState(false)
    const [value, setValue] = useState(1)
    const [valueType, setValueType] = useState('weeks')

    useEffect( 
        () => getter(translateToSeconds(valueType)),
        [value, valueType]
    )

    const numOnlyRegEx = /[0-9]/

    const translateToSeconds = (optionValue: string): number => {
        switch (optionValue) {
            case 'weeks':
                return value * 604800
            case 'days':
                return value * 86400
            case 'hours':
                return value * 3600
            case 'minutes':
                return value * 60
            default:
                setValueType('weeks')
                return value * 604800
        }
    }

    const selectHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value)
        setValueType(event.target.value as string)
    }

    const inputHandler = (event: any) => {
        const input = event.target.value
        if (numOnlyRegEx.test(input) || input ==="") {
            console.log("c bon", input)
            setValue(event.target.value)
            if (input ==="") {
                setTextInputErr(true)
            } else {
                setTextInputErr(false)
            }
        } else {
            console.log("c pas bon", input)
        }
    }

    return(
        <Wrapper>

            <NumberInput 
                value={value} 
                onChange={inputHandler} 
                type="number"
                error={textInputErr}
            />

            <CustomSelect
                variant="outlined"
                onChange={selectHandler}
                value={valueType}
            >
                <MenuItem value="weeks">Weeks</MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="minutes">Minutes</MenuItem>
            </CustomSelect>


        </Wrapper>
    )

}

const NumberInput = styled(Input)`
    width: 3em;
    height: 2.5em;
    margin-right: 0.5em;
`;

const CustomSelect = styled(Select)`
    height: 2.5em;
    width: 9em;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;