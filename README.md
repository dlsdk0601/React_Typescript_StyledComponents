# React With TypeScript and styled-components

## TypeScript 

> 스타일 컴포넌트의 테마를 사용하려면 먼저 전역으로 쓸 테마의 타입 정의가 필요하다. 

<br />
-styled.d.ts
```
    import "styled-components";

    declare module "styled-components" {
        export interface DefaultTheme {
            textColor: string;
            bgColor: string;
        }
    }
```

<br />

-theme.ts
```
    import { DefaultTheme } from "styled-components";

    export const lightTheme:DefaultTheme = {
        bgColor: "white",
        textColor: "black"
    }

    export const darkTheme:DefaultTheme = {
        bgColor: "black",
        textColor: "white"
    }
```

<br />
> 테마는 전역에서 쓰여지는 것이기에 위와 같은 방식으로 타입 설정

<br />

> theme.ts의 스타일을 전역에서 가져오려면 App 컴포넌트를 ProviderTheme로 감싸주고 테마를 props로 넘겨준다 

<br />

-index.tsx
```
    import {ThemeProvider} from "styled-components";
    import { lightTheme, darkTheme } from './theme';


    ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
    );
```
<br />
<br />

> 위와 같이 설정 후 어느 컴포넌트에서든 해당 테마의 스타일을 가져 올수 있다. 특히 App 컴포넌트에서 reset.css 설정할때 넣어주면 된다.

<br />

-App.tsx
```
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Test from './component/test';

function App() {
  return (
    <>
      <GlobalStyle />
      <Test />
    </>
  );
}

const GlobalStyle = createGlobalStyle` 
  
  ...

    body{
        color: ${ props => props.theme.textColor};
    }

   ...

`;

```

<br />
<br />

> 스타일 컴포넌트에 props를 줄때 props의 타입 또한 설정 해줘야한다. interface로 설정 해주는데, 어떤 props가 있을지 없을지 확실치 않을때 ? 로 설정해준다

<br />

-Test.tsx
```
    interface CircleProps {
        borderColor: string;
        bgColor: string;
        text?: string;
    }

    const Test = () => {

        return (
            <Circle borderColor="yellow" bgColor="teal" />
        )
    }

    const Circle = styled.div<CircleProps>`
        width: 200px;
        height: 200px;
        background-color: ${props => props.bgColor};
        border-radius: 100px;
        border: 1px solid ${props => props.borderColor};
        margin-bottom: 100px;
    `
```

<br />
<br />

> 함수, react에서는 useState또한 타입 선언을 해준다 
<br />

-Test.tsx
```
    const Test = () => {
    
        const [ value, setValue ] = useState<string|number>("");  //어떤 타입이 올지 모를때는 

        const onChange = (e: React.FormEvent<HTMLInputElement>) => { 
            // e에 타입 설정을 위처럼 해준다. 어떤 태그의 이벤트인지 그리고 어떤 HTML태그를 사용했는지 명시 필요
            
            const { currentTarget : { value } } = e;
            setValue(value);
        }

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("test");
        }


        return (
            <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} type="text" placeholder="username"/>
                <button>Log in</button>
            </form>
        )
    }
```

<br />
<br />

> 컴포넌트로 props를 넘길때도 interface로 설정해줘야한다.

<br />

-App.tsx
```
    const App = () => {

        const arr = ["text", 100];
        const obj = {a:1, b:"text"}

        return (
            <Test text={"text"} number={100} boolean={true} arr={arr} obj={obj} />
        )
    }
```

<br />
<br />

-Test.js
```
    interface ITestProps {
        text: string;
        number: number;
        boolean: boolean;
        arr: any[];   //타입이 불명확할때는 any를 쓴다
        obj: {
            a: number;
            b: string;
        }
    }

    const Test = ({text, number, boolean, arr, obj}:ITestProps) => {
        
        ...

    } 
```

