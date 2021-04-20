export interface IStyles {
	[key: string]: React.CSSProperties
}

export interface IGallery {
	uid: string,
	photo: string
}

export interface IProduct {
	id: number,
	name: string,
	description: string
	photo: string,
	price: number
	gallery: IGallery[]
	tags: string[]
	added: Date
}

export interface ICartProduct {
	id: number,
	name: string,
	price: number,
	quantity: number
}