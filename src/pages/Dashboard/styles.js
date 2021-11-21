import styled from 'styled-components'

export const ContainerDashboard= styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

@media(min-width: 900px){
    flex-direction:row;
    flex-wrap:wrap;
    margin-top:30px;
}


`
