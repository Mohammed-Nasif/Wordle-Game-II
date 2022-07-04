import React from 'react';

export default function Result({ isCorrect, turn, solution }) {
	return (
		<div className='result'>
			{isCorrect && (
				<div>
					<h1>You Win! 🥳</h1>
					<p className='solution'> {solution}</p>
					<p>Great You Found The Solution After {turn} Guesses 😊</p>
				</div>
			)}
			{!isCorrect && (
				<div>
					<h1>Sadly You Lose This Time 😕</h1>
					<p className='solution'> {solution}</p>
					<p>Better Luck Next Time 😊</p>
				</div>
			)}
		</div>
	);
}
