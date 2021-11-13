import styled from "styled-components";

export const NaviStyle = styled.div`
    display: flex;
    align-items: center;
	flex-direction: column;
	margin: 10px 0;
	padding: 20px;
	box-shadow: 0px 0px 10px #6b6b6b2d;
	width: fit-content;
	height: calc(100vh - 20px);
	border-radius: 10px;
	transition: all 0.2s linear;
    .options{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
        width: 200px;
        transition: all 0.2s linear;
        .menu-alt {
            width: 60px;
            height: 60px;
            border-radius: 10px;
        }
        .item {
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 0;
            border-radius: 10px;
            transition: all 0.2s linear;
            line-height: 20px;
            background: var(--chakra-colors-whiteAlpha-200);
        }
        .active{
            background: var(--teal-300);
            color: var(--teal-900);
        }
        .item:hover {
            background-color: var(--teal-200);
            color: var(--teal-900);
            transition: all 0.2s linear;
        }
    }
    .user-wrapper {
        display: flex;
        align-items: center;
        border-radius: 10px;
        width: 100%;
        background: var(--chakra-colors-whiteAlpha-200);
        transition: all 0.2s linear;
        .user {
            display: flex;
            align-items: center;
            margin: 0 auto;
            padding: 10px;
            width: fit-content;
            .sign-out {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                p{
                    margin: 0 10px;
                    line-height: 32px;
                }
            }
        }
    }
    .user-wrapper:hover {
        background-color: var(--teal-500);
        transition: all 0.2s linear;
    }
`