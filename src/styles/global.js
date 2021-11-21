import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing:border-box;
  }


:root{
--blue:#403CAA;
--green: #11995E;
--darkgray: #333333;
--mediumgray: #999999;
--lightgray: #F5F5F5;
}

button{
    cursor: pointer;
}

a {
    text-decoration: none;
  }

`