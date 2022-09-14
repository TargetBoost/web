import React, {Component} from "react";
import target from "../icon/target.png"

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: props.auth,
            isLoad: props.load,
            targetAction: "sign-in",
            isAuthOpen: false,
        }
    }



    render() {
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
                            this.state.isLoad ?

                                this.state.isAuth ?
                                    <div className="button-text">AndreySHSH</div>
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
