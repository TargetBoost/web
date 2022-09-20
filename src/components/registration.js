import React, {Component} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            nextStep: "reg",
            store: this.props.store,
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
        // console.log(e)
    }

    registration = () => {
        this.setState({nextStep: "load"})
        let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')

        let data = {
            number_phone: Number(phone),
            login: document.getElementById("login").value,
            password: document.getElementById("password").value,
            execute: document.getElementById("im_read").value !== 'on'
        }

        if (document.getElementById("re_password").value === data.password) {
            fetch("/core/v1/system/registration", {
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res)

                    if (res.status.message === null) {
                        this.setState({nextStep: "profile"})


                        this.state.store.dispatch({
                            type: "update_token", value: res.data.token,
                        })

                    }else{

                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({nextStep: "reg"})
                });
        }

        console.log(data)
    }

    render() {
        return (
            <>
                <div className="block-flex-center full-page">
                    <div className="wrapper-auth-pop-up-wr">
                        <div className="wrapper-auth-pop-up">
                            {
                                this.state.nextStep === "reg" ?
                                    <>
                                        <div className="sign-in-place">
                                            <div className="wrapper-input">
                                                <div className="title-pop-up">Регистрация</div>
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
                                                <input className="input-default" id="login" placeholder="Логин"/>
                                            </div>
                                            <div className="wrapper-input">
                                                <input className="input-default" id="password" type="password"
                                                       placeholder="Пароль"/>
                                            </div>
                                            <div className="wrapper-input">
                                                <input className="input-default" id="re_password" type="password"
                                                       placeholder="Повторите пароль"/>
                                            </div>
                                            <div className="wrapper-input-checkbox">
                                                <div className="wrapper-input-checkbox-wr-input">
                                                    <input className="input-default-checkbox" type="checkbox"/>
                                                </div>
                                                <div className="wrapper-input-checkbox-wr-input-text">Я прочел <a
                                                    className="button-text" target="_blank" href="">пользовательское
                                                    соглашение</a></div>
                                            </div>
                                            <div className="wrapper-input-checkbox">
                                                <div className="wrapper-input-checkbox-wr-input">
                                                    <input className="input-default-checkbox" type="checkbox"
                                                           id="im_read"/>
                                                </div>
                                                <div className="wrapper-input-checkbox-wr-input-text">Я исполнитель
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sing-wrapper">
                                            <div className="button-sign green unselectable"
                                                 onClick={this.registration}>Перейти в личный кабинет
                                            </div>
                                        </div>
                                    </>
                                    :
                                    this.state.nextStep === "profile" ?
                                        <>
                                            <div className="sign-in-place">
                                                <div className="wrapper-input">
                                                    <div className="title-pop-up">Заполните профиль</div>
                                                </div>
                                                <div className="wrapper-input">
                                                    <input className="input-default" id="first_name" placeholder="Имя"/>
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
                                                    <input className="input-default" id="old" placeholder="Возраст"/>
                                                </div>
                                            </div>
                                            <div className="sing-wrapper">
                                                <div className="button-sign blue unselectable"
                                                     >Сохранить
                                                </div>
                                            </div>
                                        </>
                                        :
                                        this.state.nextStep === "load" ?
                                            <div className="block-flex-center">
                                                <div className="loader"/>
                                            </div>
                                        :
                                            null

                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Registration;
