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
        execute: false,
        admin: false,
        balance: 0,
        number_phone: "",
        block: false,
    },
    settings: {
        snow: false,
        rain: false,
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
                admin: action.value.admin,
                balance: action.value.balance,
                number_phone: action.number_phone,
                block: action.block,
            }

            return state

        case "set_error":
            state.error = {
                showError: true,
                errorText: action.value
            }

            return state

        case "set_settings":
            state.settings = {
                snow: action.value.snow,
                rain: action.value.rain,
            }

            return state

        default: return state;
    }
}

export default reducer;
