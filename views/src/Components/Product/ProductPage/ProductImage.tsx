import React from "react";
import { IProduct } from "../../../Types/Abstract";
import Carousel from "react-gallery-carousel";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IGallery {
	uid: string
}

interface IProductImage {
	product: IProduct,
	gallery: IGallery[]
}

export const ProductImage: React.FC<IProductImage> = ({ product, gallery }: IProductImage):JSX.Element => {
	return (
		<>
			{
				gallery.length <= 1 ? (
					<img
						draggable={false}
						style={styles.image}
						src={`/api/products/image/${product.id}`}
						alt={product.name}
						width={600}
						height={400}
					/>
				) : (
					<Carousel style={styles.image} images={gallery.map(img => ({
						src: `/api/gallery/${product.id}/${img.uid}`
					}))}/>
				)
			}
		</>
	);
};

const styles = {
	image: {
		width: "100%",
		maxWidth: "700px",
		maxHeight: "700px",
		height: "auto",
		margin: "auto"
	}
} as IStyles;