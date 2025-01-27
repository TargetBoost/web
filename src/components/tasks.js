import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import telegram from "../icon/telegram.png"
import update from "../icon/update.png";

// import Select from 'react-select';
import 'react-input-range/lib/css/index.css';
import noImg from "../icon/no_img.png";

class Tasks extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            updateNow: false,
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

        this.state.store.dispatch({
            type: "set_page", value: "lk",
        })
    }

    checkSub = (e) => {
        let data = {
            id: parseInt(e.target.getAttribute("target")),
            tid: parseInt(e.target.getAttribute("id")),
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
                        type: "set_error", value: "Мы не смогли проверить выполнения задания, попробуйте еще раз.",
                    })

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
                }else{
                    if (res.data) {
                        this.state.store.dispatch({
                            type: "set_info", value: `Задача выполнена`,
                        })

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
                    }else{
                        this.state.store.dispatch({
                            type: "set_error", value: `Вы не подписались`,
                        })
                    }

                }
            })
            .catch(error => {
                this.state.store.dispatch({
                    type: "set_error", value: error,
                })
            });
    }

    update = (e) => {
        this.setState({"updateNow": true})
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
                this.setState({"updateNow": false})
            })
            .catch(error => {
                console.log(error)
                this.setState({"updateNow": false})
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
                                <div className="wrapper-error" >
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
                                        <div className="flex-left-right">

                                            {
                                                this.state.updateNow ?
                                                    <div className="unselectable button-light" style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        background: "#fff",
                                                        width: "115px"
                                                    }}>
                                                        <div className="loader-small" style={{width: "15px", height: "15px"}}/>
                                                    </div>
                                                :
                                                    <div className="unselectable button-light" onClick={this.update} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        background: "#fff",
                                                        width: "115px"
                                                    }}>
                                                        <img className="icon-task-small" src={update} alt="item" style={{maxWidth: "15px", cursor: "pointer", paddingRight: "3px"}}/>
                                                        Обновить
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    {/*{*/}
                                    {/*    this.state.executor === "all" ?*/}
                                    {/*        <div className="block-default-pre">*/}
                                    {/*            <div className="task-wall">*/}
                                    {/*                {*/}
                                    {/*                    filterTarget(this.state.targets, 1).length > 0 ?*/}
                                    {/*                        filterTarget(this.state.targets, 1).map(t =>*/}
                                    {/*                            <div className="task-item-wrapper">*/}
                                    {/*                                <div className="task-item">*/}
                                    {/*                                    <div className="task-item-value task-item-icon-box">*/}
                                    {/*                                        {*/}
                                    {/*                                            t.icon === "vk" ?*/}
                                    {/*                                                <img className="icon-task-small" src={vk} alt="item"/>*/}
                                    {/*                                                :*/}
                                    {/*                                                t.icon === "yt" ?*/}
                                    {/*                                                    <img className="icon-task-small" src={youtube} alt="item"/>*/}
                                    {/*                                                    :*/}
                                    {/*                                                    t.icon === "tg" ?*/}
                                    {/*                                                        <img className="icon-task-small" src={telegram} alt="item"/>*/}
                                    {/*                                                        :*/}
                                    {/*                                                        null*/}
                                    {/*                                        }*/}

                                    {/*                                    </div>*/}
                                    {/*                                    <div className="task-item-value">{t.title}</div>*/}
                                    {/*                                    <div className="task-item-value">{t.cost}₽</div>*/}
                                    {/*                                    <div className="task-item-value underline click"><a target="_blank" rel="noreferrer" href={t.link} >Перейти к заданию</a></div>*/}
                                    {/*                                    <div className="task-item-value">*/}
                                    {/*                                        <div className="button-default" target={t.id} id={t.tid} onClick={this.checkSub}>Проверить</div>*/}
                                    {/*                                    </div>*/}
                                    {/*                                </div>*/}
                                    {/*                                <div className="info-task-wrapper">*/}
                                    {/*                                    <div className="image-wrapper-bio">*/}
                                    {/*                                        <div className="wrapper-image-icon">*/}
                                    {/*                                            {*/}
                                    {/*                                                t.cm_file_id !== "" ?*/}
                                    {/*                                                    <img className="img-channel" src={`/core/v1/file_ch/${t.photo_link}`} alt={"img"}/>*/}
                                    {/*                                                    :*/}
                                    {/*                                                    <img className="img-channel" src={noImg} alt={"img"}/>*/}

                                    {/*                                            }*/}
                                    {/*                                        </div>*/}
                                    {/*                                        <div className="info-company-bio">*/}
                                    {/*                                            <div className="title-block" style={{fontWeight: "bold"}}>*/}
                                    {/*                                                <a href={t.link} target={"_blank"} rel="noreferrer">*/}
                                    {/*                                                    {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>*/}
                                    {/*                                                </a>*/}
                                    {/*                                            </div>*/}
                                    {/*                                            <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>*/}
                                    {/*                                        </div>*/}
                                    {/*                                    </div>*/}

                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        )*/}
                                    {/*                        :*/}
                                    {/*                        <div className="alert">*/}
                                    {/*                            Доступных заданий пока нет*/}
                                    {/*                        </div>*/}
                                    {/*                }*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    :*/}
                                    {/*        this.state.executor === "history" ?*/}
                                    {/*            <div className="block-default-pre">*/}
                                    {/*                <div className="task-wall">*/}
                                    {/*                {*/}
                                    {/*                    filterTarget(this.state.targets, 3).length > 0 ?*/}
                                    {/*                        filterTarget(this.state.targets, 3).map(t =>*/}
                                    {/*                            <div className="task-item-wrapper">*/}
                                    {/*                                <div className="task-item">*/}
                                    {/*                                <div className="task-item-value task-item-icon-box">*/}
                                    {/*                                    {*/}
                                    {/*                                        t.icon === "vk" ?*/}
                                    {/*                                            <img className="icon-task-small" src={vk} alt="item"/>*/}
                                    {/*                                            :*/}
                                    {/*                                            t.icon === "yt" ?*/}
                                    {/*                                                <img className="icon-task-small" src={youtube} alt="item"/>*/}
                                    {/*                                                :*/}
                                    {/*                                                t.icon === "tg" ?*/}
                                    {/*                                                    <img className="icon-task-small" src={telegram} alt="item"/>*/}
                                    {/*                                                    :*/}
                                    {/*                                                    null*/}
                                    {/*                                    }*/}

                                    {/*                                </div>*/}
                                    {/*                                <div className="task-item-value">{t.title}</div>*/}
                                    {/*                                <div className="task-item-value">{t.cost}₽</div>*/}
                                    {/*                                <div className="task-item-value underline click"><a target="_blank"  rel="noreferrer" href={t.link} >Перейти к заданию</a></div>*/}
                                    {/*                                <div className="task-item-value">*/}
                                    {/*                                    <div className="button-default grey">Выполнено</div>*/}
                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                                <div className="info-task-wrapper">*/}
                                    {/*                                    <div className="image-wrapper-bio">*/}
                                    {/*                                        <div className="wrapper-image-icon">*/}
                                    {/*                                            {*/}
                                    {/*                                                t.cm_file_id !== "" ?*/}
                                    {/*                                                    <img className="img-channel" src={`/core/v1/file_ch/${t.photo_link}`} alt={"img"}/>*/}
                                    {/*                                                    :*/}
                                    {/*                                                    <img className="img-channel" src={noImg} alt={"img"}/>*/}

                                    {/*                                            }*/}
                                    {/*                                        </div>*/}
                                    {/*                                        <div className="info-company-bio">*/}
                                    {/*                                            <div className="title-block" style={{fontWeight: "bold"}}>*/}
                                    {/*                                                <a href={t.link} target={"_blank"} rel="noreferrer">*/}
                                    {/*                                                    {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>*/}
                                    {/*                                                </a>*/}
                                    {/*                                            </div>*/}
                                    {/*                                            <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>*/}
                                    {/*                                        </div>*/}
                                    {/*                                    </div>*/}

                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        )*/}
                                    {/*                        :*/}
                                    {/*                        <div className="alert">*/}
                                    {/*                            Вы еще не выполнили ни одного задания*/}
                                    {/*                        </div>*/}
                                    {/*                }*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        :*/}
                                    {/*            this.state.executor === "rejected" ?*/}
                                    {/*                <div className="block-default-pre">*/}
                                    {/*                    <div className="task-wall">*/}
                                    {/*                        <div className="alert">*/}
                                    {/*                            Заданий нет*/}
                                    {/*                        </div>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            :*/}
                                    {/*                this.state.executor === "shortcomings" ?*/}
                                    {/*                    <div className="block-default-pre">*/}
                                    {/*                        <div className="task-wall">*/}
                                    {/*                            <div className="alert">*/}
                                    {/*                                Заданий нет*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                    </div>*/}
                                    {/*                :*/}
                                    {/*                    this.state.executor === "settings" ?*/}
                                    {/*                        <div className="block-default-pre">*/}
                                    {/*                            <div className="settings">*/}

                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                    :*/}
                                    {/*                        this.state.executor === "admin" ?*/}
                                    {/*                            <div className="block-default-pre">*/}
                                    {/*                                <div className="settings">*/}

                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        :*/}
                                    {/*                            this.state.executor === "admin" ?*/}
                                    {/*                                <div className="block-default-pre">*/}
                                    {/*                                    <div className="task-wall">*/}

                                    {/*                                    </div>*/}
                                    {/*                                </div>*/}
                                    {/*                                :*/}
                                    {/*                                    null*/}
                                    {/*}*/}
                                    <div className="block-default-pre">
                                        <div className="alert">
                                            Скоро мы запустим бета-тестирование, следите за нашим <a href="/blog"> блогом</a>
                                        </div>
                                    </div>
                                    {/*<div className="block-default-pre" style={{fontSize: "13px", background: "#f2e4a8"}}>*/}
                                    {/*    Напишите нашему боту (<a href="https://t.me/targetBoostBot" target="_blank" rel="noreferrer" className="underline">@targetBoostBot</a>) в телеграм, чтобы начать выполнять задания.*/}
                                    {/*</div>*/}
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
