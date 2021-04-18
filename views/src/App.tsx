import React from "react";
import { SnackbarProvider } from "notistack";

import { Routes } from "./Routes";

const App : React.FC = (): JSX.Element => {
	return (
		<SnackbarProvider maxSnack={4}>
			<div className="App" style={{
				paddingTop: "60px"
			}}>
				<Routes />
			</div>
		</SnackbarProvider>
	);
};

export default App;