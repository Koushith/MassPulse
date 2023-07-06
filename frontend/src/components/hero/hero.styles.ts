import styled, { keyframes } from "styled-components";

export const HeroComponentStyles = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  margin-top: 20em;
  gap:5rem;
  .form {
    display: flex;
    gap: 1.4rem;
    /* align-items:center; */
    flex-direction: column;
    .title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 40px;

      max-width: 600px; /* Set the desired width for the element */
    }

    .action {
      margin-top:2rem;
      display:flex;
      align-items:center;
     gap:2rem;
      .creators-list {
        display: flex;
        align-items: center;
        gap: 1rem;
      
        font-size: 1.4rem;
        color: #fff;
        margin-left: 1rem;
        .list {
          display: flex;
          img {
            width: 39.5px;
            height: 39.5px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #fff;
            margin-left: -1rem;
          }
        }
      }
    }
  }

  .hero-image {
    width: 600px;
    img {
      width: 100%;
      border-radius: 50%;
      /* img {
          width: 50%;
        } */
    }
  }
`;

export const StyledButton = styled.button`
  position: relative;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 12px 24px;
  background-color: #8264f6;
  color: #fff;
  font-weight: 600;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3), 0px 0px 0px 4px #8264f6;
  }
`;

export const typewriterAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const TypewriterText = styled.p<{ steps: number }>`
  white-space: pre;
  overflow: hidden;
  animation: ${typewriterAnimation} 2s steps(${(props) => props.steps}) infinite;
  animation-fill-mode: both;
  animation-delay: 1s;
  display: inline-block;
  vertical-align: top;
  max-width: 100%;

  @keyframes typewriter {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
