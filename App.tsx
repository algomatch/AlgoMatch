import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import TinderCard from 'react-tinder-card';

function App() {
	const onSwipe = (direction: any) => {
		console.log(`You swiped ${direction}.`);
	};

	const db = [
		{
			name: 'Richard Hendricks',
		},
		{
			name: 'Erlich Bachman',
		},
		{
			name: 'Monica Hall',
		},
		{
			name: 'Jared Dunn',
		},
		{
			name: 'Dinesh Chugtai',
		},
	];

	return (
		// <View style={styles.container}>
		<div>
			<Text>HELLO THIS IS WORKING!</Text>
		</div>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

Amplify.configure(config);

const options = {
	signUpConfig: {
		hiddenDefaults: ['phone_number'],
	},
};

export default withAuthenticator(App, options);
