import React from "react";
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
var fs = window.require('fs');
const ChangeAssetsContainer = (props) => {
    console.log("appear");
	const params = useParams();
	const idgame = params.idgame;
    console.log("🚀 ~ file: index.jsx ~ line 23 ~ ChangeAssetsContainer ~ idgame", idgame)
	const ididea = params.ididea;
    console.log("🚀 ~ file: index.jsx ~ line 25 ~ ChangeAssetsContainer ~ ididea", ididea)

	const handleFile = (file) => {
		console.log(file.path);
		var imageAsBase64 = fs.readFileSync(file.path, 'base64');
        console.log("🚀 ~ file: index.jsx ~ line 27 ~ handleFile ~ resultB64", imageAsBase64)
        
	};
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
								{/* <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src="https://bit.ly/sage-adebayo"
                                    alt="Segun Adebayo"
                                /> */}
								<DragDrop
									text="asset"
									handleFile={handleFile}
									type="image/jpeg, image/png"
								/>
							</Td>
							<Td>30x50</Td>
						</Tr>
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

export default ChangeAssetsContainer;
