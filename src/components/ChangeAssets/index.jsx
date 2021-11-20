import React from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import {
    Image,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
} from "@chakra-ui/react";
import { ArrowDown2, ArrowUp2, GalleryEdit } from "iconsax-react";

const ChangeAssets = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ".js",
        maxFiles: 1,
    });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const [showTable, setShowTable] = React.useState(false);
    const handleShowTable = () => {
        setShowTable(!showTable);
    };
    return (
        <>
            <Box mb="5" w="100%">
                <Button
                    leftIcon={<GalleryEdit color="currentColor" />}
                    mb="5"
                    onClick={handleShowTable}
                    colorScheme="teal"
                >
                    <Text mr="3">Change Assets</Text>

                    {showTable ? (
                        <ArrowUp2 size="20" color="currentColor" />
                    ) : (
                        <ArrowDown2 size="20" color="currentColor" />
                    )}
                </Button>

                {showTable ? (
                    <>
                        <Box
                            w="100%"
                            border="2px dashed"
                            p="10px"
                            {...getRootProps({
                                className: "dropzone",
                            })}
                        >
                            <input {...getInputProps()} />
                            <p>
                                {files.length ? (
                                    <aside>
                                        <h4 className="path-select">
                                            New Assets file selected path /:{" "}
                                            <span>{files}</span>
                                        </h4>
                                    </aside>
                                ) : (
                                    <p>
                                        Drag 'n' drop new file assets here{" "}
                                        <br />
                                    </p>
                                )}
                            </p>
                        </Box>
                        <Table
                            w="100%"
                            my="5"
                            variant="striped"
                            colorScheme="gray"
                        >
                            <TableCaption>
                                * Click to EDIT the link
                            </TableCaption>
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
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>
                                        <Image
                                            boxSize="100px"
                                            objectFit="cover"
                                            src="https://bit.ly/sage-adebayo"
                                            alt="Segun Adebayo"
                                        />
                                    </Td>
                                    <Td>30x50</Td>
                                    <Td>
                                        <Image
                                            boxSize="100px"
                                            objectFit="cover"
                                            src="https://bit.ly/sage-adebayo"
                                            alt="Segun Adebayo"
                                        />
                                    </Td>
                                    <Td>30x50</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Button
                            mx="5"
                            mb="5"
                            colorScheme="green"
                            onClick={handleShowTable}
                        >
                            Save
                        </Button>{" "}
                        <Button
                            mx="5"
                            mb="5"
                            colorScheme="red"
                            onClick={handleShowTable}
                        >
                            Close
                        </Button>{" "}
                    </>
                ) : (
                    ""
                )}
            </Box>
        </>
    );
};

ChangeAssets.propTypes = {};

export default ChangeAssets;
