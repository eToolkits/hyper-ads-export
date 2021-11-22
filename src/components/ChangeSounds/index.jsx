import React from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import {
	Input,
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
import { ArrowDown2, ArrowUp2, AudioSquare } from "iconsax-react";

const ChangeSounds = (props) => {
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
			<Box mb="5">
				<Button
					w="300px"
					p="50px"
					leftIcon={<AudioSquare color="currentColor" />}
					mb="5"
					onClick={handleShowTable}
					colorScheme="teal"
				>
					<Text mr="3">Change Sounds</Text>

					{showTable ? (
						<ArrowUp2 size="20" color="currentColor" />
					) : (
						<ArrowDown2 size="20" color="currentColor" />
					)}
				</Button>

				{showTable ? (
					<>
						<Box
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
											New Sounds file selected path /:{" "}
											<span>{files}</span>
										</h4>
									</aside>
								) : (
									<p>
										Drag 'n' drop new file sound here <br />
									</p>
								)}
							</p>
						</Box>
						<Table my="5" variant="striped" colorScheme="gray" w="100vw">
							<TableCaption>
								* Click to EDIT the link
							</TableCaption>
							<Thead>
								<Tr>
									<Th>Name Sound</Th>
									<Th>Current Sound</Th>
									<Th>New Sound</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>inches</Td>
									<Td>
										{" "}
										<audio controls>
											<source src="horse.ogg" />
										</audio>
									</Td>
									<Td>
										<audio controls>
											<source src="horse.ogg" />
										</audio>
									</Td>
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

ChangeSounds.propTypes = {};

export default ChangeSounds;
