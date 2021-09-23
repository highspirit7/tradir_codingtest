import React, { useState, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

const BeerModal = ({ beer }, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalOpener, setModalOpener] = useState(null);
	const modalRef = useRef(null);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		modalOpener && modalOpener.focus();
	}, [modalOpener]);

	const handleDimClose = (event) => {
		event.stopPropagation();
		event.target === event.currentTarget && handleClose();
	};

	const handleEscape = useCallback(
		(event) => {
			if (event.keyCode === 27) handleClose();
		},
		[handleClose]
	);

	useImperativeHandle(
		ref,
		() => ({
			handleOpen: () => {
				setModalOpener(document.activeElement);
				setIsOpen(true);
				setTimeout(() => modalRef.current?.focus());
			},
			handleClose,
		}),
		[handleClose]
	);

	useEffect(() => {
		if (isOpen) document.addEventListener('keydown', handleEscape, false);
		return () => {
			document.removeEventListener('keydown', handleEscape, false);
		};
	}, [handleEscape, isOpen]);

	return createPortal(
		isOpen ? (
			<Wrapper onClick={handleDimClose}>
				<StyledModal ref={modalRef} tabIndex={-1} aria-modal='true'>
					<Title>{beer.name}</Title>
					<SeparationLine />
					<Content>
						<BeerImage src={beer.image_url} alt='beer_image' />
						<ul>
							<li>
								<h5>Tagline</h5>
								<p>{beer.tagline}</p>
							</li>
							<li>
								<h5>First Brewed</h5>
								<p>{beer.first_brewed}</p>
							</li>
							<li>
								<h5>Description</h5>
								<p>{beer.description}</p>
							</li>
							{beer.abv && (
								<li>
									<h5>Alcohol By Volume</h5>
									<p>{beer.abv}</p>
								</li>
							)}
							{beer.ibu && (
								<li>
									<h5>International Bitterness Units</h5>
									<p>{beer.ibu}</p>
								</li>
							)}
							{beer.ebc && (
								<li>
									<h5>Color Units EBC</h5>
									<p>{beer.ebc}</p>
								</li>
							)}

							<li>
								<h5>Ph</h5>
								<p>{beer.ph}</p>
							</li>
							<li>
								<h5>Ingredients</h5>
								<h6>malt</h6>
								<ul>
									{beer.ingredients.malt.map((malt, index) => (
										<li key={`${malt.name}${index}`}>
											<span>{malt.name}</span>
											<span>{`- ${malt.amount.value}${malt.amount.unit === 'grams' ? 'g' : 'kg'}`}</span>
										</li>
									))}
								</ul>
								<h6>hops</h6>
								<ul>
									{beer.ingredients.hops.map((hop, index) => (
										<li key={`${hop.name}${index}`}>
											<span>{hop.name}</span>
											<span>{` - ${hop.amount.value} ${hop.amount.unit === 'grams' ? 'g' : 'kg'}`}</span>
										</li>
									))}
								</ul>
								<h6>yeast</h6>
								<p>{beer.ingredients.yeast}</p>
							</li>
							<li>
								<h5>Food Pairing</h5>
								<p>{beer.food_pairing.join(', ')}</p>
							</li>
						</ul>
					</Content>
				</StyledModal>
			</Wrapper>
		) : null,
		document.body
	);
};

export default forwardRef(BeerModal);

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.4);
	z-index: 10000;
`;

const StyledModal = styled.dialog`
	position: relative;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	border: 0;
	/* padding: 40px 32px; */
	padding: 0;
	background-color: #2d303e;
`;

const Title = styled.h2`
	display: block;
	width: 100%;
	padding: 24px;
	/* margin-bottom: 16px; */
	font-size: 30px;
	line-height: 1.5;
	font-weight: 700;
	color: #ffffff;
	text-align: center;
`;

const SeparationLine = styled.hr`
	width: 100%;
	margin: 0;
	color: #ffffff;
`;

const Content = styled.div`
	padding: 32px 24px;
	display: flex;
	color: #ffffff;

	ul {
		max-width: 280px;
		padding-right: 16px;
		li {
			margin-bottom: 8px;

			h5 {
				color: lightcoral;
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 2px;
			}

			h6 {
				color: lightblue;
				font-size: 16px;
				font-weight: 400;
				margin: 6px 0;
			}

			p {
				font-size: 14px;
			}

			& > ul {
				li {
					font-size: 14px;
				}
			}
		}
	}
`;

const BeerImage = styled.img`
	width: 240px;
	height: 360px;
	object-fit: scale-down;
`;
