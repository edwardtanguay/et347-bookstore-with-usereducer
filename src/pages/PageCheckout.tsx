import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageCheckout = () => {
	const { state, cartGroupedItems } = useContext(AppContext);
	return (
		<>
			{state.userName && <p>{state.userName}, double check your order!</p>}
			<div className="mt-4">
				{cartGroupedItems.map(groupedItem => {
					return (
						<div key={groupedItem.book.idCode} className="flex gap-3 items-center mb-3">
							<img
								className="w-12 h-fit cursor-pointer"
								src={`https://edwardtanguay.vercel.app/share/images/techBooks/${groupedItem.book.idCode}.jpg`}
							/>
							<p className="text-3xl">{groupedItem.amount}x {groupedItem.book.title}</p>
						</div>
					)
				})}
			</div>
		</>
	)
};
