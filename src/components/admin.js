import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {FormGroup} from "@mui/material";
import telegram from "../icon/telegram.png";



class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type,
            executor: "ca"
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    componentDidMount() {
        fetch(`/core/v1/service/admin/target`, {
            method: "GET",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    this.setState({targets: res.data})
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

    swapButtonTask = (e) => {

        this.setState({executor: e.target.getAttribute("target")})

        let target = e.target.getAttribute("target")
        if (target === "ca"){
            fetch(`/core/v1/service/admin/target`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
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
        } else if (target === "users") {
            fetch(`/core/v1/service/users`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
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
        }else if (target === "caa") {
            fetch(`/core/v1/service/admin/target`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
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
        }else if (target === "caar") {
            fetch(`/core/v1/service/admin/target`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
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
        }else if (target === "block") {
            fetch(`/core/v1/service/users`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
                    } else {
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
        }else if (target === "withdrawal") {
            fetch(`/core/v1/service/task_cashes`, {
                method: "GET",
                headers: {
                    "Authorization": window.localStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status.message === null) {
                        this.setState({targets: res.data})
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

        let childrenCollection = e.target.parentNode.children

        for (let i=0; i !== childrenCollection.length; i++) {
            e.target.parentNode.children[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    updateTask = (e) => {
        let data = {
            id: parseInt(e.target.getAttribute("target")),
            status: parseInt(e.target.getAttribute("status"))
        }

        fetch(`/core/v1/service/admin/target`, {
            method: "PUT",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message !== null) {
                    this.state.store.dispatch({
                        type: "set_error", value: res.status.message,
                    })
                }else{
                    this.state.store.dispatch({
                        type: "set_info", value: `Кампания id:${data.id} переведена в новый статус`,
                    })

                    fetch(`/core/v1/service/admin/target`, {
                        method: "GET",
                        headers: {
                            "Authorization": window.localStorage.getItem("token")
                        }
                    })
                        .then(response => response.json())
                        .then(res => {
                            if (res.status.message === null) {
                                this.setState({targets: res.data})
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
            })
            .catch(error => {
                this.state.store.dispatch({
                    type: "set_error", value: error,
                })
            });
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
                if (res.status.message !== null) {
                    console.error("error", res.status.message)
                }
            })
            .catch(error => {
                console.error(error)
            });
    }

    copyText = (e) => {
        let link = e.target.getAttribute("link")
        navigator.clipboard.writeText(link)

        this.state.store.dispatch({
            type: "set_info", value: `Ссылка ${link} скопированна`,
        })
    }

    render() {
        let store = this.state.store.getState()

        function filterTarget(targets, f) {
            let target = []

            for (const property in targets) {
                if (targets[property].status === f) {
                    target.push(targets[property])
                }
            }

            return target
        }

        function filterUser(targets, f) {
            let target = []

            for (const property in targets) {
                if (targets[property].block === f) {
                    target.push(targets[property])
                }
            }

            return target
        }

        return (
            <>
                {
                    store.user.load === false ?
                        store.user.admin === false ?
                            <div className="wrapper-error">
                                <div className="error">У Вас нет доступа к этой странице</div>
                                <div className="error small-text">
                                     <div style={{textDecoration: "underline", cursor: "pointer"}}
                                    onClick={() => {window.location.href = '/'}}>На главную</div>
                                </div>
                            </div>
                            :
                                <>
                                    <div className="navigation-preview">
                                        <div className="flex-left-right">
                                            <div className="button-light active-white" target="ca" onClick={this.swapButtonTask}>Кампании на проверку</div>
                                            <div className="button-light" target="caar" onClick={this.swapButtonTask}>Отклоненные кампании</div>
                                            <div className="button-light" target="caa" onClick={this.swapButtonTask}>Активные кампании</div>
                                            <div className="button-light" target="users" onClick={this.swapButtonTask}>Пользователи</div>
                                            <div className="button-light" target="block" onClick={this.swapButtonTask}>Бан-лист</div>
                                            <div className="button-light" target="withdrawal" onClick={this.swapButtonTask}>Заявки на выплаты</div>
                                            <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>
                                        </div>
                                    </div>
                                    {
                                        this.state.executor === "ca" ?
                                            <div className="block-default-pre">
                                                {
                                                    filterTarget(this.state.targets, 0).length > 0 ?
                                                        filterTarget(this.state.targets, 0).map(t =>
                                                            <div className="task-item">
                                                                <div className="task-item-value task-item-icon-box">
                                                                    {
                                                                        t.icon === "vk" ?
                                                                            <img className="icon-task-small" src={vk} alt="item"/>
                                                                            :
                                                                            t.icon === "yt" ?
                                                                                <img className="icon-task-small" src={youtube} alt="item"/>
                                                                                :
                                                                                t.icon === "tg" ?
                                                                                    <img className="icon-task-small" src={telegram} alt="item"/>
                                                                                    :
                                                                                    null
                                                                    }

                                                                </div>
                                                                <div className="task-item-value">{t.title}</div>
                                                                <div className="task-item-value">login: { t.login }</div>
                                                                <div className="task-item-value">{t.count}/{t.total}</div>
                                                                <div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>
                                                                <div className="task-item-value underline click" link={t.link} onClick={this.copyText}>ссылка</div>
                                                                {
                                                                    t.status === "check" ?
                                                                        <div className="task-item-value orange">На проверке</div>
                                                                        :
                                                                        t.status === "end" ?
                                                                            <div className="task-item-value">Завершена</div>
                                                                            :
                                                                            t.status === "active" ?
                                                                                <div className="task-item-value green-color">Активна</div>
                                                                                :
                                                                                null

                                                                }
                                                                <div className="task-item-value">
                                                                    <div className="button-default red_bg" target={t.id} status="2" onClick={this.updateTask}>Отклонить</div>
                                                                    <div className="button-default" target={t.id} status="1" onClick={this.updateTask}>Запустить</div>
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        <div className="alert">
                                                            Кампаний на проверку нет.
                                                        </div>
                                                }
                                            </div>
                                        :
                                            this.state.executor === "caa" ?
                                                <div className="block-default-pre">
                                                    {
                                                        filterTarget(this.state.targets, 1).length > 0 ?
                                                            filterTarget(this.state.targets, 1).map(t =>
                                                                <div className="task-item">
                                                                    <div className="task-item-value task-item-icon-box">
                                                                        {
                                                                            t.icon === "vk" ?
                                                                                <img className="icon-task-small" src={vk} alt="item"/>
                                                                                :
                                                                                t.icon === "yt" ?
                                                                                    <img className="icon-task-small" src={youtube} alt="item"/>
                                                                                    :
                                                                                    t.icon === "tg" ?
                                                                                        <img className="icon-task-small" src={telegram} alt="item"/>
                                                                                        :
                                                                                        null
                                                                        }

                                                                    </div>
                                                                    <div className="task-item-value">{t.title}</div>
                                                                    <div className="task-item-value">login: { t.login }</div>
                                                                    <div className="task-item-value">{t.count}/{t.total}</div>
                                                                    <div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>
                                                                    <div className="task-item-value underline click" link={t.link} onClick={this.copyText}>ссылка</div>
                                                                    {
                                                                        t.status === "check" ?
                                                                            <div className="task-item-value orange">На проверке</div>
                                                                            :
                                                                            t.status === "end" ?
                                                                                <div className="task-item-value">Завершена</div>
                                                                                :
                                                                                t.status === "active" ?
                                                                                    <div className="task-item-value green-color">Активна</div>
                                                                                    :
                                                                                    null

                                                                    }
                                                                    <div className="task-item-value">
                                                                        <div className="button-default red_bg" target={t.id} status="2" onClick={this.updateTask}>Остановить</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            <div className="alert">
                                                                Кампаний на проверку нет.
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                this.state.executor === "caar" ?
                                                    <div className="block-default-pre">
                                                        {
                                                            filterTarget(this.state.targets, 2).length > 0 ?
                                                                filterTarget(this.state.targets, 2).map(t =>
                                                                    <div className="task-item">
                                                                        <div className="task-item-value task-item-icon-box">
                                                                            {
                                                                                t.icon === "vk" ?
                                                                                    <img className="icon-task-small" src={vk} alt="item"/>
                                                                                    :
                                                                                    t.icon === "yt" ?
                                                                                        <img className="icon-task-small" src={youtube} alt="item"/>
                                                                                        :
                                                                                        t.icon === "tg" ?
                                                                                            <img className="icon-task-small" src={telegram} alt="item"/>
                                                                                            :
                                                                                            null
                                                                            }

                                                                        </div>
                                                                        <div className="task-item-value">{t.title}</div>
                                                                        <div className="task-item-value">login: { t.login }</div>
                                                                        <div className="task-item-value">{t.count}/{t.total}</div>
                                                                        <div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>
                                                                        <div className="task-item-value underline click" link={t.link} onClick={this.copyText}>ссылка</div>
                                                                        {
                                                                            t.status === "check" ?
                                                                                <div className="task-item-value orange">На проверке</div>
                                                                                :
                                                                                t.status === "end" ?
                                                                                    <div className="task-item-value">Завершена</div>
                                                                                    :
                                                                                    t.status === "active" ?
                                                                                        <div className="task-item-value green-color">Активна</div>
                                                                                        :
                                                                                        null

                                                                        }
                                                                        <div className="task-item-value">
                                                                            <div className="button-default" target={t.id} status="1" onClick={this.updateTask}>Запустить</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                :
                                                                <div className="alert">
                                                                    Кампаний на проверку нет.
                                                                </div>
                                                        }
                                                    </div>
                                                    :
                                            this.state.executor === "users" ?
                                                <div className="block-default-pre">
                                                    {
                                                        filterUser(this.state.targets, false).length > 0 ?
                                                            filterUser(this.state.targets, false).map(t =>
                                                                <div className="task-item">
                                                                    <div className="task-item-value">ID: {t.id}</div>
                                                                    <div className="task-item-value">login: {t.login}</div>
                                                                    <div className="task-item-value">balance: {(parseInt(t.balance)).toLocaleString('ru') } ₽</div>
                                                                    <div className="task-item-value">admin: { t.admin }</div>

                                                                    {/*<div className="task-item-value">{t.count}/{t.total}</div>*/}
                                                                    {/*<div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>*/}
                                                                    <div className="task-item-value">
                                                                        <div className="button-default">Изменить</div>
                                                                        <div className="button-default red_bg">Заблокировать</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        :
                                                            <div className="alert">
                                                                Пользователей нет
                                                            </div>
                                                    }
                                                </div>
                                            :
                                                this.state.executor === "block" ?
                                                    <div className="block-default-pre">
                                                        <div className="block-default-pre">
                                                            {
                                                                filterUser(this.state.targets, true).length > 0 ?
                                                                    filterUser(this.state.targets, true).map(t =>
                                                                        <div className="task-item">
                                                                            <div className="task-item-value">ID: {t.id}</div>
                                                                            <div className="task-item-value">login: {t.login}</div>
                                                                            <div className="task-item-value">balance: {(parseInt(t.balance)).toLocaleString('ru') } ₽</div>
                                                                            {/*<div className="task-item-value">{t.count}/{t.total}</div>*/}
                                                                            {/*<div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>*/}
                                                                            <div className="task-item-value">
                                                                                <div className="button-default">Изменить</div>
                                                                                <div className="button-default green">Разблокировать</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    <div className="alert">
                                                                        Пользователей нет
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                :
                                                    this.state.executor === "withdrawal" ?
                                                        <div className="block-default-pre">
                                                            <div className="task-wall">
                                                                {
                                                                    this.state.targets.length > 0 ?
                                                                        this.state.targets.map(t =>
                                                                            <div className="task-item">
                                                                                <div className="task-item-value">ID: {t.id}</div>
                                                                                {
                                                                                    t.transaction_id === "" ?
                                                                                        <div className="task-item-value">Transaction ID: 0000000000</div>
                                                                                        :
                                                                                        <div className="task-item-value">Transaction ID: {t.transaction_id}</div>
                                                                                }
                                                                                <div className="task-item-value">{t.number}</div>
                                                                                <div className="task-item-value">{ (parseInt(t.total)).toLocaleString('ru') } ₽</div>
                                                                                {
                                                                                    t.status === 0 ?
                                                                                        <div className="task-item-value">
                                                                                            <div className="button-default">Выполнил</div>
                                                                                            <div className="button-default red_bg">Отклонить</div>
                                                                                        </div>
                                                                                        :
                                                                                            t.status === 2 ?
                                                                                                <div className="task-item-value">
                                                                                                    <div className="button-default grey">Выполнил</div>
                                                                                                    <div className="button-default grey">Отклонить</div>
                                                                                                </div>
                                                                                                :
                                                                                                t.status === 4 ?
                                                                                                    <div className="task-item-value">
                                                                                                        <div className="button-default grey">Выполнил</div>
                                                                                                        <div className="button-default grey">Отклонить</div>
                                                                                                    </div>
                                                                                                    :

                                                                                                         null
                                                                                }
                                                                            </div>
                                                                        )
                                                                        :
                                                                        <div className="alert">
                                                                            Вы еще не делали заявок на вывод баланса.
                                                                        </div>
                                                                }
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
