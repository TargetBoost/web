import React, {Component} from "react";
import background from "../img/d.png"
import background_tg from "../img/dd.png"
import background_auth from "../img/ddd_d.png"

import InputMask from "react-input-mask";
import Video from "./video";




class Preview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            executor: "executer",
            regShow: true,
            store: this.props.store
        }
    }

    login = () => {
        // let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')

        let data = {
            tg: document.getElementById("tg").value,
            password: document.getElementById("password").value
        }

        fetch("/core/v1/login", {
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

    registration = () => {
        // let phone = document.getElementById("phone").value.replace(/\s/g, '').replace('+', '')

        let data = {
            // number_phone: Number(phone),
            // login: document.getElementById("login").value,
            password: document.getElementById("password").value,
            execute: !document.getElementById("im_read").checked,
            tg: document.getElementById("tg").value
        }

        if (data.password !== '' && data.tg !== '') {
            if (document.getElementById("re_password").value !== data.password){
                this.state.store.dispatch({
                    type: "set_error", value: "Пароли не совпадают",
                })
                return
            }
            this.setState({nextStep: "load"})
            if (document.getElementById("re_password").value === data.password) {
                fetch("/core/v1/registration", {
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
                            this.state.store.dispatch({
                                type: "set_error", value: res.status.message,
                            })
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

    handleKeyDownAuth = (event) => {
        if (event.key === 'Enter') {
            this.login()
        }
    }

    handleKeyDownReg = (event) => {
        if (event.key === 'Enter') {
            this.registration()
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "right 0px top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1000px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    paddingLeft: "400px"
                }}>
                    <h1>Контекстная реклама через посты в социальных сетях</h1>
                    <h2>Telegram, VK</h2>
                    <div className="preview-inside-block">
                        <p>
                            Наш сервис предоставляет услуги по размещению контекстной рекламы в социальных сетях, таких как Telegram, VK. Мы помогаем рекламодателям оптимизировать инвестиции в рекламу и привлекать новых клиентов.
                            <br/>
                            Наши услуги включают подбор наилучших платформ для размещения рекламы, подготовку рекламного контента и настройку таргетинга, чтобы реклама была показана только нужным пользователям. Мы также проводим анализ результатов размещения рекламы и корректируем стратегию в соответствии с полученными данными.
                            <br/>
                            Наша команда имеет опыт работы с различными бизнесами и предоставляет индивидуальный подход к каждому клиенту, чтобы максимально удовлетворить их потребности и достигнуть целей. Мы гарантируем высокое качество услуг и прозрачность в работе.
                        </p>
                    </div>
                </div>
                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background_auth})`,
                    backgroundPosition: "right 0px top 21%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1000px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    paddingRight: "600px",
                    paddingLeft: "30px",
                    height: "430px"
                }}>
                    <div className="preview-inside-block">
                        <div className="white-block-border">
                            {
                                !this.state.regShow ?
                                    <>
                                        <div className="wrapper-input-main">
                                            <InputMask className="input-main" formatChars={{
                                                '9': '[0-9]',
                                                'a': '[A-Za-z]',
                                                '*': '.*'
                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин телеграм" onKeyDown={this.handleKeyDownAuth}/>
                                        </div>
                                        <div className="wrapper-input-main">
                                            <input id="password" className="input-main" placeholder="Пароль" type="password" onKeyDown={this.handleKeyDownAuth}/>
                                        </div>
                                        <div className="sing-wrapper-main">
                                            <div className="button-default unselectable" onClick={this.login}>Войти</div>
                                            <div className="title-main underline unselectable" onClick={() => {this.setState({"regShow": true})}}>У Вас еще нет аккаунта?</div>

                                            {/*<div className="title-main underline unselectable">Забыли пароль?</div>*/}
                                        </div>
                                    </>
                                :
                                    <>
                                        <div className="wrapper-input-main">
                                            <InputMask className="input-main" formatChars={{
                                                '9': '[0-9]',
                                                'a': '[A-Za-z]',
                                                '*': '.*'
                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин телеграм" />                                        </div>
                                        <div className="wrapper-input-main">
                                            <input id="password" className="input-main" placeholder="Пароль" type="password" onKeyDown={this.handleKeyDownReg}/>
                                        </div>
                                        <div className="wrapper-input-main">
                                            <input id="re_password" className="input-main" placeholder="Повторите пароль" type="password" onKeyDown={this.handleKeyDownReg}/>
                                        </div>
                                        <div className="wrapper-input-main">
                                            <div className="wrapper-input-checkbox-wr-input">
                                                <input className="input-default-checkbox" type="checkbox" id="im_read"/>
                                            </div>
                                            <div className="wrapper-input-checkbox-wr-input-text unselectable" onClick={()=> {
                                                let check = document.getElementById("im_read").checked
                                                document.getElementById("im_read").checked = !check;
                                            }}>Я рекламодатель</div>
                                        </div>

                                        <div className="sing-wrapper-main">
                                            <div className="button-default unselectable" onClick={this.registration}>Поехали! 🚀</div>
                                            <div className="title-main underline unselectable" onClick={() => {this.setState({"regShow": false})}}>У Вас уже есть аккаунт?</div>
                                        </div>
                                        <div className="info-auth-main">
                                            <p>
                                                Регистрируясь Вы подтверждаете что согласны с <a href="/agreement" target="_blank">правилами</a> сайта.
                                            </p>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background_tg})`,
                    backgroundPosition: "left -100px top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1100px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    paddingLeft: "400px",
                    height: "335px",

                }}>
                    <h2>Что дает продвижение?</h2>
                    <div className="navigation-preview">
                        <div className="block-text-pre">
                            Каналы Telegram - на данный момент самый популярный способ получения информации. Большое количество подписчиков канала даст Вам доверие потенциальной аудитории к каналу и, как следствие, более выраженный, но при этом естественный прирост подписчиков.
                            <br/>
                            <br/>
                            Youtube является эффективным способом повышения популярности видео, не важно, будь это музыкальное видео, обзор продукта или Ваш персональный блог.
                            <br/>
                            <br/>
                            Подписчики Youtube также являются важным критерием ранжирования и влияют на рекомендацию Ваших роликов.
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Preview;
