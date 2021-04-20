import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { NotFound } from "./Pages/NotFound";
import { AllProductsPage } from "./Pages/AllProductsPage";
import { Error } from "./Pages/Error";
import { ProductPage } from "./Pages/ProductPage";
import { CartPage } from "./Pages/CartPage";
import { NavBar } from "./Components/Navigation/NavBar";
import { ContactPage } from "./Pages/ContactPage";
import { ContactSuccesPage } from "./Pages/ContactSuccesPage";

export const Routes: React.FC = (): JSX.Element => {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route path="/" exact component={AllProductsPage} />
					<Route path="/item/:id" exact component={ProductPage} />
					<Route path="/cart" exact component={CartPage} />
					<Route path="/contact" exact component={ContactPage} />
					<Route path="/emailsuccess" exact component={ContactSuccesPage} />
					<Route path="/error"  component={Error} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</>
	);
};