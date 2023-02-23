import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { APIL_API_KEY } from '@env';

export default function App() {
	const [rates, setRates] = useState({});
	const [currency, setCurrency] = useState('');
	const [value, setValue] = useState();
	const [convertedEur, setConvertedEur] = useState('');

	const currencyList = Object.keys(rates);

	useEffect(() => {
		getRates();
	}, []);

	const getRates = async () => {
		const url = 'https://api.apilayer.com/exchangerates_data/latest';
		const options = {
			headers: {
				apikey: APIL_API_KEY
			}
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			setRates(data.rates);
		} catch (e) {
			Alert.alert("Error ", error);
		}
	};

	const getConversion = () => {
		const amountEur = Number(value) / rates[currency];
		setConvertedEur(amountEur.toFixed(2));
	};

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: "data:image/jpeg;base64,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" }}
				style={styles.image}
			/>
			<Text style={{ fontSize: 20 }}>{convertedEur} €</Text>
			<View style={styles.interaction}>
				<TextInput
					keyboardType="numeric"
					returnKeyType={"done"}
					style={styles.input}
					onChangeText={(value) => setValue(value)}
				/>
				<Picker
					style={styles.picker}
					selectedValue={currency}
					onValueChange={(itemValue, itemIndex) =>
						setCurrency(itemValue)
					}
				>
					{currencyList.map((key) => {
						return <Picker.Item key={key} label={key} value={key} />;
					})}
				</Picker>
			</View>
			<Button title="Convert" onPress={getConversion} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 250,
		height: 150,
		borderRadius: 10,
		marginBottom: 20,
	},
	interaction: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		margin: 10,
		width: "80%",
	},
	input: {
		height: 50,
		width: "50%",
		borderWidth: 1,
		borderRadius: 50,
		borderColor: "gray",
		padding: 5,
		backgroundColor: "#fff",
	},
	picker: {
		width: "50%",
		marginTop: -82,
	},
});