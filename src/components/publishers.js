import React, {Component} from "react";
import background from "../img/z.webp"

// import background_tg from "../img/view2.jpg"
// import background_tg from "../img/dd.webp"
import background_auth from "../img/ddd_d.webp"

import InputMask from "react-input-mask";
import Avatar from "@mui/material/Avatar";
// import background_tg from "../img/dd.webp";




class Publishers extends Component{
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
            type: "set_page", value: "p",
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
                    backgroundPosition: "right 0 top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1000px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#fff",
                    paddingLeft: "500px",
                    position: "relative",
                    backgroundColor: "#C25863",
                    // height: "500px"
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
                <div className="block-default-pre" style={{
                    // backgroundImage: `url(${background})`,
                    backgroundPosition: "right 0px top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1000px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    // paddingLeft: "400px",
                    position: "relative",
                    backgroundColor: "#EFEFEF",
                    // height: "500px"
                }}>

                    <h2 style={{fontSize: "30px"}}>Как работает наша услуга?</h2>
                    {/*<h3>Telegram, VK</h3>*/}
                    <div className="preview-inside-block">
                        <p>
                            Мы определим тематику Вашего контента и лояльность Вашей аудитории. В личном кабинете Вам будут приходить подходящие для Вашей аудитории рекламные кампании на основе нашего анализа.
                            <br/>
                            <br/>
                            Вы сами выбираете какую рекламу размещать. После выбора и настройки наш бот будет сам постить рекламу в Вашем Telegram канале или VK сообществе.
                            <br/>
                            <br/>
                            Наша команда очень тщательно отбирает рекламные кампании и гарантирует высокое качество услуг.
                            <br/>
                            <br/>
                            <div className="button-default-big unselectable" style={{background: "#0072FC", color: "#fff", border: "none" }} onClick={()=>{
                                this.state.store.dispatch({
                                    type: "set_pop_up", value: true,
                                })
                            }}>Начать</div>

                        </p>
                    </div>
                </div>

                {/*<div className="block-default-pre" style={{*/}
                {/*    backgroundImage: `url(${background_auth})`,*/}
                {/*    backgroundPosition: "right 0px top 21%",*/}
                {/*    // backgroundAttachment: "fixed",*/}
                {/*    backgroundSize: "1000px, auto",*/}
                {/*    backgroundRepeat: "no-repeat",*/}
                {/*    color: "#000",*/}
                {/*    paddingRight: "600px",*/}
                {/*    paddingLeft: "30px",*/}
                {/*    height: "430px"*/}
                {/*}}>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <div className="white-block-border">*/}
                {/*            {*/}
                {/*                !this.state.regShow ?*/}
                {/*                    <>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <InputMask className="input-main" formatChars={{*/}
                {/*                                '9': '[0-9]',*/}
                {/*                                'a': '[A-Za-z]',*/}
                {/*                                '*': '.*'*/}
                {/*                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин telegram" onKeyDown={this.handleKeyDownAuth}/>*/}
                {/*                        </div>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <input id="password" className="input-main" placeholder="Пароль" type="password" onKeyDown={this.handleKeyDownAuth}/>*/}
                {/*                        </div>*/}
                {/*                        <div className="sing-wrapper-main">*/}
                {/*                            <div className="button-default unselectable" onClick={this.login}>Войти</div>*/}
                {/*                            <div className="title-main underline unselectable" onClick={() => {this.setState({"regShow": true})}}>У Вас еще нет аккаунта?</div>*/}

                {/*                            /!*<div className="title-main underline unselectable">Забыли пароль?</div>*!/*/}
                {/*                        </div>*/}
                {/*                    </>*/}
                {/*                :*/}
                {/*                    <>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <InputMask className="input-main" formatChars={{*/}
                {/*                                '9': '[0-9]',*/}
                {/*                                'a': '[A-Za-z]',*/}
                {/*                                '*': '.*'*/}
                {/*                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин telegram" />                                        </div>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <input id="password" className="input-main" placeholder="Пароль" type="password" onKeyDown={this.handleKeyDownReg}/>*/}
                {/*                        </div>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <input id="re_password" className="input-main" placeholder="Повторите пароль" type="password" onKeyDown={this.handleKeyDownReg}/>*/}
                {/*                        </div>*/}
                {/*                        <div className="wrapper-input-main">*/}
                {/*                            <div className="wrapper-input-checkbox-wr-input">*/}
                {/*                                <input className="input-default-checkbox" type="checkbox" id="im_read"/>*/}
                {/*                            </div>*/}
                {/*                            <div className="wrapper-input-checkbox-wr-input-text unselectable" onClick={()=> {*/}
                {/*                                let check = document.getElementById("im_read").checked*/}
                {/*                                document.getElementById("im_read").checked = !check;*/}
                {/*                            }}>Я Publisher</div>*/}
                {/*                        </div>*/}
                {/*                        <div className="sing-wrapper-main">*/}
                {/*                            <div className="button-default unselectable" onClick={this.registration}>Поехали! 🚀</div>*/}
                {/*                            <div className="title-main underline unselectable" onClick={() => {this.setState({"regShow": false})}}>У Вас уже есть аккаунт?</div>*/}
                {/*                        </div>*/}
                {/*                        <div className="info-auth-main">*/}
                {/*                            <p>*/}
                {/*                                Регистрируясь Вы подтверждаете что согласны с <a href="/agreement" target="_blank">правилами</a> сайта.*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                    </>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre" style={{*/}
                {/*    // backgroundImage: `url(${background_auth})`,*/}
                {/*    // backgroundPosition: "right 0px top 21%",*/}
                {/*    // backgroundAttachment: "fixed",*/}
                {/*    // backgroundSize: "1000px, auto",*/}
                {/*    // backgroundRepeat: "no-repeat",*/}
                {/*    // color: "#000",*/}
                {/*    // paddingRight: "600px",*/}
                {/*    // paddingLeft: "30px",*/}
                {/*    // height: "430px"*/}
                {/*}}>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        /!*<h2>Наши статьи</h2>*!/*/}
                {/*    </div>*/}

                {/*</div>*/}
                {/*<div className="block-default-pre" style={{*/}
                {/*    backgroundImage: `url(${background_tg})`,*/}
                {/*    backgroundPosition: "left -100px top 50%",*/}
                {/*    // backgroundAttachment: "fixed",*/}
                {/*    backgroundSize: "1100px, auto",*/}
                {/*    backgroundRepeat: "no-repeat",*/}
                {/*    color: "#000",*/}
                {/*    paddingLeft: "400px",*/}
                {/*    height: "365px",*/}

                {/*}}>*/}
                {/*    <h2>Что дает контекстная реклама?</h2>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-text-pre">*/}
                {/*            <br/>*/}
                {/*            <br/>*/}
                {/*            1. Точное попадание в целевую аудиторию - реклама появляется перед пользователями, которые заинтересованы в товарах или услугах.*/}
                {/*            <br/>*/}
                {/*            <br/>*/}
                {/*            2. Возможность оптимизации затрат - контекстная реклама позволяет установить множество параметров рекламной кампании, благодаря чему можно контролировать траты и оптимизировать их.*/}
                {/*            <br/>*/}
                {/*            <br/>*/}
                {/*            3. Широкий охват - контекстная реклама появляется в Telegram каналах, пабликах VK и на партнерских сайтах, что позволяет добраться до широкой аудитории.*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        )
    }
}

export default Publishers;
