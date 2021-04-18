import * as types from "../ActionTypes/Counter";

export interface IAction {
	type: string,
	payload: {
		amount: number
	}
}

let count = parseInt(localStorage.getItem("count") as string) || 0;

export const CountReducer = (state = count, action: IAction): number => {
	if (action.type === types.ADD) {
		count += action.payload.amount;
		localStorage.setItem("count", count.toString());
		return count;
	}
	else if (action.type === types.SUBTRACT) {
		count -= action.payload.amount;
		localStorage.setItem("count", count.toString());
		return count;
	}
	else if (action.type === types.RESET) {
		count = 0;
		localStorage.removeItem("count");
		return count;
	}
	else {
		return state;
	}
};
