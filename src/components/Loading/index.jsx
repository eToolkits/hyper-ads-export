import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";

const LoadingStyle = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = () => {
  return (
    <LoadingStyle>
      <Player
        src="https://assets3.lottiefiles.com/packages/lf20_cud2yjlq.json"
        background="transparent"
        speed="1"
        style={{ width: "150px", height: "150px" }}
        loop
        autoplay
      ></Player>
    </LoadingStyle>
  );
};

export default Loading;
