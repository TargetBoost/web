import React, {Component} from "react";
import TextareaAutosize from 'react-textarea-autosize';

import Slider from 'react-slick';

import background from "../img/view1.webp"
import background_two from "../img/z.webp"

import background_auth from "../img/ddd_d.webp"
import target from "../icon/target_new.png"
import  send from  "../icon/send.png"

import InputMask from "react-input-mask";
import Avatar from "@mui/material/Avatar";




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

    settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 12000,
        autoplay: true,
        fade: true,
        padding: "0",
    };

    settingsTextArea = {
        minRows: 1,
    }

    refObj = React.createRef();
    refTextArea = React.createRef();


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
        window.addEventListener('scroll', this.handleScroll)
    }

    swapButtonTask = (e) => {

        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = document.getElementsByClassName("button-light")

        for (let i=0; i !== childrenCollection.length; i++) {
            childrenCollection[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    handleScroll = () => {
        const position = window.pageYOffset;
        // console.log(position)
        if (position >= 314){
            if (this.refObj.current.style !== undefined){
                this.refObj.current.style.position = "fixed"
                this.refObj.current.style.top = "80px"
            }
        }else{
            this.refObj.current.style.position = ""
        }
    };

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
                <Slider {...this.settings}>
                        <div>
                            <div className="block-default-pre ad-view" style={{
                                backgroundImage: `url(${background})`,
                                backgroundPosition: "left 0px top 0px",
                                // backgroundAttachment: "fixed",
                                backgroundSize: "600px, auto",
                                backgroundRepeat: "no-repeat",
                                color: "#fff",
                                backgroundColor: "#0F171D",
                                paddingLeft: "530px",
                                position: "relative",
                                height: "295px"
                            }}>
                                <h1 style={{fontSize: "40px"}}>Контекстная реклама это просто</h1>
                                <h2>c TargetBoost!</h2>
                                <div style={{position: "absolute", right: "20px", bottom: "20px"}}>
                                    <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none"}} onClick={()=>{
                                        this.state.store.dispatch({
                                            type: "set_pop_up", value: true,
                                        })
                                    }}>Заказать услугу</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="block-default-pre" style={{
                                backgroundImage: `url(${background_two})`,
                                backgroundPosition: "right 0 top 50%",
                                // backgroundAttachment: "fixed",
                                backgroundSize: "1000px, auto",
                                backgroundRepeat: "no-repeat",
                                color: "#fff",
                                paddingLeft: "500px",
                                position: "relative",
                                backgroundColor: "#C25863",
                                height: "295px"
                            }}>

                                <h1 style={{fontSize: "40px"}}>Монетезация Ваших социальных сетей</h1>
                                <h2>Telegram, VK</h2>
                                <div className="preview-inside-block">
                                    <div style={{position: "absolute", right: "20px", bottom: "20px"}}>
                                        <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none" }} onClick={()=>{
                                            this.state.store.dispatch({
                                                type: "set_pop_up", value: true,
                                            })
                                        }}>Заказать услугу</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                <div className="wrapper-view-place">
                    <div style={{
                        marginRight: "20px",
                    }}>
                        {
                            store.user.admin === true ?
                                <div className="wrapper-edit-post">
                                    <div style={{display: "flex", padding: "10px", borderRadius: "20px"}}>
                                        <div style={{display: "flex", justifyContent: "center", marginRight: "10px"}}>
                                            {
                                                store.user.mainPhoto !== "" ?
                                                    <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 40, height: 40 }}></Avatar>
                                                    :
                                                    <Avatar sx={{ width: 40, height: 40 }}></Avatar>
                                            }
                                        </div>
                                        {/*<div>*/}
                                        {/*    <input className="input-default-comment" placeholder="Напишите здесь свой комментарий" />*/}

                                        {/*</div>*/}
                                        <TextareaAutosize placeholder="Напишите новый пост" {...this.settingsTextArea}  onFocus={(e)=>{
                                            this.settingsTextArea.minRows = 4
                                        }} className="textarea-auto-size" />
                                        <div className="send-message">
                                            <img src={send} style={{maxWidth: "40px"}} alt="send"/>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        <div className="wrapper-post">
                            <div style={{display: "flex", background: "#fafafa", padding: "10px", borderRadius: "20px 20px 0 0 "}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Avatar src={target} sx={{ width: 70, height: 70 }}></Avatar>
                                </div>
                                <div className="name-account">
                                    <div>@targetboost</div>
                                    <div style={{fontSize: "10px", color: "#609eee"}}>Администратор</div>
                                </div>
                            </div>
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
                                backgroundColor: "#fff",
                            }}>

                                <h2>Как начать получать доход от социальных сетей?</h2>
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
                            <div className="wrapper-comment">
                                <div style={{display: "flex", padding: "10px", borderRadius: "20px"}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px"}}>
                                        {
                                            store.user.mainPhoto !== "" ?
                                                <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 40, height: 40 }}></Avatar>
                                                :
                                                <Avatar sx={{ width: 40, height: 40 }}></Avatar>
                                        }
                                    </div>
                                    {
                                        store.user.auth ?
                                            <>
                                                <input className="input-default-comment" placeholder="Напишите здесь свой комментарий" />
                                                <div className="send-message">
                                                    <img src={send} style={{maxWidth: "40px"}} alt="send"/>
                                                </div>
                                            </>
                                            :
                                            <input className="input-default-comment" placeholder="Войдите в аккаунт чтобы написать комментарий" disabled/>

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-post">
                            <div style={{display: "flex", background: "#fafafa", padding: "10px", borderRadius: "20px 20px 0 0 "}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Avatar src={target} sx={{ width: 70, height: 70 }}></Avatar>
                                </div>
                                <div className="name-account">
                                    <div>@targetboost</div>
                                    <div style={{fontSize: "10px", color: "#609eee"}}>Администратор</div>
                                </div>
                            </div>
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
                                backgroundColor: "#fff",
                            }}>
                                <h2>Как начать получать доход от социальных сетей?</h2>
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
                            <div className="wrapper-comment">
                                <div style={{display: "flex", padding: "10px", borderRadius: "20px"}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px"}}>
                                        {
                                            store.user.mainPhoto !== "" ?
                                                <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 40, height: 40 }}></Avatar>
                                                :
                                                <Avatar sx={{ width: 40, height: 40 }}></Avatar>
                                        }
                                    </div>
                                    {
                                        store.user.auth ?
                                            <>
                                                <input className="input-default-comment" placeholder="Напишите здесь свой комментарий" />
                                                <div className="send-message">
                                                    <img src={send} style={{maxWidth: "40px"}} alt="send"/>
                                                </div>
                                            </>
                                        :
                                            <input className="input-default-comment" placeholder="Войдите в аккаунт чтобы написать комментарий" disabled/>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-fixed">
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

                        }} ref={this.refObj}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div style={{display: "flex", width: "300px", background: "#fafafa", padding: "10px", borderRadius: "20px"}}>
                                    {
                                        store.user.auth ?
                                            <>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    {
                                                        store.user.mainPhoto !== "" ?
                                                            <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 70, height: 70 }}></Avatar>
                                                            :
                                                            <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                                    }
                                                </div>
                                                <div className="name-account">
                                                    <div>{store.user.tg}</div>
                                                    <div style={{fontSize: "10px", color: "#609eee"}}>Это Вы</div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    {
                                                        store.user.mainPhoto !== "" ?
                                                            <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 70, height: 70 }}></Avatar>
                                                            :
                                                            <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                                    }
                                                </div>
                                                <div className="name-account">
                                                    <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none", width: "130px"}} onClick={()=>{
                                                        this.state.store.dispatch({
                                                            type: "set_pop_up", value: true,
                                                        })
                                                    }}>Войти</div>
                                                </div>
                                            </>
                                    }
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
                            opacity: "0",

                        }}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div style={{display: "flex", width: "300px", background: "#fafafa", padding: "10px", borderRadius: "20px"}}>
                                    {
                                        store.user.auth ?
                                            <>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    {
                                                        store.user.mainPhoto !== "" ?
                                                            <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 70, height: 70 }}></Avatar>
                                                            :
                                                            <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                                    }
                                                </div>
                                                <div className="name-account">
                                                    <div>{store.user.tg}</div>
                                                    <div style={{fontSize: "10px", color: "#609eee"}}>Это Вы</div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    {
                                                        store.user.mainPhoto !== "" ?
                                                            <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 70, height: 70 }}></Avatar>
                                                            :
                                                            <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                                    }
                                                </div>
                                                <div className="name-account">
                                                    <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none", width: "130px"}} onClick={()=>{
                                                        this.state.store.dispatch({
                                                            type: "set_pop_up", value: true,
                                                        })
                                                    }}>Войти</div>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Blog;
