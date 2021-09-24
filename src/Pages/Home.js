import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Modal } from 'antd';

import { ReactComponent as BottleSvg } from 'assets/images/bottle.svg';

const Home = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const location = useLocation();
	const history = useHistory();

	if (location.pathname !== '/home') {
		history.replace('/home');
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		history.push('/beerlist');
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<HomeWrapper>
			<WelcomeTitle>Wanna know about beer?</WelcomeTitle>
			<WelcomeSubtitle>Click this beer below</WelcomeSubtitle>
			<BottleWrapper onClick={showModal}>
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
			<StyledModal
				title='Were you born after 2001?'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Yes'
				cancelText='No'>
				<p>We don&apos;t sell alcohol to minors.</p>
			</StyledModal>
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

const StyledModal = styled(Modal)`
	.ant-modal-content {
		background-color: #000000;
		.ant-modal-header {
			padding: 24px;
			background-color: #000000;
			border-bottom: none;
			.ant-modal-title {
				font-size: 28px;
				color: #ffffff;
			}
		}

		.ant-modal-body {
			color: #ffffff;
			font-size: 18px;
		}

		.ant-modal-footer {
			border-top: none;
		}
	}
`;
