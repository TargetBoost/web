import React, {Component} from "react";
import CurrencyInput from 'react-currency-input-field';
import 'react-input-range/lib/css/index.css';
import InputMask from "react-input-mask";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png";
import telegram from "../icon/telegram.png";

class WalletUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            task: [],
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

    updatePrice = (value, name) => {
        this.setState({
            price: value
        })
    }

    createTask = () => {
        let data = {
            total: this.state.price,
            number: document.getElementById("number").value,
        }

        fetch(`/core/v1/service/task_cashes`, {
            method: "POST",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    this.state.store.dispatch({
                        type: "set_info", value: "Заявка на вывод создана",
                    })
                }else{
                    this.state.store.dispatch({
                        type: "set_error", value: res.status.message,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        let store = this.state.store.getState()

        function filterTask(targets, f) {
            let target = []

            for (const property in targets) {
                if (targets[property].status === f) {
                    target.push(targets[property])
                }
            }

            return target
        }

        return (
            <>
                {
                    store.user.load === false ?
                        <>
                            <div className="block-default-pre">
                                <h2>Вывод баланса</h2>
                                <h3>Ваш баланс: { (parseInt(store.user.balance)).toLocaleString('ru') } ₽</h3>
                            </div>
                            <div className="block-default-pre">
                                <div className="task-wall">
                                    {
                                        this.state.task.length > 0 ?
                                            this.state.task.map(t =>
                                                <div className="task-item">
                                                    <div className="task-item-value">{t.title}</div>
                                                    <div className="task-item-value">{t.cost}₽</div>
                                                    <div className="task-item-value underline click"><a target="_blank" href={t.link} >Перейти к заданию</a></div>
                                                    <div className="task-item-value">
                                                        <div className="button-default" target={t.id} id={t.tid} onClick={this.checkSub}>Проверить</div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            <div className="alert">
                                                Вы еще не делали заявок на вывод баланса.
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="block-default-pre">
                                <div className="wrapper-input">
                                    <div className="preview-inside-block">
                                        <p>
                                            Минимальная сумма вывода 5 ₽
                                        </p>
                                    </div>
                                </div>
                                <div style={{width: "250px"}}>
                                    <div className="wrapper-input">
                                        <CurrencyInput
                                            id="price"
                                            className="input-default"
                                            intlConfig={{locale: 'ru-RU', currency: 'RUB'}}
                                            name="price"
                                            placeholder="Стоимость"
                                            maxLength={6}
                                            defaultValue={0}
                                            decimalsLimit={2}
                                            onValueChange={(value, name) => this.updatePrice(value, name)}
                                            // style={{
                                            //     width: "220px"
                                            // }}
                                        />
                                    </div>
                                    <div className="wrapper-input">
                                        <InputMask className="input-default" id="number" mask="+7***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Номер qiwi для пополнения" />
                                        {/*<input className="input-default" id="tg" placeholder="Сcылка на Ваш телеграм https://..."/>*/}
                                    </div>
                                    <div style={{padding: "10px", width: "126px"}}>
                                        <div className="button-default unselectable" onClick={this.createTask}>Создать заявку</div>
                                    </div>
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

export default WalletUser;
