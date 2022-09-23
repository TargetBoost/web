import React, {Component} from "react";
import vk from "../icon/vk.png";

class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                {
                    store.user.load === false ?
                        store.user.auth === false ?
                            <div className="wrapper-error">
                                <div className="error">Страница только для авторизованных пользователей</div>
                                <div className="error small-text">
                                     <div style={{textDecoration: "underline", cursor: "pointer"}}
                                    onClick={() => {window.location.href = '/'}}>На главную</div>
                                </div>
                            </div>
                            :
                                store.user.execute === true ?
                                    <div className="block-default-pre">
                                        <div className="title-block">Ваши задания</div>
                                        <div className="navigation-preview">

                                        </div>
                                    </div>
                                    :
                                    <div>рекл</div>

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

export default User;
