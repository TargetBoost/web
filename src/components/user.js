import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import telegram from "../icon/telegram.png"
import Select from 'react-select';
import 'react-input-range/lib/css/index.css';

class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            executor: "all",
            targets: [],
            optionsTypeTarget: [
                { value: 'vk', label: 'VK' },
                { value: 'tg', label: 'Telegram' },
                { value: 'yt', label: 'Youtube' },

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
        let store = this.state.store.getState()

        if (store.user.execute === true) {
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
                });
        }else{
            fetch(`/core/v1/service/target`, {
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
                });
        }
    }

    createTarget = () => {
        let data = {
            icon: this.state.select,
            total: Number(this.state.total),
            cost: this.state.cost,
            type: this.state.type,
            link: this.state.link
        }

        fetch(`/core/v1/service/target`, {
            method: "POST",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    window.location.reload()
                }else{
                    this.state.store.dispatch({
                        type: "set_error", value: res.status.message,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleChange = (selectedOption) => {
        this.setState({ select: selectedOption.value});
    };

    handleChangeDeep = (selectedOption) => {
        this.setState({ cost: selectedOption.cost, type: selectedOption.value});
    };

    handleChangeCount = (e) => {
        this.setState({fullPrice: e.target.value * this.state.cost, total: Number(e.target.value)})
    };

    handleChangeLink = (e) => {
        this.setState({link: e.target.value})
    };


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
                                    <>
                                        <div className="navigation-preview">
                                            <div className="flex-left-right">
                                                <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Задания</div>
                                                <div className="button-light active-white" target="history" onClick={this.swapButtonTask}>История заданий</div>

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
                                                            filterTarget(this.state.targets, "active").length > 0 ?
                                                                filterTarget(this.state.targets, "active").map(t =>
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
                                                                            <div className="button-default">Проверить</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                :
                                                                <div className="alert">
                                                                    Активных задач нет
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
                                                                    null
                                        }

                                    </>
                                :
                                    <>
                                        <div className="navigation-preview">
                                            <div className="flex-left-right">
                                                <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Активные</div>
                                                <div className="button-light" target="end" onClick={this.swapButtonTask}>Завершенные</div>
                                                <div className="button-light" target="check" onClick={this.swapButtonTask}>На проверке</div>
                                                <div className="button-light" target="rejection" onClick={this.swapButtonTask}>Отклоненные</div>
                                                <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>

                                            </div>
                                            <div className="flex-left-right">
                                                <div className="button-light" target="create" onClick={this.swapButtonTask}>Создать рекламную кампанию</div>
                                            </div>
                                        </div>
                                        {
                                            this.state.executor === "all" ?
                                                <div className="block-default-pre">
                                                    <div className="task-wall">
                                                        {
                                                            filterTarget(this.state.targets, "active").length > 0 ?
                                                                filterTarget(this.state.targets, "active").map(t =>
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
                                                                        <div className="task-item-value">{t.count}/{t.total}</div>
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
                                                                            <div className="button-default">Завершить</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            :
                                                                <div className="alert">
                                                                    Активных кампаний нет
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                this.state.executor === "end" ?
                                                    <div className="block-default-pre">
                                                        <div className="task-wall">
                                                            {
                                                                filterTarget(this.state.targets, "end").length > 0 ?
                                                                    filterTarget(this.state.targets, "end").map(t =>


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
                                                                                <div className="task-item-value">{t.count}/{t.total}</div>
                                                                                <div className="task-item-value">Завершена</div>
                                                                                <div className="task-item-value">
                                                                                    <div className="button-default">Изменить</div>
                                                                                </div>
                                                                            </div>

                                                                    )
                                                                    :
                                                                    <div className="alert">
                                                                        Завершенных кампаний нет
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    this.state.executor === "check" ?
                                                        <div className="block-default-pre">
                                                            {
                                                                filterTarget(this.state.targets, "check").length > 0 ?
                                                                    filterTarget(this.state.targets, "check").map(t =>


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
                                                                            <div className="task-item-value">{t.count}/{t.total}</div>
                                                                            <div className="task-item-value">На проверке</div>
                                                                            <div className="task-item-value">
                                                                                <div className="button-default">Изменить</div>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                    :
                                                                    <div className="alert">
                                                                        Кампаний на проверке нет
                                                                    </div>
                                                            }
                                                        </div>
                                                        :
                                                        this.state.executor === "rejection" ?
                                                            <div className="block-default-pre">
                                                                {
                                                                    filterTarget(this.state.targets, "rejection").length > 0 ?
                                                                        filterTarget(this.state.targets, "rejection").map(t =>


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
                                                                                <div className="task-item-value">{t.count}/{t.total}</div>
                                                                                <div className="task-item-value red">
                                                                                    Причина внутри
                                                                                </div>
                                                                                <div className="task-item-value">
                                                                                    <div className="button-default">Изменить</div>
                                                                                </div>
                                                                            </div>

                                                                        )
                                                                        :
                                                                        <div className="alert">
                                                                            Отклоненных кампаний пока нет
                                                                        </div>
                                                                }
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
                                                                        <div className="task-item">Настройки платформы</div>
                                                                        <div className="settings">

                                                                        </div>
                                                                    </div>
                                                                :
                                                                    this.state.executor === "create" ?
                                                                        <div className="block-default-pre">
                                                                            {/*<div className="task-item">Настройки платформы</div>*/}
                                                                            <div className="settings">
                                                                                <div className="wrapper-input">
                                                                                    <div className="title-pop-up">Данные кампании</div>
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <Select
                                                                                        placeholder="Рекламной кампании"
                                                                                        onChange={this.handleChange}
                                                                                        options={this.state.optionsTypeTarget}
                                                                                    />
                                                                                </div>
                                                                                {
                                                                                    this.state.select !== null ?
                                                                                        <>
                                                                                            <div className="wrapper-input">
                                                                                                <Select
                                                                                                    placeholder="Цель рекламной кампании"
                                                                                                    onChange={this.handleChangeDeep}
                                                                                                    options={this.state.optionsDeepTarget[this.state.select]}
                                                                                                />
                                                                                            </div>
                                                                                            {
                                                                                                this.state.cost !== null ?
                                                                                                    <>
                                                                                                        <div className="wrapper-input">
                                                                                                            <input className="input-default" type="number" placeholder="Количество" onChange={this.handleChangeCount}/>
                                                                                                        </div>
                                                                                                        <div className="wrapper-input color-blue">
                                                                                                            Стоимость: { (Number(this.state.fullPrice)).toLocaleString('ru') } руб.
                                                                                                        </div>
                                                                                                    </>
                                                                                                :
                                                                                                    null
                                                                                            }
                                                                                            {
                                                                                                this.state.fullPrice !== 0 ?
                                                                                                    <div className="wrapper-input">
                                                                                                        <input className="input-default" type="text" placeholder="Ссылка на цель" onChange={this.handleChangeLink}/>
                                                                                                    </div>
                                                                                                :
                                                                                                    null
                                                                                            }
                                                                                        </>
                                                                                    :
                                                                                        null

                                                                                }

                                                                                {
                                                                                    this.state.link !== "" ?
                                                                                        <div className="sing-wrapper">
                                                                                            <div onClick={this.createTarget} className="button-any blue unselectable" >GO 👍</div>
                                                                                        </div>
                                                                                    :
                                                                                        <div className="sing-wrapper">
                                                                                            <div className="button-any grey unselectable" >Еще не все...</div>
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        null

                                        }
                                        <div className="block-default-pre" style={{fontSize: "12px", background: "#f2e4a8"}}>
                                            Созданные рекламные кампании запустятся после того как их проверят наши администраторы, в течении 1-3 часов.
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

export default User;
