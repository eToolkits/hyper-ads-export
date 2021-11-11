import React from "react";
import { RiGamepadLine } from "react-icons/ri";
import { Avatar, Box, Button, Icon } from "@chakra-ui/react";
import "./styles.css";

const NavigationBar = (props) => {
    const [navSize, setNavSize] = React.useState("small");
    return (
        <div className="navigation-wrapperr">
            <div
                className="options"
                style={
                    navSize === "large"
                        ? { width: "200px" }
                        : { width: "min-content" }
                }
            >
                <Button
                    className="menu-alt"
                    onClick={() =>
                        navSize === "small"
                            ? setNavSize("large")
                            : setNavSize("small")
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 icon "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h7"
                        />
                    </svg>
                </Button>
                <div className="item">
                    <Box mx="5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </Box>
                    {navSize === "large" ? <p>Home</p> : ""}
                </div>
                <div className="item">
                    <Box mx="5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M17 4a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6v-4a6 6 0 0 1 6-6h10zm0 2H7a4 4 0 0 0-3.995 3.8L3 10v4a4 4 0 0 0 3.8 3.995L7 18h10a4 4 0 0 0 3.995-3.8L21 14v-4a4 4 0 0 0-3.8-3.995L17 6zm-7 3v2h2v2H9.999L10 15H8l-.001-2H6v-2h2V9h2zm8 4v2h-2v-2h2zm-2-4v2h-2V9h2z"
                            />
                        </svg>
                    </Box>
                    {navSize === "large" ? <p>Game</p> : ""}
                </div>
                <div className="item">
                    <Box mx="5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </Box>
                    {navSize === "large" ? <p>Source</p> : ""}
                </div>
                <div className="item">
                    <Box mx="5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </Box>
                    {navSize === "large" ? <p>Home</p> : ""}
                </div>
                <div className="item">
                    <Box mx="5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </Box>
                    {navSize === "large" ? <p>Home</p> : ""}
                </div>
            </div>
            <div className="user-wrapper">
                <div className="user">
                    <Avatar
                        size="sm"
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                    />
                    {navSize === "large" ? (
                        <div className="sign-out">
                            <p>Sign Out</p>
                            <Box mx="5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#ffffff"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </Box>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
