import { useReducer } from "react";

interface IState {
	count: number;
	title: string;
	error: string;
}

const initialState: IState = {
	count: 0,
	title: "The useReducer/reducer Demo",
	error: "",
};

interface INumberAction {
	type: "increment" | "decrement";
	payload: number;
}

interface IStringAction {
	type: "setTitle";
	payload: string;
}

const reducer = (state: IState, action: INumberAction | IStringAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "increment":
			_state.count += action.payload;
			break;
		case "decrement":
			_state.count -= action.payload;
			break;
		case "setTitle":
			_state.title = action.payload;
			break;
		default:
			_state.error = "bad action type"; // TODO: figure out how to display action.type, it got a typescript error
	}
	return _state;
};

export const PageDemo = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<h2 className="text-2xl mb-3">{state.title}</h2>
			<div className="flex gap-3">
				<button
					onClick={() => dispatch({ type: "decrement", payload: 1 })}
				>
					-
				</button>
				<button
					onClick={() => dispatch({ type: "increment", payload: 1 })}
				>
					+
				</button>
				<p className="text-xl mt-1">count = {state.count}</p>
			</div>
			<div>
				Change title: <input className="w-80" value={state.title} onChange={(e) => dispatch({type: 'setTitle', payload: e.target.value})} type="text"/>
			</div>
		</>
	);
};
