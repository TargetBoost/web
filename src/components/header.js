import React, {Component} from "react";
import target from "../icon/target.png"
import avatar from "../icon/avatar.png"

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: props.auth,
            store: this.props.store,
            targetAction: "sign-in",
            isAuthOpen: false,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }



    render() {
        let store = this.state.store.getState()
        return (
            <div className="header-bg">
                <div className="wrapper-header">
                    <div className="place-logo" onClick={(e) => {
                        e.preventDefault();
                        if (this.state.isAuth) {
                            window.location.href = '/user/'
                        } else {
                            window.location.href = '/'
                        }
                    }}>
                        <div className="wrapper-logo-img">
                            <img src={target} className="logo-img" alt="logo"/>
                        </div>
                        <div className="logo-text-t">Target Boost</div>
                    </div>
                    <div className="wrapper-auth">
                        {
                            store.user.load === false ?
                                store.user.auth ?
                                    <div onClick={()=>{window.location.href = `/user`}} >
                                        <img className="avatar-profile" src={avatar} alt="avatar"/>
                                    </div>
                                :
                                    <>
                                        <div className="button-default unselectable" onClick={()=>{window.location.href = "/login"}}>Войти</div>
                                        <div className="button-default unselectable" onClick={()=>{window.location.href = "/registration"}}>Регистрация</div>
                                    </>
                            :
                                <div className="loader-small"/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
