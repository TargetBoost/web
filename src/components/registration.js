import React, {Component} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
    CountrySelector,
    StateSelector,
    CitySelector
} from 'volkeno-react-country-state-city'


class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            nextStep: "reg",
            store: this.props.store,
            country: '', state: '', city: '',
        }
    }

    urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(URL);
    };

    handleCountrySelect = (option) => {
        this.setState({country: option})
    }

    handleStateSelect = (option) => {
        this.setState({state: option})
    }

    handleCitySelect = (option) => {
        this.setState({city: option})
    }

    numberChange = (e) => {
        // console.log(e)
    }

    registration = () => {
        let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')

        let data = {
            number_phone: Number(phone),
            login: document.getElementById("login").value,
            password: document.getElementById("password").value,
            execute: document.getElementById("im_read").checked,
            tg: document.getElementById("tg").value
        }

        if (!this.urlPatternValidation(data.tg)) {
            this.state.store.dispatch({
                type: "set_error", value: "Телеграм может быть только ссылкой",
            })
            return
        }

        if (data.login !== '' && data.number_phone !== '' && data.password !== '' && data.tg !== '') {
            this.setState({nextStep: "load"})
            if (document.getElementById("re_password").value === data.password) {
                fetch("/core/v1/system/registration", {
                    method: "POST",
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res)

                        if (res.status.message === null) {
                            this.state.store.dispatch({
                                type: "update_token", value: res.data.token,
                            })

                            fetch(`/core/v1/service/user/${res.data.id}`, {
                                method: "GET",
                                headers: {
                                    "Authorization": window.localStorage.getItem("token")
                                }
                            })
                                .then(response => response.json())
                                .then(res => {
                                    if (res.status.message === null) {
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: res.data.id,
                                                number: res.data.number_phone,
                                                login: res.data.login,
                                                auth: true
                                            },
                                        })

                                        console.log(res.data)

                                        if (res.data.execute === true) {
                                            window.location.href = "/tasks"
                                        }else{
                                            window.location.href = "/targets"
                                        }

                                    }else{
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: 0,
                                                number: 0,
                                                login: null,
                                                auth: false
                                            },
                                        })
                                    }

                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        }else{

                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({nextStep: "reg"})
                    });
            }
        }else{
            this.state.store.dispatch({
                type: "set_error", value: "Некоторые поля не заполнены",
            })
        }
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
                                                <input className="input-default" id="tg" placeholder="Сcылка на Ваш телеграм https://..."/>
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
                                                    <div className="title-pop-up">Личные данные</div>
                                                </div>
                                                <div className="wrapper-input">
                                                    <input className="input-default" id="first_name" placeholder="Имя"/>
                                                </div>
                                                <div className="wrapper-input">
                                                    <input className="input-default" id="old" type="number" placeholder="Возраст" max="99"/>
                                                </div>
                                                <div className="wrapper-input">
                                                    <div className="title-pop-up">Региональные настройки</div>
                                                </div>
                                                <div className="wrapper-input">
                                                    <CountrySelector
                                                        onChange={this.handleCountrySelect}
                                                        name='country'
                                                        placeholder='Выберите страну'
                                                        value={this.state.country}
                                                    />
                                                </div>
                                                <div className="wrapper-input">
                                                    <StateSelector
                                                        country={this.state.country}
                                                        name='state'
                                                        value={this.state.state}
                                                        countryPlaceholder='Выберите регион'
                                                        onChange={this.handleStateSelect}
                                                    />
                                                </div>
                                                <div className="wrapper-input">
                                                    <CitySelector
                                                        state={this.state.state}
                                                        name='city'
                                                        value={this.state.city}
                                                        statePlaceholder='Выберите город'
                                                        onChange={this.handleCitySelect}
                                                    />
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
