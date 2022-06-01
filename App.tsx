import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components';
import db from './utils/algos.json';
import logo from './assets/algomatch-logo.png';

function App() {
	const [lastSwipe, setLastSwipe] = useState('');
	// const onSwipe = (direction: any) => {
	// 	console.log(`You swiped ${direction}.`);
	// };

	const swiped = (direction: any, nameToDelete: string) => {
		setLastSwipe(`You swiped ${direction} on ${nameToDelete}.`);
	};

	const Container = styled.View`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	`;

	const Header = styled.Text`
		color: #000;
		font-size: 30px;
		margin-bottom: 30px;
	`;

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
		display: flex;
		justify-content: center;
		align-item: center;
	`;

	const CardTitle = styled.Text`
		position: absolute;
		bottom: 0;
		margin: 10px;
		color: #fff;
	`;

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

	return (
		<Container>
			<CardImage source={logo}></CardImage>
			<CardContainer>
				{db.algos.map((algorithm) => (
					<TinderCard
						className='swipe'
						key={algorithm.name}
						preventSwipe={['up', 'down']}
						onSwipe={(direction) => swiped(direction, algorithm.name)}
						// style={styles1.card}
					>
						<Card>
							<Text>{algorithm.name}</Text>
						</Card>
					</TinderCard>
				))}
			</CardContainer>
			<CardText>{lastSwipe}</CardText>
		</Container>
	);
}

Amplify.configure(config);

const options = {
	signUpConfig: {
		hiddenDefaults: ['phone_number'],
	},
};

export default withAuthenticator(App, options);
