import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    useColorMode,
    Tooltip,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
    ExportSquare,
    Home2,
    Game,
    Category2,
    Sun1,
    Moon,
    Logout,
    GalleryEdit,
    AudioSquare,
} from "iconsax-react";
import { NaviStyle } from "./styles";
const NavigationBar = (props) => {
    const getlocation = useLocation();

    const { colorMode, toggleColorMode } = useColorMode();
    const [navSize, setNavSize] = useState("small");
    const [location, setLocation] = useState("/home");

    useEffect(() => {
        console.log(
            "🚀 ~ file: index.jsx ~ line 26 ~ NavigationBar ~ params",
            getlocation
        );
        setLocation(getlocation.pathname);
    }, [getlocation]);

    return (
        <NaviStyle>
            <div
                className="options"
                style={
                    navSize === "large"
                        ? { width: "200px" }
                        : { width: "min-content" }
                }
            >
                <Flex>
                    <Button
                        className="menu-alt"
                        onClick={() =>
                            navSize === "small"
                                ? setNavSize("large")
                                : setNavSize("small")
                        }
                    >
                        <Category2
                            size="20"
                            color="currentColor"
                            variant="Outline"
                        />
                    </Button>
                    {navSize === "large" ? (
                        <Button
                            mx="5"
                            className="menu-alt"
                            onClick={() => toggleColorMode()}
                        >
                            {colorMode === "dark" ? (
                                <Moon
                                    size="20"
                                    color="currentColor"
                                    variant="Outline"
                                />
                            ) : (
                                <Sun1
                                    size="20"
                                    color="currentColor"
                                    variant="Outline"
                                />
                            )}
                        </Button>
                    ) : (
                        ""
                    )}
                </Flex>
                <Link to="/">
                    <div className={location === "/" ? "item active" : "item"}>
                        <Box mx="5">
                            <Home2
                                size="20"
                                color="currentColor"
                                variant={location === "/" ? "Bold" : "Outline"}
                            />
                        </Box>
                        {navSize === "large" ? <p>Home</p> : ""}
                    </div>
                </Link>
                <Link to="/addgame">
                    <div
                        className={
                            location === "/addgame" ? "item active" : "item"
                        }
                    >
                        <Box mx="5">
                            <Game
                                size="20"
                                color="currentColor"
                                variant={
                                    location === "/addgame" ? "Bold" : "Outline"
                                }
                            />
                        </Box>
                        {navSize === "large" ? <p>Add Game</p> : ""}
                    </div>
                </Link>
                <div className="item">
                    <Box mx="5">
                        <GalleryEdit
                            size="20"
                            color="currentColor"
                            variant="Outline"
                        />
                    </Box>
                    {navSize === "large" ? <p>Change Assets</p> : ""}
                </div>
                <div className="item">
                    <Box mx="5">
                        <AudioSquare
                            size="20"
                            color="currentColor"
                            variant="Outline"
                        />
                    </Box>
                    {navSize === "large" ? <p>Change Sounds</p> : ""}
                </div>
                <Link to="/export">
                    <div
                        className={
                            location === "/export" ? "item active" : "item"
                        }
                    >
                        <Box mx="5">
                            <ExportSquare
                                size="20"
                                color="currentColor"
                                variant={
                                    location === "/export" ? "Bold" : "Outline"
                                }
                            />
                        </Box>
                        {navSize === "large" ? <p>Export</p> : ""}
                    </div>
                </Link>
            </div>
            <div className="user-wrapper">
                <div className="user">
                    <Tooltip hasArrow label="My name name">
                        <Avatar
                            size="sm"
                            name="Kola Tioluwani"
                            src="https://bit.ly/tioluwani-kolawole"
                        />
                    </Tooltip>
                    {navSize === "large" ? (
                        <div className="sign-out">
                            <p>Sign Out</p>
                            <Box mx="5">
                                <Logout
                                    size="20"
                                    color="currentColor"
                                    variant="Outline"
                                />
                            </Box>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </NaviStyle>
    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
