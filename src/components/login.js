import React, {Component} from "react";
import InputMask from "react-input-mask";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            country: "",
            store: this.props.store
        }
    }

    auth = () => {
        // let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')


        let data = {
            tg: document.getElementById("tg").value,
            password: document.getElementById("password").value
        }

        fetch("/core/v1/system/auth", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message == null) {
                    this.state.store.dispatch({
                        type: "update_token", value: res.data.token,
                    })
                    console.log(res.data)

                    if (res.data.execute === true) {
                        window.location.href = "/tasks"
                    }else{
                        window.location.href = "/targets"
                    }
                }else{
                    this.state.store.dispatch({
                        type: "set_error", value: "Не правельный логин или пароль",
                    })

                    document.getElementById("password").value = ""
                }
            })
            .catch(error => {
                console.log(error)
            });
    }


    numberChange = (e) => {
        // console.log(e)
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.auth()
        }
    }

    render() {
        return (
            <>
                <div className="block-flex-center full-page">
                    <div className="wrapper-auth-pop-up-wr">
                        <div className="wrapper-auth-pop-up">
                            <div className="sign-in-place">
                                <div className="wrapper-input">
                                    <div className="title-pop-up">Войти</div>
                                </div>
                                {/*<div className="wrapper-input">*/}
                                {/*    <PhoneInput*/}
                                {/*        international*/}
                                {/*        countryCallingCodeEditable={false}*/}
                                {/*        defaultCountry="RU"*/}
                                {/*        className="input-default-number input-default-number-country"*/}
                                {/*        id="phone"*/}
                                {/*        onChange={this.numberChange}*/}
                                {/*        onKeyDown={this.handleKeyDown}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="wrapper-input">
                                    <InputMask className="input-default" formatChars={{
                                        '9': '[0-9]',
                                        'a': '[A-Za-z]',
                                        '*': '.*'
                                    }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин телеграмм без @" />
                                    {/*<input className="input-default" id="tg" placeholder="Сcылка на Ваш телеграм https://..."/>*/}
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" onKeyDown={this.handleKeyDown} type="password" id="password" placeholder="Пароль" />
                                </div>
                                <div className="wrapper-input-checkbox">
                                    {/*<div className="wrapper-input-checkbox-wr-input">*/}
                                    {/*    <a className="button-text" target="_blank" href="">Восстановить пароль</a>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="sing-wrapper">
                                <div className="button-sign blue unselectable" onClick={this.auth}>Поехали! 🚀</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Login;
