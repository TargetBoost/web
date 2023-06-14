const initState = {
    error: {
        showInfo: false,
        showError: false,
        errorText: null,
        infoText: null,
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
        cause: "",
        tg: "",
        vkToken: "",
        vkUserFirstName: "",
        vkUserLastName: "",
        mainPhoto: "",
    },
    settings: {
        snow: false,
        rain: false,
    },
    showPopUp: false,
    page: "",
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
                number_phone: action.value.number_phone,
                block: action.value.block,
                cause: action.value.cause,
                tg: action.value.tg,
                vkToken: action.value.vkToken,
                vkUserFirstName: action.value.vkUserFirstName,
                vkUserLastName: action.value.vkUserLastName,
                mainPhoto: action.value.mainPhoto,
            }

            return state

        case "set_error":
            state.error = {
                showError: true,
                errorText: action.value
            }

            return state

        case "set_pop_up":
            state.showPopUp = action.value
            return state

        case "set_info":
            state.error = {
                showInfo: true,
                infoText: action.value
            }

            return state

        case "set_page":
            state.error = action.value
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
