import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {FormGroup} from "@mui/material";



class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type,
            executor: "all"
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    swapButtonTask = (e) => {

        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = e.target.parentNode.children

        for (let i=0; i !== childrenCollection.length; i++) {
            e.target.parentNode.children[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    updateSettings = (e) => {
        let target = e.target.getAttribute("name")
        let store = this.state.store.getState()


        if (target === "snow") {
            this.state.store.dispatch({
                type: "set_settings", value: {
                    snow: !store.settings.snow,
                },
            })
        }

        if (target === "rain") {
            this.state.store.dispatch({
                type: "set_settings", value: {
                    rain: !store.settings.rain,
                },
            })
        }

        let data = {
            snow: store.settings.snow,
            rain: store.settings.rain
        }

        fetch(`/core/v1/system/settings`, {
            method: "POST",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    console.log("success")
                }else{
                    console.error("error", res.status.message)
                }

            })
            .catch(error => {
                console.error(error)
            });
    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                {
                    store.user.load === false ?
                        store.user.admin === false ?
                            <div className="wrapper-error">
                                <div className="error">Страница только для авторизованных пользователей</div>
                                <div className="error small-text">
                                     <div style={{textDecoration: "underline", cursor: "pointer"}}
                                    onClick={() => {window.location.href = '/'}}>На главную</div>
                                </div>
                            </div>
                            :
                                <>
                                    <div className="navigation-preview">
                                        <div className="flex-left-right">
                                            <div className="button-light active-white" target="с" onClick={this.swapButtonTask}>Кампании</div>
                                            <div className="button-light" target="end" onClick={this.swapButtonTask}>Пользователи</div>
                                            <div className="button-light" target="rejected" onClick={this.swapButtonTask}>Бан-лист</div>
                                            <div className="button-light" target="shortcomings" onClick={this.swapButtonTask}>Заявки на выплаты</div>
                                            <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>
                                        </div>
                                    </div>
                                    {
                                        this.state.executor === "с" ?
                                            <div className="block-default-pre">
                                                <div className="task-wall">
                                                    <div className="alert">
                                                        Пока ничего нет
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                            this.state.executor === "end" ?
                                                <div className="block-default-pre">
                                                    <div className="task-wall">
                                                        <div className="alert">
                                                            Пока ничего нет
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                                this.state.executor === "rejected" ?
                                                    <div className="block-default-pre">
                                                        <div className="task-wall">
                                                            <div className="alert">
                                                                Пока ничего нет
                                                            </div>
                                                        </div>
                                                    </div>
                                                :
                                                    this.state.executor === "shortcomings" ?
                                                        <div className="block-default-pre">
                                                            <div className="task-wall">
                                                                <div className="alert">
                                                                    Пока ничего нет
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :
                                                        this.state.executor === "settings" ?
                                                            <div className="block-default-pre">
                                                                <div className="settings">
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Switch checked={store.settings.snow} target="snow" onChange={this.updateSettings} name="snow" />
                                                                            }
                                                                            label="Снег"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Switch checked={store.settings.rain} target="rain" onChange={this.updateSettings} name="rain" />
                                                                            }
                                                                            label="Дождь"
                                                                            disabled
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                        :
                                                            null
                                    }
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

export default Admin;
