import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import telegram from "../icon/telegram.png"
import Select from 'react-select';
import 'react-input-range/lib/css/index.css';

class Tasks extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            executor: "all",
            targets: [],
            optionsTypeTarget: [
                // { value: 'vk', label: 'VK' },
                { value: 'tg', label: 'Telegram' },
                // { value: 'yt', label: 'Youtube' },

            ],
            optionsDeepTarget: {
                vk: [
                    { value: 'vk_community', cost: 2, label: 'Вступить в сообщество' },
                    { value: 'vk_like', cost: 1, label: 'Поставить лайк на запись' },
                    { value: 'vk_add_friends', cost: 2, label: 'Добавить в друзья' },
                ],
                tg: [
                    { value: 'tg_community', cost: 2, label: 'Подписаться на канал' },
                ],
                yt: [
                    { value: 'yt_chanel', cost: 2, label: 'Подписаться на канал' },
                    { value: 'yt_watch', cost: 1, label: 'Посмотреть видео' },
                    { value: 'yt_like', cost: 1, label: 'Поставить лайк'},
                    { value: 'yt_dislike', cost: 2, label: 'Поставить дизлайк' },
                ]
            },

            select: null,
            cost: null,
            total: 0,
            fullPrice: 0,
            type: null,
            link: "",
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    swapButtonTask = (e) => {

        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = document.getElementsByClassName("button-light")

        for (let i=0; i !== childrenCollection.length; i++) {
            childrenCollection[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    componentDidMount() {
        fetch(`/core/v1/service/executor/target`, {
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

    checkSub = (e) => {
        let data = {
            id: parseInt(e.target.getAttribute("target")),
            status: 0,
        }

        fetch(`/core/v1/service/check_target`, {
            method: "POST",
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
                        type: "set_info", value: `Задача выполнена`,
                    })
                }
            })
            .catch(error => {
                this.state.store.dispatch({
                    type: "set_error", value: error,
                })
            });
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

        return (
            <>
                {
                    store.user.load === false ?
                        store.user.auth === false || store.user.execute === false || store.user.block === true  ?
                            store.user.block === true ?
                                <div className="wrapper-error">
                                    <div className="error">Ваш профиль был заблокирован по решению Администрации сайта.</div>
                                    <div className="error small-text">Причина: {store.user.cause}</div>
                                    <br/>
                                    <div className="error small-text">
                                        <div style={{textDecoration: "underline", cursor: "pointer"}}
                                             onClick={() => {window.location.href = '/'}}>На главную</div>
                                    </div>
                                </div>
                                :
                                <div className="wrapper-error">
                                    <div className="error">У Вас нет доступа к этой странице</div>
                                    <br/>
                                    <div className="error small-text">
                                        <div style={{textDecoration: "underline", cursor: "pointer"}}
                                             onClick={() => {window.location.href = '/'}}>На главную</div>
                                    </div>
                                </div>
                            :
                                <>
                                    <div className="navigation-preview">
                                        <div className="flex-left-right">
                                            <div className="unselectable button-light active-white" target="all" onClick={this.swapButtonTask}>Задания</div>
                                            <div className="unselectable button-light" target="history" onClick={this.swapButtonTask}>История заданий</div>

                                            {/*<div className="button-light" target="end" onClick={this.swapButtonTask}>Выполненные</div>*/}
                                            {/*<div className="button-light" target="rejected" onClick={this.swapButtonTask}>Отклоненные</div>*/}
                                            {/*<div className="button-light" target="shortcomings" onClick={this.swapButtonTask}>Недочеты</div>*/}
                                            {/*<div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>*/}
                                        </div>
                                    </div>
                                    {
                                        this.state.executor === "all" ?
                                            <div className="block-default-pre">
                                                <div className="task-wall">
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
                                                                    <div className="task-item-value">{t.cost}₽</div>
                                                                    <div className="task-item-value underline click"><a target="_blank" href={t.link} >Перейти к заданию</a></div>
                                                                    <div className="task-item-value">
                                                                        <div className="button-default" target={t.id} onClick={this.checkSub}>Проверить</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            <div className="alert">
                                                                Доступный заданий пока нет
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        :
                                            this.state.executor === "end" ?
                                                <div className="block-default-pre">
                                                    <div className="task-wall">
                                                        <div className="task-item">
                                                            <div className="task-item-value task-item-icon-box">
                                                                <img className="icon-task-small" src={vk} alt="item"/>
                                                            </div>
                                                            <div className="task-item-value">Подписаться на сообщество VK</div>
                                                            <div className="task-item-value">0.50 коп</div>
                                                            <div className="task-item-value underline click">Перейти к заданию</div>
                                                            <div className="task-item-value">
                                                                <div className="button-default">Проверить</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                                this.state.executor === "rejected" ?
                                                    <div className="block-default-pre">
                                                        <div className="task-wall">
                                                            <div className="alert">
                                                                Заданий нет
                                                            </div>
                                                        </div>
                                                    </div>
                                                :
                                                    this.state.executor === "shortcomings" ?
                                                        <div className="block-default-pre">
                                                            <div className="task-wall">
                                                                <div className="alert">
                                                                    Заданий нет
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :
                                                        this.state.executor === "settings" ?
                                                            <div className="block-default-pre">
                                                                <div className="settings">

                                                                </div>
                                                            </div>
                                                        :
                                                            this.state.executor === "admin" ?
                                                                <div className="block-default-pre">
                                                                    <div className="settings">

                                                                    </div>
                                                                </div>
                                                            :
                                                                this.state.executor === "admin" ?
                                                                    <div className="block-default-pre">
                                                                        <div className="task-wall">

                                                                        </div>
                                                                    </div>
                                                                    :
                                                                        null
                                    }
                                    <div className="block-default-pre" style={{fontSize: "13px", background: "#f2e4a8"}}>
                                        Напишите нашему боту (<a href="https://t.me/targetBoostBot" target="_blank" className="underline">@targetBoostBot</a>) в телеграм, что бы начать выполнять задания.
                                    </div>
                                    <div className="block-default-pre" style={{fontSize: "12px", background: "#f2e4a8"}}>
                                        Не обновляйте страницу, задания будут появлятся автоматически.
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

export default Tasks;
