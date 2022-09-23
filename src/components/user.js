import React, {Component} from "react";
import vk from "../icon/vk.png";

class User extends Component{
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
                                                            <div className="task-item-value">
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
                                                            <div className="task-item-value">
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
                                                            <div className="task-item-value">
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
                                                                <div className="task-item-value">
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
                                                                null



                                        }

                                    </>
                                :
                                    <>
                                        <div className="navigation-preview">
                                            <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Все кампании</div>
                                            <div className="button-light" target="end" onClick={this.swapButtonTask}>Завершенные кампании</div>
                                            <div className="button-light" target="rejected" onClick={this.swapButtonTask}>Отклоненные кампании</div>
                                            <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>
                                        </div>
                                        {
                                            this.state.executor === "all" ?
                                                <div className="block-default-pre">
                                                    <div className="task-wall">
                                                        <div className="task-item">
                                                            <div className="task-item-value">
                                                                <img className="icon-task-small" src={vk} alt="item"/>
                                                            </div>
                                                            <div className="task-item-value">Подписаться на сообщество VK</div>
                                                            <div className="task-item-value">29/100</div>
                                                            <div className="task-item-value underline click">Перейти к заданию</div>
                                                            <div className="task-item-value">
                                                                <div className="button-default">Проверить</div>
                                                            </div>
                                                        </div>
                                                        <div className="task-item">
                                                            <div className="task-item-value">
                                                                <img className="icon-task-small" src={vk} alt="item"/>
                                                            </div>
                                                            <div className="task-item-value">Подписаться на сообщество VK</div>
                                                            <div className="task-item-value">19/100</div>
                                                            <div className="task-item-value underline click">Перейти к заданию</div>
                                                            <div className="task-item-value">
                                                                <div className="button-default">Проверить</div>
                                                            </div>
                                                        </div>
                                                        <div className="task-item">
                                                            <div className="task-item-value">
                                                                <img className="icon-task-small" src={vk} alt="item"/>
                                                            </div>
                                                            <div className="task-item-value">Подписаться на сообщество VK</div>
                                                            <div className="task-item-value">29/30</div>
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
                                                                <div className="task-item-value">
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
                                                                    Кампаний нет
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        this.state.executor === "shortcomings" ?
                                                            <div className="block-default-pre">
                                                                <div className="task-wall">
                                                                    <div className="alert">
                                                                        Кампаний нет
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
