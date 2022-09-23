const initState = {
    error: {
        showError: false,
        errorText: null
    },
    user: {
        load: true,
        id: 0,
        number: 0,
        login: null,
        auth: false,
        execute: true
    }
}

function reducer(state = initState, action) {
    switch(action.type) {
        case "update_token":
            window.localStorage.setItem("token", action.value)
            return state
        case "update_user":
            state.user = {
                load: action.value.load,
                id: action.value.id,
                number: action.value.number,
                login: action.value.login,
                auth: action.value.auth,
                execute: action.value.execute,
            }

            return state

        case "set_error":
            state.error = {
                showError: true,
                errorText: action.value
            }

            return state

        default: return state;
    }
}

export default reducer;
