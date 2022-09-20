import React, {Component} from "react";
import PhoneInput from "react-phone-number-input";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            country: '', region: '',
        }
    }

    selectCountry (val) {
        this.setState({ country: val });
    }

    selectRegion (val) {
        this.setState({ region: val });
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
                                    <div className="title-pop-up">Войти</div>
                                </div>
                                <div className="wrapper-input">
                                <CountryDropdown
                                    defaultOptionLabel="Страна"

                                    className="input-default"
                                    value={this.state.country}
                                    onChange={(val) => this.selectCountry(val)} />
                                </div>
                                <div className="wrapper-input">
                                <RegionDropdown
                                    defaultOptionLabel="Город"
                                    className="input-default"

                                    country={this.state.country}
                                    value={this.state.region}
                                    onChange={(val) => this.selectRegion(val)} />
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
                                    <input className="input-default" type="password" placeholder="Пароль"/>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <a className="button-text" target="_blank" href="https://t.me/andrey_shsh">Восстановить пароль</a>                                </div>
                                </div>
                            </div>
                            <div className="sing-wrapper">
                                <div className="button-sign blue unselectable">Поехали! 🚀</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Login;
