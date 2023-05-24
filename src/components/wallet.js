import React, {Component} from "react";
import CurrencyInput from 'react-currency-input-field';
import 'react-input-range/lib/css/index.css';

class Wallet extends Component{
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

    pay = e => {
        let data = {
            value: this.state.price
        }
        fetch(`/core/v1/service/pay`, {
            method: "POST",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    window.location.href = res.data.url
                }else{
                    this.state.store.dispatch({
                        type: "set_error", value: res.status.message,
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.state.store.dispatch({
                    type: "set_error", value: error,
                })
            });
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
                                <h2>Пополнение баланса</h2>
                                <h3>Ваш баланс: { (parseInt(store.user.balance)).toLocaleString('ru') } ₽</h3>
                            </div>
                            <div className="block-default-pre">
                                <div className="wrapper-input">
                                    <div className="preview-inside-block">
                                        <p>
                                            Введите сумму пополнения, после нажмите пополнить. <br/>
                                            Вы перейдете на страницу платежного шлюза и введете данные вашей карты.
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
                                    <div style={{padding: "10px", width: "100px"}}>
                                        <div className="button-default unselectable" onClick={this.pay}>Пополнить</div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-default-pre" style={{fontSize: "12px", background: "red", color: "#fff"}}>
                                На платежном шлюзе ведутся тех. работы. Попробуйте позже.
                            </div>
                            <div className="block-default-pre" style={{fontSize: "12px", background: "#f2e4a8"}}>
                                Мы не храним данные ваших банковских карт.
                            </div>
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

export default Wallet;
