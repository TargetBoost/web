function reducer(state, action) {
    switch(action.type) {
        case "asd": return { value: action.value_1 };
        case "asdsd": return { value: action.value_2 };

        default: return state;
    }
}

export default reducer;
