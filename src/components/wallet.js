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
                <div className="block-default-pre">
                    <div className="block-default-pre">
                        <div className="wrapper-input">
                            <input className="input-default" type="text" placeholder="Введите сумму в рублях" />
                        </div>
                        <div className="sing-wrapper">
                            <div className="button-sign blue unselectable">Пополнить</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Wallet;
