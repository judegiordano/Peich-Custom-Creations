import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from "@material-ui/icons/Lock";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import InstagramIcon from "@material-ui/icons/Instagram";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";

import { colors, config } from "../../Config/Config";
import { Typography } from "@material-ui/core";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface INavBar {
	styleProp?: IStyles,
	cartCount: number
}

export const NavBar: React.FC<INavBar> = ({ styleProp, cartCount }: INavBar): JSX.Element => {

	const [open, setOpen] = useState(false);

	const toggleDrawer = (open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent,
	) => {
		if (
			event &&
			event.type === "keydown" &&
			((event as React.KeyboardEvent).key === "Tab" ||
				(event as React.KeyboardEvent).key === "Shift")
		) {
			return;
		}
		setOpen(open);
	};
	const route = (to: string) => {
		// might switch this back
		// to history.push() as it 
		// renders faster
		window.location.href = to;
		setOpen(false);
	};
	const getPathname = () => {
		const path = window.location.pathname;
		switch (true) {
		case /.*cart.*/.test(path):
			return "Cart";
		case /.*contact.*/.test(path):
			return "Contact";
		case /.*admin.*/.test(path):
			return "Admin";
		default:
			return "Home";
		}
	};

	return (
		<div style={{ ...styles.root, ...styleProp }}>
			<AppBar position="fixed" style={{backgroundColor: colors.gray}}>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						onClick={toggleDrawer(true)}
						style={{color: "black"}}
					>
						<MenuIcon />
					</IconButton>
					<Typography style={{flexGrow: 1, textAlign: "left"}}>
						{ getPathname() }
					</Typography>
					<IconButton onClick={() => route("/cart")} >
						<Badge badgeContent={cartCount} color="primary">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			<SwipeableDrawer
				anchor="left"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Divider />
				<List style={{width: 240}}>

					<ListItem button onClick={() => route("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="home" />
					</ListItem>
					<Divider />

					<ListItem button onClick={() => route("/cart")}>
						<ListItemIcon>
							<ShoppingCartIcon />
						</ListItemIcon>
						<ListItemText primary="cart" />
					</ListItem>
					<Divider />
					<a style={styles.link} href={config.peich_insta} target="_blank" rel="noreferrer">
						<ListItem button>
							<ListItemIcon>
								<InstagramIcon />
							</ListItemIcon>
							<ListItemText primary="instagram" />
						</ListItem>
					</a>
					<Divider />
					<ListItem button onClick={() => route("/contact")}>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="contact us" />
					</ListItem>
					<Divider />
					<ListItem button onClick={() => route("/admin/login")}>
						<ListItemIcon>
							<LockIcon />
						</ListItemIcon>
						<ListItemText primary="admin portal" />
					</ListItem>
				</List>
				<Divider />
			</SwipeableDrawer>
		</div>
	);
};

const styles = {
	root: {
		// margin: "auto",
		textAlign: "center"
	},
	link: {
	}
} as IStyles;