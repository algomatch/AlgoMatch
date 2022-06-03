import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components';
import db from './utils/algos.json';
import logo from './assets/algomatch-logo.png';

function App() {
	const algos = db.algos;
	const [lastSwipe, setLastSwipe] = useState('');
	const [swipeCount, setSwipeCount] = useState(0);
	const [imageRendered, setImageRendered] = useState(false);
	const [index, setIndex] = useState(-1);
	const [viewChat, setViewChat] = useState(false);

	const pictures = [
		{ id: '1', name: 'David', uri: require('./assets/dave.jpeg') },
		{ id: '2', name: 'Scott', uri: require('./assets/scott.png') },
		{ id: '3', name: 'Kevin', uri: require('./assets/kev.png') },
		{ id: '4', name: 'TX', uri: require('./assets/tx.png') },
		{ id: '5', name: 'Vince', uri: require('./assets/vince.jpeg') },
	];

	const swiped = (direction: any, nameToDelete: string) => {
		if (direction === 'right') setSwipeCount((p) => ++p);
		setLastSwipe(`You swiped ${direction} on ${nameToDelete}.`);
	};

	const openChat = () => {
		setViewChat(true);
	};

	useEffect(() => {
		console.log(`Swipe count: ${swipeCount}`);
		if (swipeCount % 3 === 2) {
			setImageRendered(true);
			setIndex((p) => ++p);
		} else {
			setImageRendered(false);
		}
	}, [swipeCount]);

	useEffect(() => {
		console.log(`Index: ${index}`);
	}, [index]);

	const incrementSwipeCount = () => {};

	return (
		<Container>
			<CardContainer>
				{algos.map((algorithm) => (
					<TinderCard
						className='swipe'
						key={algorithm.name}
						preventSwipe={['up', 'down']}
						onSwipe={(direction) => swiped(direction, algorithm.name)}
						// style={styles1.card}
					>
						<Card>
							{imageRendered ? (
								<CardImage source={pictures[index].uri}></CardImage>
							) : (
								// <CardImage source={pictures[0].uri}></CardImage>
								<Text>{algorithm.name}</Text>
							)}
						</Card>
					</TinderCard>
				))}
			</CardContainer>

			{imageRendered ? (
				<>
					<CardText>You matched with {pictures[index].name}!</CardText>
					<Button title='Open chat' onPress={openChat}></Button>
				</>
			) : (
				<CardText>{lastSwipe} </CardText>
			)}
		</Container>
	);
}

Amplify.configure(config);

const authenticatorOptions = {
	signUpConfig: {
		hiddenDefaults: ['phone_number'],
	},
};

const Container = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

// const Header = styled.Text`
// 	color: #000;
// 	font-size: 30px;
// 	margin-bottom: 30px;
// `;

const CardContainer = styled.View`
	width: 90%;
	max-width: 260px;
	height: 300px;
	margin-top: 50%;
`;

const Card = styled.View`
	position: absolute;
	background-color: #fff;
	width: 100%;
	max-width: 260px;
	height: 400px;
	shadow-color: black;
	shadow-opacity: 0.2;
	shadow-radius: 2px;
	border-radius: 20px;
	resize-mode: cover;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CardImage = styled.ImageBackground`
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 20px;
`;

// const CardTitle = styled.Text`
// 	position: absolute;
// 	bottom: 0;
// 	margin: 10px;
// 	color: #fff;
// `;

const Buttons = styled.View`
	margin: 20px;
	z-index: -100;
`;

const InfoText = styled.Text`
	height: 28px;
	justify-content: center;
	display: flex;
	z-index: -100;
`;

const CardText = styled.Text`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 150px;
`;

export default withAuthenticator(App, authenticatorOptions);
