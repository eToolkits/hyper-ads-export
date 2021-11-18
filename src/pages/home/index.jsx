import React from "react";
import PropTypes from "prop-types";
import {
	InputLeftElement,
	InputGroup,
	Input,
	Box,
	Button,
	Text,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	ModalFooter,
	HStack,
} from "@chakra-ui/react";
import { SearchNormal1, AddSquare, ArrowDown3 } from "iconsax-react";
import { HomePageStyle } from "./styles";
const HomePage = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef();
	const finalRef = React.useRef();
	return (
		<HomePageStyle>
			<Box my="5">
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<SearchNormal1 color="currentColor" />}
					/>
					<Input width="50%" type="text" placeholder="search ..." />
				</InputGroup>
			</Box>
			<Box>
				<Button
					mr="5"
					onClick={onOpen}
					leftIcon={<AddSquare color="currentColor" />}
					mb="5"
					colorScheme="teal"
				>
					<Text mr="3">Add Game</Text>
				</Button>
				<Modal
					initialFocusRef={initialRef}
					finalFocusRef={finalRef}
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Add detail for your game</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl isRequired>
								<FormLabel>Name game</FormLabel>
								<Input
									ref={initialRef}
									placeholder="Ex: Sky Raptor"
								/>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Link store IOS</FormLabel>
								<Input placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662" />
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Link store CHPlay</FormLabel>
								<Input placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter" />
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Link Base code folder</FormLabel>
								<Input placeholder="Ex: D:\Base\SkyRaptor" />
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="teal" mr={3}>
								Save
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				<HStack>
					<Button colorScheme="teal">
						<Text onClick={onOpen}>Sky Raptor</Text>
						<Button ml="0" onClick={onOpen} colorScheme="teal">
							<ArrowDown3 bg="tomato" color="currentColor" />
						</Button>
					</Button>
				</HStack>
			</Box>
		</HomePageStyle>
	);
};

HomePage.propTypes = {};

export default HomePage;
