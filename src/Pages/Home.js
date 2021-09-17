/* eslint-disable */
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as BottleSvg } from 'assets/images/bottle.svg';
// 애니메이션 위에 어떤 문구하나 넣어주고 ; Wanna know about beer?
// Punk API에 있는 맥주병 그대로 애니메이션으로 흰 바탕 정중앙에 돌리고
// 클릭 시 나이 묻는 컨펌창 띄워서 yes면 beerlist로 진입
const Home = () => {
	const location = useLocation();
	const history = useHistory();
	console.log(location);

	if (location.pathname !== '/home') {
		history.replace('/home');
	}

	return (
		<HomeWrapper>
			<WelcomeTitle>Wanna know about beer?</WelcomeTitle>
      <WelcomeSubtitle>Click this beer below</WelcomeSubtitle>
			<BottleWrapper>
				<div className='bottle-face'>
					<StyledBottle />
				</div>
				<div className='bottle-face'>
					<StyledBottle />
				</div>
				<div className='bottle-face'>
					<StyledBottle />
				</div>
				<div className='bottle-face'>
					<StyledBottle />
				</div>
			</BottleWrapper>
		</HomeWrapper>
	);
};

export default Home;

const spin = keyframes`
  0% {
    transform: rotateY(0)
  }
  100% {
    transform: rotateY(1turn)
  }
`;

const BottleWrapper = styled.div`
	width: 40px;
	transform-style: preserve-3d;
	animation: ${spin} 5s linear infinite;
  cursor: pointer;
  
	.bottle-face {
		position: absolute;
		width: 40px;
	}

	.bottle-face:first-child {
		transform: translateZ(-20px) rotateY(180deg);
	}
	.bottle-face:nth-child(2) {
		transform: rotateY(-270deg) translateX(20px);
		transform-origin: top right;
	}
	.bottle-face:nth-child(3) {
		transform: rotateY(270deg) translateX(-20px);
		transform-origin: center left;
	}
	.bottle-face:nth-child(4) {
		transform: translateZ(20px);
	}
`;

const colorChange = keyframes`
  0% {
    fill: #6cb150;
  }
  25% {
    fill: #00b0e0;
  }
  50% {
    fill: #ffc04c;
  }
  75% {
    fill: #ec5739;
  }
  100% {
    fill: #6cb150;
  }
`;

const StyledBottle = styled(BottleSvg)`
	.logo__label {
		animation: ${colorChange} 14s infinite forwards;
	}
`;

const WelcomeTitle = styled.h1`
	font-size: 50px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const WelcomeSubtitle = styled.h2`
	font-size: 30px;
	font-weight: 400;
	margin-bottom: 40px;
`;

const HomeWrapper = styled.div`
	width: 100%;
	height: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
