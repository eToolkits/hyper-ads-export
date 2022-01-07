import styled from "styled-components";

export const AuthContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 100px;
  .logo{
    width: 200px;
  }
  .button {
    cursor: pointer;
    display: block;
    font-size: 1.3em;
    box-sizing: content-box;
    margin: 20px auto 0px;
    width: 70%;
    padding: 15px 20px;
    border-radius: 200px;
    border: 1px solid var(--teal-800);
    background-color: white;
    box-shadow: 0px 16px 60px rgba(78, 79, 114, 0.08);
    position: relative;
    outline: none;
    transition: background 0.2s linear;
    &:hover{
      background-color: var(--teal-800);
      transition: background 0.2s linear;
    }
  }


  .buttonText {
    color: #4285f4;
    font-weight: bolder;
  }

  .icon {
    height: 25px;
    width: 25px;
    margin-right: 0px;
    position: absolute;
    left: 30px;
    align-items: center;
  }

`;
