import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { NotFound } from "./Pages/NotFound";
import { AllProductsPage } from "./Pages/AllProductsPage";
import { Error } from "./Pages/Error";
import { CartPage } from "./Pages/CartPage";
import { NavBar } from "./Components/Navigation/NavBar";
import { ContactPage } from "./Pages/ContactPage";
import { ContactSuccesPage } from "./Pages/ContactSuccesPage";
import { PaymentSuccessPage } from "./Pages/PaymentSuccessPage";
import { AdminLoginPage } from "./Pages/AdminLoginPage";
import { AdminPage } from "./Pages/AdminPage";
import { useRefresh } from "./Hooks/useRefresh";
import { AppLoader } from "./Components/AppLoader";

interface IRoutes {
	cartCount: number
}

export const Routes: React.FC<IRoutes> = ({cartCount}: IRoutes): JSX.Element => {

	const { refresh, isValid, loading } = useRefresh();

	useEffect(() => {
		refresh();
	}, [isValid]);

	return (
		loading ? (
			<AppLoader visible={true} />
		) : (
			<BrowserRouter>
				<NavBar cartCount={cartCount} />
				<Switch>
					<Route path="/" exact component={AllProductsPage} />
					<Route path="/cart" component={CartPage} />
					<Route path="/contact" component={ContactPage} />
					<Route path="/emailsuccess" component={ContactSuccesPage} />
					<Route path="/paymentsuccess/:token" component={PaymentSuccessPage} />
					{/* admin routes */}
					<Route path="/admin/login" render={() => <AdminLoginPage auth={isValid} />} />
					<Route path="/admin" render={() => <AdminPage auth={isValid} />} />
					{/* generic */}
					<Route path="/error"  component={Error} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	);
};