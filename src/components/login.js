import React, {Component} from "react";
import PhoneInput from "react-phone-number-input";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
        }
    }

    numberChange = (e) => {
        console.log(e)
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
                                    <input className="input-default" type="password" placeholder="Пароль"/>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <a className="button-text" target="_blank" href="https://t.me/andrey_shsh">Восстановить пароль</a>                                </div>
                                </div>
                            </div>
                            <div className="sing-wrapper">
                                <div className="button-sign blue unselectable">Войти</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Login;
