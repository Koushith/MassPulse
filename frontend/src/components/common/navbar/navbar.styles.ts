import styled from "styled-components";

export const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo{
    font-size:1.6rem;
    font-weight:900;
   
  }
padding: 1.2rem 2rem;
  nav {
    ul {
      display: flex;
      align-items:center;
      list-style:none;
      gap:2rem;

      li> a{
        color:#fff;
        text-decoration:none;
        font-weight:500;
        font-size:1.4rem;
      }
    }
  }
`;
