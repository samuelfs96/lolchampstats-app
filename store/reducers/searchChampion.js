export const InitialState = {
    text: "",
};

export function searchChampion(state, action) {
    switch (action.type) {
      case "search":
        return { ...state, text: action.text };
      default:
        return state;
    }
  }