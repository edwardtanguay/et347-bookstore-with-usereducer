import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageWelcome = () => {
	const { state, dispatch, cart } = useContext(AppContext);

	return (
		<>
			<p className={`${state.userName ? "flex" : "hidden"}`}>
				Welcome, {state.userName}!
			</p>
			<div className="flex gap-3 items-center">
				<p className="text-2xl">Please tell us your name:</p>
				<input
					value={state.userName}
					onChange={(e) => dispatch({ type: 'setUserName', payload: e.target.value })}
					className="p-2 rounded mt-3"
					type="text"
				/>
			</div>
			<p>
				We have {state.books.length} books available, and {cart.items.length} are in your cart. 
			</p>
		</>
	);
};
