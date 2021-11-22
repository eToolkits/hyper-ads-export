import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Text, Flex } from "@chakra-ui/react";
import { ArrowDown2, ArrowUp2, ArrowRight } from "iconsax-react";
import ChangeSounds from "../../components/ChangeSounds";
import ChangeAssets from "../../components/ChangeAssets";
const fs = window.require("fs");
const path = window.require("path");
const EditGame = (props) => {
	useEffect(() => {
		const getAllFromDir = (source) =>
			fs.readdirSync(source).map((name) => path.join(source, name));
		let dir = String.raw`\\192.168.1.11\MKT-creative\3. Playable ads\Base`;
		console.log(getAllFromDir(dir));
	}, []);
	return (
		<Flex align="center" direction="column" w="100%" my="30px">
			<ChangeSounds />
			<ChangeAssets />
			<Button w="300px" p="50px" mb="5" colorScheme="green">
				<Text mr="3">No, Just export</Text>
				<ArrowRight size="20" color="currentColor" />
			</Button>
		</Flex>
	);
};

EditGame.propTypes = {};

export default EditGame;
