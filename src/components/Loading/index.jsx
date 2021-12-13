import React from "react";
import { Player, background } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";

const LoadingStyle = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index:1000
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Loading = () => {
    return (
        <LoadingStyle>
            <Player
                src="https://assets1.lottiefiles.com/packages/lf20_dflmxtnu.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
            ></Player>
        </LoadingStyle>
    );
};

export default Loading;
