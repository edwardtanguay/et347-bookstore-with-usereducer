import { useReducer } from "react";

interface IState {
	count: number;
	error: string;
}

const initialState: IState = {
	count: 999,
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

	return <p>this is the demo page, count = {state.count}</p>;
};
