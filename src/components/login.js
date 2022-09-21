import React, {Component} from "react";
import PhoneInput from "react-phone-number-input";

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
        let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')


        let data = {
            number_phone: Number(phone),
            password: document.getElementById("password").value
        }

        fetch("/core/v1/system/auth", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)

                if (res.status.message == null) {
                    this.state.store.dispatch({
                        type: "update_token", value: res.data.token,
                    })

                    window.location.href = `/user`
                }else{
                    this.state.store.dispatch({
                        type: "set_error", value: "Не правельный номер телефона или пароль",
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
                                <div className="wrapper-input">
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="RU"
                                        className="input-default-number input-default-number-country"
                                        id="phone"
                                        onChange={this.numberChange}
                                    />
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" type="password" id="password" placeholder="Пароль"/>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <a className="button-text" target="_blank" href="">Восстановить пароль</a>                                </div>
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
