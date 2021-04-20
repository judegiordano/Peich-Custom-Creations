import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
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

import { colors, config } from "../../Config/Config";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface INavBar {
	styleProp?: IStyles
}

export const NavBar: React.FC<INavBar> = ({ styleProp }: INavBar): JSX.Element => {

	const history = useHistory();

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

	return (
		<div style={{ ...styles.root, ...styleProp }}>
			<AppBar position="fixed" style={{backgroundColor: colors.gray}}>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						onClick={toggleDrawer(true)}
						edge="start"
						style={{color: "black"}}
					>
						<MenuIcon />
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
					<ListItem button onClick={() => history.push("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="home" />
					</ListItem>
					<Divider />
					<ListItem button onClick={() => history.push("/cart")}>
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
					<ListItem button onClick={() => history.push("/contact")}>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="contact us" />
					</ListItem>
				</List>
				<Divider />
			</SwipeableDrawer>
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		textAlign: "center"
	},
	link: {
	}
} as IStyles;