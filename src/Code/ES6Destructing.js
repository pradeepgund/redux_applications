import { createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy =
        typeof action.incrementBy === "number" ? action.incrementBy : 0;
      return { count: state.count + incrementBy };
    case "DECREMENT":
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 0;
      return { count: state.count - decrementBy };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
});
console.log(store.getState());

store.dispatch({
  type: "INCREMENT",
  incrementBy: 10
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "INCREMENT",
  decrementBy: 10
});

store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
});
console.log(store.getState());
