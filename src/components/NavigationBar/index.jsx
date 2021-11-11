import React from "react";
import { BiHomeAlt, BiArrowFromLeft } from "react-icons/bi";
import logo from "./../../asset/monsterlogo200.png";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import "./styles.css";
const NavigationBar = (props) => {
	return (
		<div className="navigation-wrapperr">
			<div className="options">
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				<div className="item">
					<BiHomeAlt />
					<p>Home</p>
				</div>
				<div className="item">
					<BiHomeAlt />
					<p>Game</p>
				</div>
				<div className="item">
					<BiHomeAlt />
					<p>Source</p>
				</div>
				<div className="item">
					<BiHomeAlt />
					<p>Home</p>
				</div>
				<div className="item">
					<BiHomeAlt />
					<p>Home</p>
				</div>
			</div>
			<div className="user-wrapper">
				<div className="user">
					<Avatar
						size="sm"
						name="Kola Tioluwani"
						src="https://bit.ly/tioluwani-kolawole"
					/>
					<div className="sign-out">
						<p>Sign Out</p>
						<BiArrowFromLeft />
					</div>
				</div>
			</div>
		</div>
	);
};

NavigationBar.propTypes = {};

export default NavigationBar;
