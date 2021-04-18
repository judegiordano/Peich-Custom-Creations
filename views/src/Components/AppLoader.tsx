import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAppLoader {
	styleProp?: IStyles
	size?: number,
	visible: boolean
}

export const AppLoader: React.FC<IAppLoader> = ({ styleProp, size, visible }: IAppLoader):JSX.Element | null => {
	if(!visible) return null;

	return (
		<div style={{...styles.root, ...styleProp}}>
			<CircularProgress color="primary" size={size || 100} />
		</div>
	);
};

const styles = {
	root: {
		paddingTop: "15px",
		paddingBottom: "15px",
		textAlign: "center"
	}
} as IStyles;