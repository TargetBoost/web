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
            regShow: false,
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
    MRGtag;

    componentDidMount() {
        // const script = document.createElement("script");
        //
        // script.src = "https://ad.mail.ru/static/ads-async.js";
        // script.async = true;
        //
        // document.body.appendChild(script);
        // (this.MRGtag = window.MRGtag || []).push({})
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
                    <h1>Продвижение в социальных сетях</h1>
                    <h2>Telegram, Youtube, VK</h2>
                    <div className="preview-inside-block">
                        <p>
                            Наша платформа помогает продвигать социальные сети, такие как Telegram, Youtube, VK.
                            Начать очень просто: зарегистрируйтесь, создайте первую рекламную кампанию уже сейчас и получите столько трафика и просмотров, сколько Вам необходимо.
                            <br/>
                            <br/>
                            Зарабатывай вместе с нами, выполняйте задания по продвижению и прочим действиям в социальных сетях.
                            Мы автоматически проверяем выполненные задания и сразу зачисляем оплату на Ваш баланс.
                        </p>
                    </div>
                    {/*<div className="navigation-preview">*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка VK 2 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Лайк VK 1,5 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка на канал Youtube 1 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Посмотреть видео на Youtube 1 руб.</div>*/}
                    {/*</div>*/}
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
                    {/*<h1>Накрутка в социальных сетях</h1>*/}
                    {/*<h2>Telegram, Youtube, VK</h2>*/}
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
                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин телеграмм без @" onKeyDown={this.handleKeyDownReg}/>
                                        </div>
                                        <div className="wrapper-input-main">
                                            <input id="password" className="input-main" placeholder="Пароль" type="password" onKeyDown={this.handleKeyDownReg}/>
                                        </div>
                                        <div className="sing-wrapper-main">
                                            <div className="button-default unselectable" onClick={this.login}>Войти</div>
                                            <div className="title-main underline unselectable" onClick={() => {this.setState({"regShow": true})}}>Зарегистрироваться</div>

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
                                            }} id="tg" mask="@***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Логин телеграмм без @" />                                        </div>
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
                    {/*<div className="navigation-preview">*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка VK 2 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Лайк VK 1,5 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка на канал Youtube 1 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Посмотреть видео на Youtube 1 руб.</div>*/}
                    {/*</div>*/}
                </div>
                {/*<div className="block-default-pre">*/}
                {/*    <Video store={this.state.store}/>*/}
                {/*</div>*/}
                <div className="block-default-pre">
                    <div id="adman-ads"></div>
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
                        {/*<div className="block-default-icon">*/}
                        {/*    <img className="default-icon" src={telegram} alt="telegram"/>*/}
                        {/*</div>*/}
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
                {/*<div className="block-default-pre">*/}
                {/*    <h2>Накрутка каналов Telegram</h2>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={telegram} alt="telegram"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Каналы Telegram - на данный момент самый популярный способ получения информации. Большое количество подписчиков канала даст вам доверие потенциальной аудитории к каналу и как следствие более выраженный, но при этом естественный прирост подписчиков.                                    </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h3>Раскрутка каналов Youtube</h3>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={youtube} alt="youtube"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Покупка лайков/просмотров на Youtube является эффективным способом повышения популярности видео, не важно будь это музыкальное видео, обзор продукта или ваш персональный блог.*/}
                {/*            Подписчики Youtube так же являются важным критерием ранжирования и влияют на рекомендацию Ваших роликов, но Youtube очень пристально следит за резкими изменениями этого показателя, поэтому мы осуществляем постепенное увеличение подписчиков, чтобы обойти их алгоритмы выявления накрутки.*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h3>Раскрутка сообществ VK</h3>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={vk} alt="vk"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Раскрутка сообществ VK - актуальная тема в 2022 году. Сегодня можно увидеть тысячи различных сообществ разной тематики. Одни создают группу как хобби, другие для продажи товаров и предоставления услуг, третьи для заработка на рекламе.*/}
                {/*            Чтобы Ваше сообщество стало заметным и популярным нужно приложить время и усилия. Вы должны придерживаться наших рекомендаций и раскрутить группу в VK станет намного проще, эффективнее и быстрее.*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="block-default-pre">*/}
                {/*    <h3>Заработок на заданиях в социальных сетях</h3>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Зарабатывай выполняя задания по подпискам/лайкам и прочим действиям в социальных сетях.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Мы автоматически проверяем выполненные задания и сразу зачисляем оплату на Ваш баланс.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre" style={{fontSize: "13px", background: "#f2e4a8"}}>*/}
                {/*    Мы запустились в тестовом режиме.<br/>*/}
                {/*    У нас уже есть задания которые можно выполнить!<br/>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h2>Способы вывода средств</h2>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Вывод средств осуществляется от 5 руб посредствам создания заявки в личном кабиенете.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="flex-left-right">*/}
                {/*            /!*<div className="block-default-icon-many">*!/*/}
                {/*            /!*    <img className="default-icon-many" src={io} alt="io"/>*!/*/}
                {/*            /!*    <div className="title-default-icon-many">ЮMoney</div>*!/*/}
                {/*            /!*</div>*!/*/}
                {/*            <div className="block-default-icon-many">*/}
                {/*                <img className="default-icon-many" src={qiwi} alt="qiwi"/>*/}
                {/*                <div className="title-default-icon-many">QIWI</div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        )
    }
}

export default Preview;
