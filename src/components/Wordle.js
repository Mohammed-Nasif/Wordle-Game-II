import React, { useEffect, useState } from 'react';
import useWordle from './../hooks/useWordle';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Result from './Result';

export default function Wordle({ solution }) {
	// Invoke the hadlekeyup there to check the key pressed
	const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
		useWordle(solution);

	const [showResult, setShowResult] = useState(false);

	useEffect(() => {
		// Fire The HandleKeyup every time user press a key
		window.addEventListener('keyup', handleKeyup);
		// Remove The current eventlistener before it used the event again
		return () => window.removeEventListener('keyup', handleKeyup);
	}, [handleKeyup]);

	useEffect(() => {
		if (isCorrect) {
			setTimeout(() => setShowResult(true), 2000);
			window.removeEventListener('keyup', handleKeyup);
		}
		if (turn === 6) {
			setTimeout(() => setShowResult(true), 2000);
			window.removeEventListener('keyup', handleKeyup);
		}
	}, [handleKeyup, turn, isCorrect]);

	return (
		<React.Fragment>
			{/* <div>Current Solutin : {solution}</div> */}
			{/* <div>Current Guess : {currentGuess}</div> */}
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
			<KeyPad usedKeys={usedKeys} />
			{showResult && (
				<Result isCorrect={isCorrect} turn={turn} solution={solution} />
			)}
		</React.Fragment>
	);
}
