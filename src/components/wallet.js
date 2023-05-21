import React, {Component} from "react";
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

    render() {
        let store = this.state.store.getState()
        return (
            <>
                {
                    store.user.load === false ?
                        <>
                            <div className="block-default-pre">
                                <h2>Пополнение баланса</h2>
                                <h3>Ваш баланс: { store.user.balance } ₽</h3>
                            </div>
                            <div className="block-default-pre">
                                <div className="preview-inside-block">
                                    <p>
                                        Введите сумму пополнения, после нажмите пополнить. <br/>
                                        Вы перейдете на страницу платежного шлюза и введете данные вашей карты.
                                    </p>
                                </div>
                                <div style={{width: "250px"}}>
                                    <div className="wrapper-input">
                                        <input className="input-default" type="text" placeholder="Введите сумму в рублях" />
                                    </div>
                                    <div style={{padding: "10px", width: "100px"}}>
                                        <div className="button-default unselectable">Пополнить</div>
                                    </div>
                                </div>
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
