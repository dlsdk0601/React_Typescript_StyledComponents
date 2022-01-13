import React, { useState } from "react";
import styled, { keyframes } from "styled-components";


interface CircleProps {
    borderColor: string;
    bgColor: string;
    text?: string;
}

interface ITestProps {
    text: string;
    number: number;
    boolean: boolean;
    arr: any[];
    obj: {
        a: number;
        b: string;
    }
} 

const Test = ({text, number, boolean, arr, obj}:ITestProps) => {

    const [ value, setValue ] = useState<string|number>("");

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget : { value } } = e;
        setValue(value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("test");
    }

    return (
        <div>
            <Circle borderColor="yellow" bgColor="teal" />

            <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} type="text" placeholder="username"/>
                <button>Log in</button>
            </form>

            <Container>
                <H1>Test Title</H1>
                <div>test</div>
            </Container>
        </div>
    )
}

const H1 = styled.h1`
    color: ${props => props.theme.textColor}
`
const Container = styled.div`
    background-color: ${props => props.theme.bgColor}
`

const Circle = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${props => props.borderColor};
    margin-bottom: 100px;
`



export default Test;