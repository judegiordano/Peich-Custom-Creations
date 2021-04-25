import React from "react";
import Pagination from "@material-ui/lab/Pagination";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IPaginationBar {
	count: number,
	pageLimit: number,
	pageNum: number,
	onChange: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined
}

export const PaginationBar: React.FC<IPaginationBar> = ({ count, pageLimit, pageNum, onChange }: IPaginationBar): JSX.Element => {
	return (
		<div style={styles.root}>
			<Pagination
				count={Math.ceil(count / pageLimit)}
				defaultPage={pageNum}
				showFirstButton
				showLastButton
				onChange={onChange} />
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		display: "flex",
		justifyContent: "center",
		padding: "10px",
		paddingTop: "20px",
		paddingBottom: " 20px"
	}
} as IStyles;