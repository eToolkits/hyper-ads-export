import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {
    Image,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Flex,
} from "@chakra-ui/react";
import { ExportSquare, AudioSquare } from "iconsax-react";
import DragDrop from "../../components/DragDrop";
import { DataProcses } from "./../../Utils";
import Loading from "../../components/Loading";

const fs = window.require("fs");
const TempFolder = "./src/TempCombine";
const ChangeAssetsStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const ChangeAssetsContainer = (props) => {
    const { selectedGame } = props;
    const params = useParams();
    const idgame = params.idgame;
    const ididea = params.ididea;
    console.log("ChangeAssetsContainer");

    const [variableListState, setVariableListState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleFile = (data) => {
        console.log(data.file.path);
        console.dir(data.file);
        var imageAsBase64 = fs.readFileSync(data.file.path, "base64");
        console.log(
            "🚀 ~ file: index.jsx ~ line 27 ~ handleFile ~ resultB64",
            imageAsBase64
        );
        let ImageFile = fs
            .readdirSync(TempFolder)
            .filter((item) => item.toLowerCase().includes("image"));
        console.log(ImageFile);
        console.log(data.index);
        // if (ImageFile.length > 0) {
        //     let content = fs.readFileSync(`${TempFolder}/${ImageFile[0]}`);
        // } else {
        // let content = fs.readFileSync(`${TempFolder}/${ImageFile[0]}`);
        // fs.writeFile(`${TempFolder}/Image.js`, `${content}`, function (err) {
        //     if (err) return console.log(err);
        // });
        // }
    };

    // clear old file temp when load component
    useLayoutEffect(() => {
        fs.readdirSync(TempFolder)
            .filter((item) => item.toLowerCase().includes("image"))
            .forEach((file) => {
                console.log(file);
                fs.unlink(`./src/TempCombine/${file}`, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            });
    }, []);

    //transform data to render
    useLayoutEffect(() => {
        const ideaSelect =
            selectedGame.idea[
                selectedGame?.idea?.findIndex((idea) => idea.id === ididea)
            ];

        const ImageFile = fs
            .readdirSync(`${ideaSelect.linkBaseCode}`)
            .filter((item) => item.toLowerCase().includes("image"));

        const contentImageFile = fs.readFileSync(
            `${ideaSelect.linkBaseCode}/${ImageFile[0]}`,
            "utf8"
        );

        const variableList = contentImageFile
            .split("var ")
            .map((item) => {
                return item
                    .split(" = ")
                    .map((item, index) =>
                        index == 1
                            ? item.trim().replace(/["]/g, "").slice(0, -1)
                            : item.trim().replace(/["]/g, "")
                    );
            })
            .slice(1);

        //optimize performance
        let dataTranformStateTemp = [];
        variableList.map((item, index) => {
            const img = document.createElement("img");
            img.setAttribute("src", item[1]);
            img.onload = function () {
                var w = img.width;
                var h = img.height;
                dataTranformStateTemp.push({
                    name: item[0],
                    url: item[1],
                    width: w,
                    height: h,
                });
                console.log("render");
                if (index == variableList.length - 1) {
                    setVariableListState((pre) => [...dataTranformStateTemp]);
                    const time = setTimeout(() => {
                        setIsLoading(false);
                        clearTimeout(time);
                    }, 2000);
                    dataTranformStateTemp = [];
                }
            };
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
                ) : (
                    <Box mb="5">
                    <Table w="100%" my="5" variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>Name Asset</Th>
                                <Th>Current Asset</Th>
                                <Th>Current Size</Th>
                                <Th>New Asset</Th>
                                <Th>New Size</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {variableListState.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <Image
                                                boxSize="150px"
                                                objectFit="contain"
                                                src={item.url}
                                                alt="Error Image"
                                            />
                                        </Td>
                                        <Td>
                                            {item.height}x{item.width}
                                        </Td>
                                        <Td>
                                            <DragDrop
                                                text="asset"
                                                handleFile={handleFile}
                                                indexFile={index}
                                                type="image/jpeg, image/png"
                                            />
                                        </Td>
                                        <Td>null</Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Button mb="5" colorScheme="green">
                                Save
                            </Button>{" "}
                        </Box>
                        <Box>
                            <Link
                                to={
                                    `/editgame/` +
                                    idgame +
                                    "/" +
                                    ididea +
                                    `/changesounds`
                                }
                            >
                                <Button
                                    mb="5"
                                    colorScheme="green"
                                    rightIcon={
                                        <AudioSquare
                                            size="20"
                                            color="currentColor"
                                        />
                                    }
                                >
                                    Change Sounds
                                </Button>{" "}
                            </Link>
                            <Link to={"/export/" + idgame + `/` + ididea}>
                                <Button
                                    mb="5"
                                    ml="5"
                                    colorScheme="green"
                                    rightIcon={
                                        <ExportSquare
                                            size="20"
                                            color="currentColor"
                                        />
                                    }
                                >
                                    Export Now
                                </Button>{" "}
                            </Link>
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    );
};

ChangeAssetsContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {
        selectedGame: state.gameSelected,
    };
};
export default connect(mapStateToProps, null)(ChangeAssetsContainer);
