/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer } from "react";
import { IBook, ICart, ICartGroupedItem } from "./interfaces";
import axios from "axios";

interface IState {
	userName: string;
	books: IBook[];
	cart: ICart;
	cartGroupedItems: ICartGroupedItem[];
}

const initialState = {
	userName: "",
	books: [],
	cart: { items: [] },
	cartGroupedItems: []
};

interface IStringAction {
	type: "setUserName";
	payload: string;
}

interface IBooksAction {
	type: "setBooks";
	payload: IBook[];
}

interface IBookAction {
	type: "addBookToCart";
	payload: IBook;
}

interface ICartGroupedItemsAction {
	type: "setCartGroupedItems";
	payload: ICartGroupedItem[];
}

const reducer = (
	state: IState,
	action: IStringAction | IBooksAction | IBookAction | ICartGroupedItemsAction
) => {
	const _state = structuredClone(state);

	switch (action.type) {
		case "setUserName":
			_state.userName = action.payload;
			break;
		case "setBooks":
			_state.books = action.payload;
			break;
		case "addBookToCart":
			_state.cart.items.push(action.payload);
			break;
		case "setCartGroupedItems":
			_state.cartGroupedItems = action.payload;
			break;
	}

	return _state;
};

interface IAppContext {
	state: IState;
	dispatch: React.Dispatch<IStringAction | IBookAction | ICartGroupedItemsAction>;
}

interface IAppProvider {
	children: React.ReactNode;
}

const booksUrl = "https://edwardtanguay.vercel.app/share/techBooks.json";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		setTimeout(async () => {
			const response = await axios.get(booksUrl);
			const _books = response.data;
			dispatch({ type: "setBooks", payload: _books });
		}, 0);
	}, []);

	useEffect(() => {
		const _cartGroupedItems: ICartGroupedItem[] = [];
		const countObj: any = {};
		for (const book of state.cart.items) {
			if (countObj[book.idCode]) {
				countObj[book.idCode]++;
			} else {
				countObj[book.idCode] = 1;
			}
		}
		const properties = Object.entries(countObj);
		for (const [idCode, _amount] of properties) {
			const book = state.books.find((m: IBook) => m.idCode === idCode);
			const amount = _amount as number;
			if (book) {
				_cartGroupedItems.push({
					book,
					amount,
				});
			}
		}
		dispatch({ type: "setCartGroupedItems", payload: _cartGroupedItems });
	}, [state.cart]);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
