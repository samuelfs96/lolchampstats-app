export const InitialState = {
    text: "",
    filterValue: "All champions",
};

export function searchChampion(state, action) {
    switch (action.type) {
      case "search":
        return { ...state, text: action.text };
      case "filter":
        return { ...state, filterValue: action.filterValue };
      case "multiple":
        return { ...state, ...action };
      default:
        return state;
    }
  }