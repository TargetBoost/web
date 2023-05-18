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
                                        <Dropdown text={store.user.login} floating labeled button className='icon'>
                                            <Dropdown.Menu>
                                                <Dropdown.Header>Ваш баланс: { store.user.balance } ₽</Dropdown.Header>
                                                {
                                                    store.user.execute === true ?
                                                        <Dropdown.Item onClick={()=>{window.location.href = '/tasks'}}>Ваши задания</Dropdown.Item>
                                                    :
                                                        <Dropdown.Item onClick={()=>{window.location.href = '/targets'}}>Рекламные кампании</Dropdown.Item>

                                                }
                                                {
                                                    store.user.execute === true ?
                                                        <Dropdown.Item>Заявка на вывод средств</Dropdown.Item>
                                                        :
                                                        <Dropdown.Item >Пополнить баланс</Dropdown.Item>

                                                }
                                                <Dropdown.Item>Настройки профиля</Dropdown.Item>
                                                {
                                                    store.user.admin === true ?
                                                        <>
                                                            <Dropdown.Divider />
                                                            <Dropdown.Item onClick={()=>{window.location.href = '/admin'}}>Панель Администратора</Dropdown.Item>
                                                        </>
                                                    :
                                                        null

                                                }
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={()=>{
                                                    window.localStorage.removeItem('token')
                                                    window.location.href = '/login'
                                                }}>Выйти</Dropdown.Item>
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
