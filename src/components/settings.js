import React, {Component} from "react";
import 'react-input-range/lib/css/index.css';
import CurrencyInput from "react-currency-input-field";
import noImg from "../icon/no_img.png"

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    componentDidMount() {
        // fetch(`/core/v1/service/task`, {
        //     method: "GET",
        //     headers: {
        //         "Authorization": window.localStorage.getItem("token")
        //     }
        // })
        //     .then(response => response.json())
        //     .then(res => {
        //         if (res.status.message === null) {
        //             this.setState({targets: res.data})
        //         }else{
        //             this.state.store.dispatch({
        //                 type: "set_error", value: res.status.message,
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.state.store.dispatch({
        //             type: "set_error", value: error,
        //         })
        //     });
    }

    render() {
        let store = this.state.store.getState()
        console.log(store)
        return (
            <>
                {
                    store.user.load === false ?
                        <>
                            <div className="block-default-pre">
                                <h2>Профиль {store.user.tg}</h2>
                                {/*<h3>Ваш баланс: { store.user.balance } ₽</h3>*/}
                            </div>
                            <div className="block-default-pre">
                                {/*<div className="block-auth-external">*/}


                                {/*    {*/}
                                {/*        store.user.vkToken === "" ?*/}
                                {/*            <div className="wrapper-input">*/}
                                {/*                <div style={{*/}
                                {/*                    width: "200px"*/}
                                {/*                }}>*/}
                                {/*                    <div className="button-default" onClick={()=>{*/}
                                {/*                        window.location.href = `https://oauth.vk.com/authorize?client_id=51666148&display=page&redirect_uri=https://targetboost.ru/core/v1/callback_vk&scope=groups,offline&response_type=code&v=5.131&state=${window.localStorage.getItem("token")}`*/}
                                {/*                    }}>Авторизоваться VK</div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        :*/}
                                {/*            <div style={{*/}
                                {/*                width: "200px"*/}

                                {/*            }}>*/}
                                {/*                <div style={{display: "flex"}}>*/}
                                {/*                    /!*<div className="wrapper-input">*!/*/}
                                {/*                    /!*    <img className="icon-task-small" src={noImg} alt="item"/>*!/*/}
                                {/*                    /!*</div>*!/*/}
                                {/*                    <div className="wrapper-input">*/}
                                {/*                        {store.user.vkUserFirstName} {store.user.vkUserLastName}*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*                <div className="wrapper-input">*/}
                                {/*                    <div style={{*/}
                                {/*                        width: "200px"*/}
                                {/*                    }}>*/}
                                {/*                        <div className="button-default" onClick={()=>{*/}
                                {/*                            window.location.href = `https://oauth.vk.com/authorize?client_id=51666148&display=page&redirect_uri=https://targetboost.ru/core/v1/callback_vk&scope=groups,offline&response_type=code&v=5.131&state=${window.localStorage.getItem("token")}`*/}
                                {/*                        }}>Авторизоваться VK заново</div>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*    }*/}

                                {/*</div>*/}
                                {/*<div className="wrapper-input">*/}
                                {/*    <div className="preview-inside-block">*/}
                                {/*        <p>*/}
                                {/*            Введите сумму пополнения, после нажмите пополнить. <br/>*/}
                                {/*            Вы перейдете на страницу платежного шлюза и введете данные вашей карты.*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div >
                                    {/*<div className="wrapper-input">*/}
                                    {/*    Логин: { store.user.login }*/}
                                    {/*    /!*<input className="input-default" id="login" placeholder="Логин"/>*!/*/}
                                    {/*</div>*/}
                                        {/*<input className="input-default" id="login" placeholder="Логин"/>*/}
                                    <div className="wrapper-input">
                                        Телеграм: { store.user.tg }
                                        {/*<input className="input-default" id="login" placeholder="Логин"/>*/}
                                    </div>
                                    {/*<div style={{padding: "10px", width: "100px"}}>*/}
                                    {/*    <div className="button-default unselectable">Сохранить</div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            {/*<div className="block-default-pre" style={{fontSize: "12px", background: "#f2e4a8"}}>*/}
                            {/*    Мы не храним данные ваших банковских карт.*/}
                            {/*</div>*/}
                        </>
                        :
                        <div className="block-flex-center full-page">
                            <div className="block-flex-center">
                                <div className="loader"/>
                            </div>
                        </div>
                }
            </>
        )
    }
}

export default Settings;
