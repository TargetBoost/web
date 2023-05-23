import React, {Component} from "react";
import CurrencyInput from 'react-currency-input-field';
import 'react-input-range/lib/css/index.css';
import InputMask from "react-input-mask";

class WalletUser extends Component{
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

    updatePrice = (value, name) => {
        this.setState({
            price: value
        })
    }

    render() {
        let store = this.state.store.getState()
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
                                        <InputMask className="input-default" id="tg" mask="+7***********************************************" maskChar={null} alwaysShowMask={false} placeholder="Номер qiwi для пополнения" />
                                        {/*<input className="input-default" id="tg" placeholder="Сcылка на Ваш телеграм https://..."/>*/}
                                    </div>
                                    <div style={{padding: "10px", width: "190px"}}>
                                        <div className="button-default unselectable">Создать заявку</div>
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
