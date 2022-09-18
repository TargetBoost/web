import React, {Component} from "react";

class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
        }
    }

    render() {
        return (
            <>
                <div className="block-flex-center full-page">
                    <div className="wrapper-auth-pop-up-wr">
                        <div className="wrapper-auth-pop-up">
                            <div className="sign-in-place">
                                <div className="wrapper-input">
                                    <input className="input-default" placeholder="Логин"/>
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" placeholder="Номер мобильного телефона"/>
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" type="password" placeholder="Пароль"/>
                                </div>
                                <div className="wrapper-input">
                                    <input className="input-default" type="password" placeholder="Повторите пароль"/>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <input className="input-default-checkbox" type="checkbox"/>
                                    </div>
                                    <div className="wrapper-input-checkbox-wr-input-text">Я прочел <a className="button-text" target="_blank" href="https://t.me/andrey_shsh">пользовательское соглашение</a> </div>
                                </div>
                                <div className="wrapper-input-checkbox">
                                    <div className="wrapper-input-checkbox-wr-input">
                                        <input className="input-default-checkbox" type="checkbox"/>
                                    </div>
                                    <div className="wrapper-input-checkbox-wr-input-text">Я исполнитель</div>
                                </div>
                            </div>
                            <div className="sing-wrapper">
                                <div className="button-sign green unselectable">Перейти в личный кабинет</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Registration;
