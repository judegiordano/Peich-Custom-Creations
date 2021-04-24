import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { NotFound } from "./Pages/NotFound";
import { AllProductsPage } from "./Pages/AllProductsPage";
import { Error } from "./Pages/Error";
import { ProductPage } from "./Pages/ProductPage";
import { CartPage } from "./Pages/CartPage";
import { NavBar } from "./Components/Navigation/NavBar";
import { ContactPage } from "./Pages/ContactPage";
import { ContactSuccesPage } from "./Pages/ContactSuccesPage";
import { PaymentSuccessPage } from "./Pages/PaymentSuccessPage";
import { AdminLoginPage } from "./Pages/AdminLoginPage";
import { AdminPage } from "./Pages/AdminPage";
import { useRefresh } from "./Hooks/useRefresh";
import { AppLoader } from "./Components/AppLoader";
import { Redirect } from "react-router";

export const Routes: React.FC = (): JSX.Element => {

	const { refresh, isValid, loading } = useRefresh();
	const [isAuth, setIsAuth] = useState(true);

	useEffect(() => {
		refresh();
		setIsAuth(isValid);
	}, [isValid]);

	return (
		loading ? (
			<AppLoader visible={true} />
		) : (
			<BrowserRouter>
				<NavBar isAuth={isAuth} />
				<Switch>
					<Route path="/" exact component={AllProductsPage} />
					<Route path="/item/:id" component={ProductPage} />
					<Route path="/cart" component={CartPage} />
					<Route path="/contact" component={ContactPage} />
					<Route path="/emailsuccess" component={ContactSuccesPage} />
					<Route path="/paymentsuccess/:token" component={PaymentSuccessPage} />
					<Route path="/admin/login" component={AdminLoginPage} />
					{
						isAuth ? (
							<Route path="/admin" component={AdminPage} />
						) : <Redirect to="/admin/login" />
					}
					<Route path="/error"  component={Error} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	);
};