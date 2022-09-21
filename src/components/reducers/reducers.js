const initState = {
    error: {
        showError: false,
        errorText: null
    },
    user: {
        id: 0,
        number: 0,
        login: null,
        auth: false
    }
}

function reducer(state = initState, action) {
    switch(action.type) {
        case "update_token":
            window.localStorage.setItem("token", `Bearer ${action.value}`)
            return state
        case "update_user":
            state.user = {
                id: action.value.id,
                number: action.value.number,
                login: action.value.login,
                auth: action.value.auth,
            }

            return state

        default: return state;
    }
}

export default reducer;
