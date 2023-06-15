import React, {Component} from "react";
import background from "../img/d.webp"
import background_tg from "../img/dd.webp"
import background_auth from "../img/ddd_d.webp"

import InputMask from "react-input-mask";
import Avatar from "@mui/material/Avatar";
import target from "../icon/target_new.png";




class Blog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            executor: "executer",
            regShow: true,
            store: this.props.store,
            showPopUp: false,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    refTG = React.createRef();

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
            execute: document.getElementById("im_read").checked,
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
        this.state.store.dispatch({
            type: "set_page", value: "b",
        })
    }

    swapButtonTask = (e) => {

        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = document.getElementsByClassName("button-light")

        for (let i=0; i !== childrenCollection.length; i++) {
            childrenCollection[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                {
                    store.showPopUp ?
                        <div className="pop-up">
                            <div className="block-default-pre" style={{
                                backgroundImage: `url(${background_auth})`,
                                backgroundPosition: "right 0px top 21%",
                                // backgroundAttachment: "fixed",
                                backgroundSize: "1000px, auto",
                                backgroundRepeat: "no-repeat",
                                color: "#000",
                                paddingRight: "600px",
                                paddingLeft: "30px",
                                height: "430px",
                                width: "970px",
                                position: "relative"
                            }}>
                                <div className="preview-inside-block">
                                    <div className="white-block-border">
                                        {
                                            store.user.auth ?
                                                <>
                                                    <div style={{display: "flex"}}>
                                                        <>
                                                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                {
                                                                    store.user.mainPhoto !== "" ?
                                                                        <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 60, height: 60 }}></Avatar>
                                                                        :
                                                                        <Avatar sx={{ width: 60, height: 60 }}></Avatar>
                                                                }
                                                            </div>
                                                            <div className="name-account">
                                                                <div>{store.user.tg}</div>
                                                                <div style={{fontSize: "10px"}}>Вы уже вошли</div>
                                                                <div className="underline" style={{fontSize: "13px", marginTop: "10px"}} onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (store.user.auth) {
                                                                        if (store.user.execute === true) {
                                                                            window.location.href = '/tasks/'
                                                                        } else {
                                                                            window.location.href = '/targets/'
                                                                        }
                                                                    }else{
                                                                        window.location.href = '/'
                                                                    }
                                                                }}>Перейти в личный кабинет</div>
                                                            </div>
                                                        </>
                                                    </div>
                                                </>
                                                :
                                                !this.state.regShow ?
                                                    <>
                                                        <div className="wrapper-input-main">
                                                            <InputMask className="input-main" formatChars={{
                                                                '9': '[0-9]',
                                                                'a': '[A-Za-z]',
                                                                '*': '.*'
                                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин telegram" onKeyDown={this.handleKeyDownAuth}/>
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
                                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин telegram" />                                        </div>
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
                                                            }}>Я Publisher</div>
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
                                <div className="wrapper-absolute">
                                    <div className="underline unselectable" onClick={()=>{
                                        this.state.store.dispatch({
                                            type: "set_pop_up", value: false,
                                        })
                                    }}>Закрать</div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }

                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "left 0px top 0px",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "600px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#fff",
                    backgroundColor: "#0F171D",
                    paddingLeft: "530px",
                    position: "relative",
                    height: "250px"
                }}>
                    <h1 style={{fontSize: "40px"}}>Получайте доход от социальных сетей</h1>
                    <h2>Telegram, VK</h2>
                    <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none"}} onClick={()=>{
                        this.state.store.dispatch({
                            type: "set_pop_up", value: true,
                        })
                    }}>Заказать услугу</div>
                    {/*<div className="preview-inside-block">*/}
                    {/*    <p>*/}
                    {/*        Наш сервис предоставляет услуги по размещению контекстной рекламы в социальных сетях, таких как Telegram, VK. Мы помогаем рекламодателям оптимизировать инвестиции в рекламу и привлекать новых клиентов.*/}
                    {/*        <br/>*/}
                    {/*        <br/>*/}
                    {/*        Наши услуги включают подбор наилучших платформ для размещения рекламы, подготовку рекламного контента и настройку таргетинга, чтобы реклама была показана только нужным пользователям. Мы также проводим анализ результатов размещения рекламы и корректируем стратегию в соответствии с полученными данными.*/}
                    {/*        <br/>*/}
                    {/*        <br/>*/}
                    {/*        Наша команда гарантирует высокое качество услуг и прозрачность в работе.*/}
                    {/*        <br/>*/}
                    {/*        <br/>*/}
                    {/*        <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff" }} onClick={()=>{*/}
                    {/*            this.state.store.dispatch({*/}
                    {/*                type: "set_pop_up", value: true,*/}
                    {/*            })*/}
                    {/*        }}>Заказать услугу</div>*/}

                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
                <div className="wrapper-view-place">
                    <div className="block-default-pre" style={{
                        // backgroundImage: `url(${background_tg})`,
                        backgroundPosition: "left -100px top 50%",
                        // backgroundAttachment: "fixed",
                        backgroundSize: "1100px, auto",
                        backgroundRepeat: "no-repeat",
                        color: "#000",
                        // backgroundColor: "#3788c5",
                        // paddingLeft: "400px",
                        // height: "600px",
                        marginRight: "20px"

                    }}>
                        <h2>Как начать получать доход от социальныз сетей?</h2>
                        <div className="navigation-preview">
                            <div className="block-text-pre">
                                Услуга получения дохода от Telegram-канала за размещение рекламы - это способ заработка денег на своем канале в Telegram. Суть услуги заключается в том, что владелец канала получает деньги за размещение рекламных постов на своей странице.
                                <br/>
                                <br/>
                                Как это работает? Рекламодатели обращаются к владельцам каналов с предложением разместить рекламу на их страницах. Владелец канала может выбрать, какую рекламу публиковать и какую сумму за это получать.
                                <br/>
                                <br/>
                                Для заработка на размещении рекламы на канале необходимо иметь активную аудиторию. Чем больше подписчиков и живых комментариев на канале, тем больше возможности заработать на рекламе.
                                <br/>
                                <br/>
                                Владельцы каналов могут выкладывать рекламные посты как в текстовом, так и в графическом виде. Каждый раз, когда пользователи переходят по ссылке на рекламу, владелец канала получает дополнительный доход.
                                <br/>
                                <br/>
                                Также стоит учитывать, что размещать рекламу нужно умеренно, чтобы не потерять своих подписчиков и не навредить репутации своего канала. Лучше всего составить чёткие правила размещения рекламы и не отклоняться от них.

                                В общем, получение дохода от Telegram-канала за размещение рекламы - это хороший способ получать дополнительный доход, если у вас есть активная аудитория на канале и вы знаете, как правильно размещать рекламу.
                            </div>
                        </div>
                    </div>
                    <div className="block-default-pre" style={{
                        // backgroundImage: `url(${background_tg})`,
                        backgroundPosition: "left -100px top 50%",
                        // backgroundAttachment: "fixed",
                        backgroundSize: "1100px, auto",
                        backgroundRepeat: "no-repeat",
                        color: "#000",
                        width: "300px",
                        // backgroundColor: "#3788c5",
                        // paddingLeft: "400px",
                        height: "130px",

                    }}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div style={{display: "flex", width: "300px", background: "#fafafa", padding: "10px", borderRadius: "20px"}}>
                                <>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Avatar src={target} sx={{ width: 70, height: 70, border: "1px solid #fafafa" }}></Avatar>
                                    </div>
                                    <div className="name-account">
                                        <div>@targetBoost</div>
                                        <div style={{fontSize: "10px", color: "#609eee"}}>В сети</div>

                                    </div>
                                </>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Blog;
