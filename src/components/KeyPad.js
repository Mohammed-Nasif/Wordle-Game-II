import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function KeyPad({ usedKeys }) {
	const [letters, setLetters] = useState(null);

	useEffect(() => {
		try {
			// declare the data fetching function
			const getLetters = async () => {
				const { data } = await axios.get('http://localhost:3001/letters');
				// console.log(data);
				setLetters(data);
			};
			// call the function
			getLetters();
		} catch (error) {
			console.log('There is an error:' + error);
		}
	}, []);
	return (
		<div className='keypad'>
			{letters &&
				letters.map((l) => {
					let color = usedKeys[l.key];
					return (
						<div className={color} key={l.key}>
							{l.key}
						</div>
					);
				})}
		</div>
	);
}
