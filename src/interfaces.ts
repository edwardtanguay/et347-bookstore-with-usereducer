export interface IBook {
	id: number;
	idCode: string;
	title: string;
	description: string;
}

export interface ICart {
	items: IBook[]
}

export interface ICartGroupedItem {
	book: IBook,
	amount: number
}