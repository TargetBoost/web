import React, {Component} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            valueNumber: ""
        }
    }

    numberChange = (e) => {
        // console.log(e)
    }

    registration = () => {
        let data = {
            phone: document.getElementById("phone"),
            login: document.getElementById("login"),
            password: document.getElementById("password")
        }

        if (document.getElementById("re_password") !== data.password) {
            console.log("error")
        }

        console.log(data)
    }

    render() {
        return (
            <>
                <div className="block-flex-center full-page">
                    <div className="wrapper-auth-pop-up-wr">
                        <div className="wrapper-auth-pop-up">
                            <div className="sign-in-place">
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
                                    <input className="input-default" id="login" placeholder="Логин"/>
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" id="password" type="password" placeholder="Пароль"/>
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" id="re_password" type="password" placeholder="Повторите пароль"/>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <input className="input-default-checkbox" type="checkbox"/>
                                    </div>
                                    <div className="wrapper-input-checkbox-wr-input-text">Я прочел <a className="button-text" target="_blank" href="">пользовательское соглашение</a> </div>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <input className="input-default-checkbox" type="checkbox"/>
                                    </div>
                                    <div className="wrapper-input-checkbox-wr-input-text">Я исполнитель</div>
                                </div>
                            </div>
                            <div className="sing-wrapper">
                                <div className="button-sign green unselectable" onClick={this.registration}>Перейти в личный кабинет</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Registration;
