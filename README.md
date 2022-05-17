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
> <br />

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

<br />

### 번외

> 반응형 작업 시, media Screen으로 작업 했던 방식을, styled-components에서 지원해주는 css 함수로 좀더 간편하게 작성하는 방법을 찾았습니다. **from 동현님 감사염**

<br />

#### css란?

<br />

> styled-components에서 제공하는 함수이다. css 코드를 작성하여 변수에도 저장할 수 있다.

ex)

```
    import { css } from "styled-components"

    const flex = css`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const Center = styled.div`
        width: 100%;
        height: 100%;

        <!-- ${} 안에 css로 만들어 놓은 변수를 넣어준다. -->
        ${flex}
    `;

    function App(){

        return (
            <Center>
                중앙
            </Center>
        )
    }
```

<br />

#### 왜 css 에서 ``으로 코드를 감싸는가.

> 일반 함수에서도 ``으로 감싼 부분이 문자열로 함수의 인자로 쓸 수 있다. 우연치 않게 styled-components를 공부하면서 알게되었는데, 용이하게 쓸 일 수 있을꺼같다.

<br />

es)

```
    function print(str){
        return str + "is printed";
    }

    const res = print`this is JS`;  // console => this is JS is printed

```

#### 반응형에서 css 함수

<br />

ex)

```
    <!-- 반응형 작업할 사이즈를 number 타입으로 설정해준다. -->
    const sizes = {
    desktop: 1024,
    tablet: 768
    };

    <!-- reduce로 desktop, tablet을 키값으로 갖는 객체를 만들어 각 키값에 meadia 쿼리를 반환하는 함수를 설정한다. -->
    const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
        }
    `;

    return acc;
    }, {});

    const Box = styled.div`
        width: 1024px;
        margin: 0 auto;

        ${media.desktop`width: 768px;`}
        ${media.tablet`width: 768px;`};
    `;
```
