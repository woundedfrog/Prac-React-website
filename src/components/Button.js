import React from 'react-dom'
import '.Button.css';
import { LINK } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium' 'btn--large']


export const Button = ({
	children, 
	type, 
	onClick, 
	buttonStyle, 
	buttonSize
}) => {
	const checkButtonStyle = STYLES.includes(buttonStyles) 
	? buttonsStyle 
	: STYLES[0];

	const checkButtonSize = SIZE.includes(buttonSize) ? buttonSize : SIZES[0]

	return (
		<Link to='/sign-up' className'btn-mobile'>
			<button
			className={'btn ${checkButtonStyle} ${checkButtonSize}'} 
			onClick={onClick}
			type={type}
			>
				{children}
			}
			}
			</button>
			</Link>
		)
};