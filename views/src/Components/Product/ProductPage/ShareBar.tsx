import React from "react";
import Typography from "@material-ui/core/Typography";
import { TwitterShareButton, PinterestShareButton, EmailShareButton } from "react-share";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import EmailIcon from "@material-ui/icons/Email";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { IProduct } from "../../../Types/Abstract";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IShareBar {
	product: IProduct
}

export const ShareBar: React.FC<IShareBar> = ({ product }: IShareBar): JSX.Element => {
	return (
		<Typography style={styles.share} variant="body1" gutterBottom>
			<Tooltip TransitionComponent={Zoom} title="share to twiitter">
				<TwitterShareButton
					style={styles.shareButton}
					url={window.location.href}
					title={"check out this awesome handmade piece by peichcustomcreations!"}
				>
					<TwitterIcon />
				</TwitterShareButton>
			</Tooltip>
			<Tooltip TransitionComponent={Zoom} title="share to pinterest">
				<PinterestShareButton
					style={styles.shareButton}
					url={window.location.href}
					media={`${window.location.origin}/api/products/image/${product.id}`}
					description={"check out this awesome handmade piece by peichcustomcreations!"}
				>
					<PinterestIcon />
				</PinterestShareButton>
			</Tooltip>
			<Tooltip TransitionComponent={Zoom} title="share to email">
				<EmailShareButton
					style={styles.shareButton}
					url={window.location.href}
					subject={"Cool Work By PeichCustomCreations"}
					body={"check out this awesome handmade piece by peichcustomcreations!"}
				>
					<EmailIcon />
				</EmailShareButton>
			</Tooltip>
		</Typography>
	);
};

const styles = {
	share: {
		textAlign: "right",
		maxWidth: "700px",
		margin: "auto",
		paddingTop: "20px",
		paddingBottom: "10px",
		fontSize: "x-large"
	},
	shareButton: {
		paddingLeft: "5px",
		paddingRight: "5px"
	}
} as IStyles;