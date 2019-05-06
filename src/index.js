import { createStore, combineReducers } from "redux";
import uuid from "uuid";

const setStartDate = (startDate = undefined) => ({
  type: "SET_START_DATE",
  startDate
});

const setEndDate = (endDate = undefined) => ({
  type: "SET_END_DATE",
  endDate
});

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id
});
const expensesDefaultState = [];
const expenseReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(expense => expense.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filterDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state = filterDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };

    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);
console.log("Application started");

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;

      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt > b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount > b.amount ? 1 : -1;
      }
    });
};

store.subscribe(() => {
  //console.log(store.getState());
  const state = store.getState();
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(expenses);
});

const ExpenseOne = store.dispatch(
  addExpense({
    description: "Rent",
    amount: 10000000,
    createdAt: 125
  })
);
const ExpenseTwo = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 1000,
    createdAt: -20
  })
);
/*
store.dispatch(removeExpense({ id: ExpenseOne.expense.id }));

store.dispatch(editExpense(ExpenseTwo.expense.id, { amount: 5000 }));

store.dispatch(setTextFilter("Rent"));
store.dispatch(setTextFilter());
store.dispatch(sortByDate());
store.dispatch(sortByAmount()); */

store.dispatch(setStartDate(-1000));
store.dispatch(setEndDate(1000));
store.dispatch(sortByDate());
console.log(store.getState());

//store.dispatch(setTextFilter("Rent"));
/* const demoState = {
  expenses: [
    {
      id: "one",
      description: "Rent",
      note: "Amount for rent",
      amount: 500,
      createdAt: 34304943094039403
    }
  ],
  filters: [
    {
      rent: "rent",
      sortBy: "amount",
      startDate: undefined,
      endDate: undefined
    }
  ]
};
 */
