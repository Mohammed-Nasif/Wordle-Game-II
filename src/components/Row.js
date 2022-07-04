import React from 'react';

export default function Row({ guess, currentGuess }) {
	// Make Square for each Letter in The Row
	// If The Guess Have Value
	if (guess) {
		return (
			<div className='row past'>
				{guess.map((element, i) => {
					return (
						<div key={i} className={element.color}>
							{element.key}
						</div>
					);
				})}
			</div>
		);
	}
	if (currentGuess) {
		let currentLetters = currentGuess.split('');
		return (
			<div className='row current'>
				{currentLetters.map((letter, i) => {
					return (
						<div key={i} className='filled'>
							{letter}
						</div>
					);
				})}
				{[...Array(5 - currentLetters.length)].map((_, i) => {
					return <div key={i}></div>;
				})}
			</div>
		);
	}
	// IF Guess Don't Have Value Render Empty Divs
	return (
		<div className='row'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
