import React, {Component} from "react";
import target from "../icon/target.png"
import { Dropdown, Menu } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'

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
                                    <Menu>
                                        <Dropdown text={store.user.login} pointing className='link item'>
                                            <Dropdown.Menu>
                                                {
                                                    store.user === "execute" ?
                                                        <Dropdown.Item onClick={()=>{window.location.href = '/user'}}>Задания</Dropdown.Item>
                                                    :
                                                        <Dropdown.Item onClick={()=>{window.location.href = '/user'}}>Рекламные кампании</Dropdown.Item>

                                                }
                                                <Dropdown.Item>Настройки</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item>Выйти</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu>
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
