import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"

class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type,
            executor: "all",
            targets: [],
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

    componentDidMount() {
        // let store = this.state.store.getState()

        fetch(`/core/v1/service/target`, {
            method: "GET",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    console.log(res)
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
                                    <>
                                        <div className="navigation-preview">
                                            <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Доступные</div>
                                            <div className="button-light" target="end" onClick={this.swapButtonTask}>Выполненные</div>
                                            <div className="button-light" target="rejected" onClick={this.swapButtonTask}>Отклоненные</div>
                                            <div className="button-light" target="shortcomings" onClick={this.swapButtonTask}>Недочеты</div>
                                            <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>
                                        </div>
                                        {
                                            this.state.executor === "all" ?
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
                                                        <div className="task-item">
                                                            <div className="task-item-value task-item-icon-box">
                                                                <img className="icon-task-small" src={youtube} alt="item"/>
                                                            </div>
                                                            <div className="task-item-value">Подписаться на канал Youtube</div>
                                                            <div className="task-item-value">0.50 коп</div>
                                                            <div className="task-item-value underline click">Перейти к заданию</div>
                                                            <div className="task-item-value">
                                                                <div className="button-default">Проверить</div>
                                                            </div>
                                                        </div>
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
                                                <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Кампании</div>
                                                <div className="button-light" target="end" onClick={this.swapButtonTask}>Завершенные кампании</div>
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
                                                            this.state.targets.length > 0 ?
                                                                this.state.targets.map(t =>
                                                                    <div className="task-item">
                                                                        <div className="task-item-value task-item-icon-box">
                                                                            {
                                                                                t.icon === "vk" ?
                                                                                    <img className="icon-task-small" src={vk} alt="item"/>
                                                                                :
                                                                                    null
                                                                            }

                                                                        </div>
                                                                        <div className="task-item-value">{t.title}</div>
                                                                        <div className="task-item-value">29/{t.count}</div>
                                                                        {
                                                                            t.status === "check" ?
                                                                                <div className="task-item-value">На проверке</div>
                                                                            :
                                                                                null
                                                                        }
                                                                        <div className="task-item-value underline click">Статистка</div>
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
                                                                this.state.targets.length > 0 ?
                                                                    this.state.targets.map(t =>
                                                                        t.status === "end" ?


                                                                            <div className="task-item">
                                                                                <div className="task-item-value task-item-icon-box">
                                                                                    {
                                                                                        t.icon === "vk" ?
                                                                                            <img className="icon-task-small" src={vk} alt="item"/>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                </div>
                                                                                <div className="task-item-value">{t.title}</div>
                                                                                <div className="task-item-value">29/{t.count}</div>
                                                                                <div className="task-item-value">Завершенная</div>
                                                                                <div className="task-item-value underline click">Статистка</div>
                                                                                <div className="task-item-value">
                                                                                    <div className="button-default">Начать снова</div>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            null
                                                                    )
                                                                    :
                                                                    <div className="alert">
                                                                        Активных кампаний нет
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    this.state.executor === "rejected" ?
                                                        <div className="block-default-pre">
                                                            {
                                                                this.state.targets.length > 0 ?
                                                                    this.state.targets.map(t =>
                                                                        t.status === "rejected" ?


                                                                            <div className="task-item">
                                                                                <div className="task-item-value task-item-icon-box">
                                                                                    {
                                                                                        t.icon === "vk" ?
                                                                                            <img className="icon-task-small" src={vk} alt="item"/>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                </div>
                                                                                <div className="task-item-value">{t.title}</div>
                                                                                <div className="task-item-value">29/{t.count}</div>
                                                                                <div className="task-item-value red">Отклоненная</div>
                                                                                <div className="task-item-value underline click">Статистка</div>
                                                                                <div className="task-item-value">
                                                                                    <div className="button-default">Отправить на проверку</div>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    )
                                                                    :
                                                                    <div className="alert">
                                                                        Активных кампаний нет
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

export default User;
