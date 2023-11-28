import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageWelcome = () => {
	const { userName, setUserName, books, cart } = useContext(AppContext);

	return (
		<>
			<p className={`${userName ? "flex" : "hidden"}`}>
				Welcome, {userName}!
			</p>
			<div className="flex gap-3 items-center">
				<p className="text-2xl">Please tell us your name:</p>
				<input
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="p-2 rounded mt-3"
					type="text"
				/>
			</div>
			<p>
				We have {books.length} books available, and {cart.items.length} are in your cart. 
			</p>
		</>
	);
};
