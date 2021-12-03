import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
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
import { connect } from "react-redux";
const fs = window.require("fs");
const TempFolder = "./src/TempCombine";
const ChangeAssetsContainer = (props) => {
    const { selectedGame } = props;
    const params = useParams();
    const idgame = params.idgame;
    const ididea = params.ididea;
    console.log("ChangeAssetsContainer");

    const [dataImg, setDataImg] = useState([]);
    const [variableList, setVariableList] = useState([]);

    const handleFile = (file) => {
        console.log(file.path);
        console.dir(file);
        var imageAsBase64 = fs.readFileSync(file.path, "base64");
        console.log(
            "🚀 ~ file: index.jsx ~ line 27 ~ handleFile ~ resultB64",
            imageAsBase64
        );
        let ImageFile = fs
            .readdirSync(TempFolder)
            .filter((item) => item.toLowerCase().includes("image"));
        console.log(ImageFile);

        if (ImageFile.length > 0) {
            let content = fs.readFileSync(`${TempFolder}/${ImageFile[0]}`);
        } else {
            let content = fs.readFileSync(`${TempFolder}/${ImageFile[0]}`);
            // fs.writeFile(`${TempFolder}/Image.js`, `${content}`, function (err) {
            //     if (err) return console.log(err);
            // });
        }
    };
    // clear old file temp when load component
    useEffect(() => {
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

    useEffect(() => {
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
        const doubleQuote = [];
        const defineVariables = [];
        const map1 = new Map();
        const arrayss = contentImageFile.split("var ");
        // console.log(arrayss);

        for (let i = 1; i < arrayss.length; i++) {
            var arraty2 = arrayss[i].split("= ");
            // var key = arraty2[0].replace(" ", "");
            // var value = arraty2[1].replace(" ", "");
            console.log(arraty2[0]);
            // map1.set(arraty2[0], arraty2[1]);
        }
        console.log(map1);

        for (let i = 0; i < contentImageFile.length; i++) {
            if (contentImageFile[i] === `"`) {
                doubleQuote.push(i);
            }
            // console.log(contentImageFile.substring(i, i+3));
            // if (contentImageFile.substring(i, i + 4) === `var `) {
            //     console.log("true");
            // }
            // let a = contentImageFile.substring(contentImageFile[i], contentImageFile[i]+3);
            // console.log(a);
            // if (a === `var`) defineVariables.push(i);
        }
        console.log(doubleQuote);
        // console.log(defineVariables);

        // const variableFileList = [];
        // for (let i = 0; i < doubleQuote.length; i += 2) {
        //     for (let j = 0; j < defineVariables.length; j++) {
        //     let variable = contentImageFile.substring(defineVariables[j]+4, doubleQuote[i]-3);
        //     variableFileList.push(variable);
        //     }
        // }
        // console.log(variableFileList);
        // setVariableList(variableFileList);

        const arrImg = [];
        for (let i = 0; i < doubleQuote.length; i += 2) {
            let img = contentImageFile.substring(
                doubleQuote[i] + 1,
                doubleQuote[i + 1] - 1
            );
            arrImg.push(img);
        }
        setDataImg(arrImg);
    }, []);
    return (
        <>
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
                        {dataImg.map((item) => {
                            let img = document.createElement("img");
                            img.setAttribute("src", item);
                            return (
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>
                                        <Image
                                            boxSize="150px"
                                            objectFit="contain"
                                            src={item}
                                            alt="Error Image"
                                        />
                                    </Td>
                                    <Td>{`${img.naturalHeight}x${img.naturalWidth}`}</Td>
                                    <Td>
                                        <DragDrop
                                            text="asset"
                                            handleFile={handleFile}
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
