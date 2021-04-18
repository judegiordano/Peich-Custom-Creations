import React, { useState } from "react";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICounter {
	styleProp?: IStyles
}

import { add, subtract, reset, getCount } from "../Store/Dispatchers/CountDispatchers";
import { AppButton } from "../Components/AppButton";

export const Counter: React.FC<ICounter> = ({ styleProp }: ICounter): JSX.Element => {
	const { count } = getCount();
	const [counter, setCounter] = useState(count);
	
	return (
		<div style={{...styles.root, ...styleProp}}>
			<AppButton text="add" onClick={() => {
				add(1);
				setCounter(counter + 1);
			}
			} />
			<AppButton text="subtract" onClick={() => {
				subtract(1);
				setCounter(counter - 1);
			}} />
			<AppButton text="reset" onClick={() => {
				reset();
				setCounter(0);
			}} />
			{ counter }
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center"
	}
} as IStyles;