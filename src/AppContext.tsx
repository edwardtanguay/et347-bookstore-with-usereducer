/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, useReducer } from "react";
import { IBook, ICart, ICartGroupedItem } from "./interfaces";
import axios from "axios";

interface IState {
	userName: string;
}

interface IStringAction {
	type: 'setUserName';
	payload: string;
}

const initialState = {
	userName: ''
}

const reducer = (state: IState, action: IStringAction) => {
	const _state = structuredClone(state);

	switch (action.type) {
		case 'setUserName':
			_state.userName = action.payload;
			break;
	}

	return _state;
} 

interface IAppContext {
	books: IBook[];
	setBooks: (books: IBook[]) => void;
	cart: ICart;
	handleAddBookToCart: (book: IBook) => void;
	cartGroupedItems: ICartGroupedItem[];
	state: IState;
	dispatch: React.Dispatch<IStringAction>
}

interface IAppProvider {
	children: React.ReactNode;
}

const booksUrl = "https://edwardtanguay.vercel.app/share/techBooks.json";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [books, setBooks] = useState<IBook[]>([]);
	const [cart, setCart] = useState<ICart>({ items: [] } as ICart);
	const [cartGroupedItems, setCartGroupedItems] = useState<
		ICartGroupedItem[]
	>([]);

	useEffect(() => {
		setTimeout(async () => {
			const response = await axios.get(booksUrl);
			const _books = response.data;
			setBooks(_books);
		}, 0);
	}, []);

	useEffect(() => {
		const _cartGroupedItems: ICartGroupedItem[] = [];
		const countObj: any = {};
		for (const book of cart.items) {
			if (countObj[book.idCode]) {
				countObj[book.idCode]++;
			} else {
				countObj[book.idCode] = 1;
			}
		}
		const properties = Object.entries(countObj);
		for (const [idCode, _amount] of properties) {
			const book = books.find((m: IBook) => m.idCode === idCode);
			const amount = _amount as number;
			if (book) {
				_cartGroupedItems.push({
					book,
					amount,
				});
			}
		}
		setCartGroupedItems(_cartGroupedItems);
	}, [cart]);

	const handleAddBookToCart = (book: IBook) => {
		const _cart = structuredClone(cart);
		_cart.items.push(book);
		setCart(_cart);
	};

	return (
		<AppContext.Provider
			value={{
				books,
				setBooks,
				cart,
				handleAddBookToCart,
				cartGroupedItems,
				state, 
				dispatch
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
