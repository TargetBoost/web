function reducer(state, action) {
    switch(action.type) {
        case "update_token":
            window.localStorage.setItem("token", `Bareer ${action.value}`)
            return { status: true};
        case "asdsd": return { value: action.value };

        default: return state;
    }
}

export default reducer;
