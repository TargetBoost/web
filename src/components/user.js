import React, {Component} from "react";
import vk from "../icon/vk.png";
import youtube from "../icon/youtube.png"
import {CitySelector, CountrySelector, StateSelector} from "volkeno-react-country-state-city";
import Select from 'react-select';

class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type,
            executor: "all",
            targets: [],
            optionsTypeTarget: [
                { value: 'vk', label: 'VK' },
                { value: 'tg', label: 'Telegram' },
                { value: 'yt', label: 'Youtube' },
            ],
            select: null
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    handleCountrySelect = (option) => {
        this.setState({country: option})
    }

    handleStateSelect = (option) => {
        this.setState({state: option})
    }

    handleCitySelect = (option) => {
        this.setState({city: option})
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

    handleChange = (selectedOption) => {
        this.setState({ select: selectedOption}, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

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
                                            <div className="flex-left-right">
                                                <div className="button-light active-white" target="all" onClick={this.swapButtonTask}>Доступные</div>
                                                <div className="button-light" target="end" onClick={this.swapButtonTask}>Выполненные</div>
                                                <div className="button-light" target="rejected" onClick={this.swapButtonTask}>Отклоненные</div>
                                                <div className="button-light" target="shortcomings" onClick={this.swapButtonTask}>Недочеты</div>
                                                <div className="button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>
                                            </div>
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
                                                                    this.state.executor === "create" ?
                                                                        <div className="block-default-pre">
                                                                            {/*<div className="task-item">Настройки платформы</div>*/}
                                                                            <div className="settings">
                                                                                <div className="wrapper-input">
                                                                                    <div className="title-pop-up">Данные кампании</div>
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <Select
                                                                                        placeholder="Цель рекламной кампании"
                                                                                        onChange={this.handleChange}
                                                                                        options={this.state.optionsTypeTarget}
                                                                                    />
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <input className="input-default" id="old" type="number" placeholder="Количество пользователей которых Вы хотите привлечь" max="99"/>
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <div className="title-pop-up">Региональные настройки</div>
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <CountrySelector
                                                                                        onChange={this.handleCountrySelect}
                                                                                        name='country'
                                                                                        placeholder='Выберите страну'
                                                                                        value={this.state.country}
                                                                                    />
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <StateSelector
                                                                                        country={this.state.country}
                                                                                        name='state'
                                                                                        value={this.state.state}
                                                                                        countryPlaceholder='Выберите регион'
                                                                                        onChange={this.handleStateSelect}
                                                                                    />
                                                                                </div>
                                                                                <div className="wrapper-input">
                                                                                    <CitySelector
                                                                                        state={this.state.state}
                                                                                        name='city'
                                                                                        value={this.state.city}
                                                                                        statePlaceholder='Выберите город'
                                                                                        onChange={this.handleCitySelect}
                                                                                    />
                                                                                </div>
                                                                                <div className="sing-wrapper">
                                                                                    <div className="button-sign blue unselectable">Создать</div>
                                                                                </div>
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
