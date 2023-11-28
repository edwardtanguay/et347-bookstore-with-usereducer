import { useReducer } from "react";

interface IState {
	count: number;
	error: string;
}

const initialState: IState = {
	count: 0,
	error: "",
};

interface IAction {
	type: "increment" | "decrement";
	payload: number;
}

const reducer = (state: IState, action: IAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "increment":
			_state.count += action.payload;
			break;
		case "decrement":
			_state.count -= action.payload;
			break;
		default:
			_state.error = "bad action type: " + action.type;
	}
	return _state;
};

export const PageDemo = () => {
	const [state] = useReducer(reducer, initialState);

	return (
		<>
		<h2 className="text-2xl mb-3">Demo of useReducer</h2>
			<div className="flex gap-3">
				<button>-</button>
				<button>+</button>
				<p className="text-xl mt-1">count = {state.count}</p>
		</div>
		</>
	)
};
