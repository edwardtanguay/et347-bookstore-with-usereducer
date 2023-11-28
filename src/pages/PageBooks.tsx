import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageBooks = () => {
	const { userName, books, handleAddBookToCart, cart } = useContext(AppContext);
	return (
		<>
			{userName && <p>Hallo, {userName}, please select your books!</p>}

			<p className="mb-4">There are {books.length} books.</p>

			<div className="flex gap-3 flex-wrap">
				{books.map((book) => {
					return (
						<div className="flex flex-col" key={book.id}>
							<img
								className="w-40 h-fit cursor-pointer"
								onClick={() => handleAddBookToCart(book)}
								src={`https://edwardtanguay.vercel.app/share/images/techBooks/${book.idCode}.jpg`}
							/>
							<p className="text-center bg-slate-800 text-yellow-300 pb-1">Ordered: {cart.items.filter(m => m.idCode === book.idCode).length}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};
