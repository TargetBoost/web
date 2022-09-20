const initState = {
    error: {
        showError: false,
        errorText: null
    }
}

function reducer(state = initState, action) {
    switch(action.type) {
        case "update_token":
        window.localStorage.setItem("token", `Bearer ${action.value}`)

        return { status: true};
        case "set_error": return { value: action.value };
        state.error =  {
            showError: true,
            errorText: action.value
        }
        return state

        default: return state;
    }
}

export default reducer;
