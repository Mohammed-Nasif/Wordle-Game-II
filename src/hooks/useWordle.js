import { useState } from 'react';

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([...Array(6)]); // Each Guess in an array (Start It with array contains all turns user can do 6)
	const [history, setHistory] = useState([]); // Each Guess in a string
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({}); // {a: "green", b:"grey"}

	// Format the letters to object
	const formatGuess = () => {
		// console.log('We need To format this Guess: ' + currentGuess);
		// 1 - Turn the Solutin into Letters Array
		const solutionArr = [...solution];
		// console.log(solutionArr);
		// 2 - Turn the CurrentGuess into LetterObj Array
		let formattedGuess = [...currentGuess].map((eachL) => {
			return { key: eachL, color: 'grey' };
		});
		// Check if the letter in solution and in correct positon [Green]
		formattedGuess.forEach((letterObj, i) => {
			if (solutionArr[i] === letterObj.key) {
				letterObj.color = 'green';
				solutionArr[i] = '';
			}
		});
		// Check if the letter in solution and not in positon [yellow]
		formattedGuess.forEach((letterObj, i) => {
			if (
				solutionArr.includes(letterObj.key) &&
				solutionArr[i] !== letterObj.key
				// letterObj.color !== "green"
			) {
				letterObj.color = 'yellow';
				solutionArr[solutionArr.indexOf(letterObj.key)] = '';
			}
		});
		return formattedGuess;
	};

	// Add Guess to History Of Guesses
	const addNewGuess = (formattedGuess) => {
		// 1
		if (currentGuess === solution) {
			setIsCorrect(true);
			// console.log('You Won!');
		}
		// 2
		setGuesses((prevsGuesses) => {
			let newGuesses = [...prevsGuesses];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		});
		// 3
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		});
		//4
		setTurn((prevTurn) => prevTurn + 1);
		// Set The KeyPad Keys Colors
		setUsedKeys((prevUsed) => {
			let newKeys = { ...prevUsed };
			formattedGuess.forEach((e) => {
				const currentColor = newKeys[e.key];
				if (e.color === 'green') {
					newKeys[e.key] = 'green';
					return;
				}
				if (e.color === 'yellow' && currentColor !== 'green') {
					newKeys[e.key] = 'yellow';
					return;
				}
				if (
					e.color === 'grey' &&
					currentColor !== 'green' &&
					currentColor !== 'yellow'
				) {
					newKeys[e.key] = 'grey';
					return;
				}
			});
			// console.log(newKeys);
			return newKeys;
		});
		//5 Order Is Matter Here Cz if we reset The Guess 1st The Previous Steps Couldn't Done
		setCurrentGuess('');
	};

	// Handle keyup Event & Track Current Event
	// If user Press Enter
	const handleKeyup = (e) => {
		// 1-  Catch the key from event (e.key)
		// console.log(e.key);
		// 2 - Test The input key to be only letter[a-z] using regex
		if (/^[a-zA-Z]$/.test(e.key)) {
			// console.log(e.key);
			// 3 - Test That Guess length = 5
			if (currentGuess.length < 5) {
				// console.log(e.key);
				// 4 - Update Letter to current Guess
				setCurrentGuess((previousGuess) => {
					return previousGuess + e.key;
				});
			}
		}
		// 5 - Check if user Pressed (Delete) that delete the last letter from guess
		if (e.key === 'Backspace' || e.key === 'Delete') {
			setCurrentGuess((previousGuess) => {
				return previousGuess.substring(0, previousGuess.length - 1);
				// return previousGuess.slice(0, -1);
			});
			return;
		}
		// 6 - Check if the key = enter add this guess to guesses
		if (e.key === 'Enter') {
			// IF the turn > 5
			if (turn > 5) {
				// console.log('Gameover Number of Turns = 0');
				return;
			}
			// If Guess word is 5 letters
			if (currentGuess.length < 5) {
				// console.log('Word must be 5 Chars Long');
				return;
			}
			// IF the word wasn't guessed before [not duplicated]
			if (history.includes(currentGuess)) {
				// console.log('You already tried that word before');
				return;
			}
			// If Guess Passed All The Check then call the Format Guess Function
			// console.log(formatGuess());
			formatGuess();
			addNewGuess(formatGuess());
		}
	};

	return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
