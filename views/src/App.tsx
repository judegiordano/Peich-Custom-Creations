import React from "react";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";

import { Routes } from "./Routes";
import { CartCountSelector } from "./Store/Dispatchers/CartDispatchers";

const App : React.FC = (): JSX.Element => {
	const cartCount = useSelector(CartCountSelector);
	
	return (
		<SnackbarProvider maxSnack={2}>
			<div className="App" style={{
				paddingTop: "60px"
			}}>
				<Routes cartCount={cartCount} />
			</div>
		</SnackbarProvider>
	);
};

export default App;