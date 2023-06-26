import React, {Component} from "react";
import vk from "../icon/vk.png";
import noImg from "../icon/no_img.png"
import youtube from "../icon/youtube.png"
import telegram from "../icon/telegram.png"
import Select from 'react-select';
import 'react-input-range/lib/css/index.css';
import chroma from 'chroma-js';
import TextareaAutosize from "react-textarea-autosize";
import Avatar from "@mui/material/Avatar";
import target from "../icon/target_new.png";
import InputMask from "react-input-mask";

class Targets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            executor: "all",
            targets: [],
            optionsTypeTarget: [
                // { value: 'vk', label: 'VK', color: '#0277FF'},
                { value: 'tg', label: 'Telegram', color: '#26A2DF'},
                // { value: 'yt', label: 'Youtube', color: '#FF0000'},
                // { value: 'site', label: 'Сайты партнеры', color: '#0072FD' },
            ],
            optionsTypeAD: [
                { value: '0', label: 'Интернет (интернет-сервисы и услуги, домены и т.д.)', color: '#0277FF'},
                { value: '1', label: 'Дом и сад (мебель и аксессуары для дома и сада)', color: '#26A2DF'},
                { value: '2', label: 'Телефония (телефоны, сим-карты, тарифы на мобильную связь, оплата роуминга и т.д.)', color: '#FF0000'},
                { value: '3', label: 'Недвижимость (продажа, покупка, аренда и т.д.)', color: '#0072FD' },
                { value: '4', label: 'Кредитование', color: '#0072FD' },
                { value: '5', label: 'Путешествия (путевки, авиабилеты, бронирование отелей и т.д.)', color: '#0072FD' },
                { value: '6', label: 'Аксессуары (шапки, шарфы, перчатки пояса и т.д.)', color: '#0072FD' },
                { value: '7', label: 'Одежда', color: '#0072FD' },
                { value: '8', label: 'Обувь', color: '#0072FD' },
                { value: '3', label: 'Конференция', color: '#0072FD' },
                // { value: '3', label: '', color: '#0072FD' },
                // { value: '3', label: '', color: '#0072FD' },
                // { value: '3', label: '', color: '#0072FD' },
                // { value: '3', label: '', color: '#0072FD' },
                // { value: '3', label: '', color: '#0072FD' },
            ],
            optionsDeepTarget: {
                vk: [
                    { value: 'vk_community', cost: 6, label: 'Вступить в сообщество' },
                    // { value: 'vk_like', cost: 2, label: 'Поставить лайк на запись' },
                    // { value: 'vk_add_friends', cost: 2, label: 'Добавить в друзья' },
                ],
                tg: [
                    { value: 'tg_community', cost: 2, label: 'Подписаться на канал' },
                ],
                yt: [
                    { value: 'yt_chanel', cost: 2, label: 'Подписаться на канал' },
                    { value: 'yt_watch', cost: 2, label: 'Посмотреть видео' },
                    { value: 'yt_like', cost: 2, label: 'Поставить лайк'},
                    { value: 'yt_dislike', cost: 2, label: 'Поставить дизлайк' },
                ]
            },

            select: null,
            nameCompany: null,
            descriptionCompany: null,
            typeAd: null,
            cost: null,
            total: 0,
            fullPrice: 0,
            type: null,
            link: null,
            limit: 0,
            userCost: false,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    styles = {
        // valueContainer: (provided, state) => ({
        //     ...provided,
        //     backgroundColor: state.color
        // }),
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };

    settingsTextArea = {
        minRows: 1,
    }

    countExecute = React.createRef();

    urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(URL);
    };

    swapButtonTask = (e) => {
        this.setState({executor: e.target.getAttribute("target"), select: null, nameCompany: null, descriptionCompany: null, link: null})
        let childrenCollection = document.getElementsByClassName("button-light")
        for (let i=0; i !== childrenCollection.length; i++) {
            childrenCollection[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    componentDidMount() {
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

        this.state.store.dispatch({
            type: "set_page", value: "lk",
        })
    }

    createTarget = () => {
        let data = {
            name_company: this.state.nameCompany,
            description_company: this.state.descriptionCompany,
            type: this.state.type,
            link: this.state.link,
            limit: this.state.limit,
            type_ad: this.state.typeAd,
        }

        if (!this.urlPatternValidation(this.state.link)){
            this.state.store.dispatch({
                type: "set_error", value: "Цель может быть только ссылкой",
            })
            return
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
                    // window.location.reload()
                    this.setState({executor: "all", select: null, nameCompany: null, descriptionCompany: null, link: null})
                    this.state.store.dispatch({
                        type: "set_info", value: "Рекламная Кампания успешно создана",
                    })

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
        console.log(selectedOption)
        this.setState({ select: selectedOption});
    };

    handleChangeAd = (selectedOption) => {
        console.log(selectedOption)
        this.setState({ typeAd: selectedOption});
    };

    handleChangeNameCompany = (e) => {
        this.setState({nameCompany: e.target.value})

    }

    handleChangeDescriptionCompany = (e) => {
        this.setState({ descriptionCompany: e.target.value});
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

    handleChangeLimitDay = (e) => {
        this.setState({limit: e.target.value})
    };



    handleChangeUserCost = (e) => {
        // TODO: ИСПРАВИТЬ!!!!!!!
        // console.log(this.state.optionsDeepTarget, this.state.select, this.state.type)
        let priceConst = this.state.optionsDeepTarget[this.state.select][0].cost
        if (e.target.value < priceConst ) {
            if (e.target.value < 0) {
                this.setState({cost: this.state.optionsDeepTarget[this.state.select][0].cost, fullPrice: this.state.optionsDeepTarget[this.state.select][0].cost * this.countExecute.current.value})

            }else{
                this.state.store.dispatch({
                    type: "set_error", value: "Цена должна быть больше минимальной",
                })
                this.setState({cost: this.state.optionsDeepTarget[this.state.select][0].cost, fullPrice: this.state.optionsDeepTarget[this.state.select][0].cost * this.countExecute.current.value })
            }
        }else{
            this.setState({cost: e.target.value, fullPrice: e.target.value * this.countExecute.current.value})
        }
    }

    changeSwitcherPrice = (e) => {
        this.setState({userCost: !this.state.userCost})
        if (!this.state.userCost === false) {
            this.setState({cost: this.state.optionsDeepTarget[this.state.select][0].cost, fullPrice: this.countExecute.current.value * this.state.optionsDeepTarget[this.state.select][0].cost})
        }
    }

    updateTask = (e) => {
        let data = {
            id: parseInt(e.target.getAttribute("target")),
            status: parseInt(e.target.getAttribute("status"))
        }

        fetch(`/core/v1/service/target`, {
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
                        store.user.auth === false || store.user.execute === true || store.user.block === true ?
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
                                            <div className="unselectable button-light active-white" target="all" onClick={this.swapButtonTask}>Активные</div>
                                            <div className="unselectable button-light" target="end" onClick={this.swapButtonTask}>Завершенные</div>
                                            <div className="unselectable button-light" target="check" onClick={this.swapButtonTask}>На проверке</div>
                                            <div className="unselectable button-light" target="rejection" onClick={this.swapButtonTask}>Отклоненные</div>
                                            {/*<div className="unselectable button-light" target="settings" onClick={this.swapButtonTask}>Настройки</div>*/}

                                        </div>
                                        <div className="flex-left-right">
                                            <div className="unselectable button-light" target="create" style={{background: "#0072FC", color: "#fff"}} onClick={this.swapButtonTask}>Создать рекламную кампанию</div>
                                        </div>
                                    </div>
                                    {
                                        this.state.executor === "all" ?
                                            <div className="block-default-pre">
                                                <div className="task-wall">
                                                    {
                                                        filterTarget(this.state.targets, 1).length > 0 ?
                                                            filterTarget(this.state.targets, 1).map(t =>
                                                                <div className="task-item-wrapper">
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
                                                                        <div className="task-item-value">{ (parseInt(t.total_price)).toLocaleString('ru') } ₽</div>
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
                                                                            <div className="button-default" target={t.id} status="3" onClick={this.updateTask}>Завершить</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="info-task-wrapper">
                                                                        <div className="image-wrapper-bio">
                                                                            <div className="wrapper-image-icon">
                                                                                {
                                                                                    t.cm_file_id !== "" ?
                                                                                        <img className="img-channel" src={`/core/v1/file_ch/${t.cm_file_id}`} alt={"img"}/>
                                                                                        :
                                                                                        <img className="img-channel" src={noImg} alt={"img"}/>

                                                                                }
                                                                            </div>
                                                                            <div className="info-company-bio">
                                                                                <div className="title-block" style={{fontWeight: "bold"}}>
                                                                                    <a href={t.link} target={"_blank"} rel="noreferrer">
                                                                                        {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>
                                                                                    </a>
                                                                                </div>
                                                                                <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            )
                                                        :
                                                            <div className="alert">
                                                                Вы не еще не создали ни одной рекламной кампании
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            :
                                            this.state.executor === "end" ?
                                                <div className="block-default-pre">
                                                    <div className="task-wall">
                                                        {
                                                            filterTarget(this.state.targets, 3).length > 0 ?
                                                                filterTarget(this.state.targets, 3).map(t =>
                                                                    <div className="task-item-wrapper">
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
                                                                            <div className="task-item-value">{(parseInt(t.total_price)).toLocaleString('ru')} ₽</div>

                                                                            <div className="task-item-value">Завершена</div>
                                                                            {/*<div className="task-item-value">*/}
                                                                            {/*    <div className="button-default" target={t.id} status="3" onClick={this.updateTask}></div>*/}
                                                                            {/*</div>*/}
                                                                        </div>
                                                                        <div className="info-task-wrapper">
                                                                            <div className="image-wrapper-bio">
                                                                                <div className="wrapper-image-icon">
                                                                                    {
                                                                                        t.cm_file_id !== "" ?
                                                                                            <img className="img-channel" src={`/core/v1/file_ch/${t.cm_file_id}`} alt={"img"}/>
                                                                                            :
                                                                                            <img className="img-channel" src={noImg} alt={"img"}/>

                                                                                    }
                                                                                </div>
                                                                                <div className="info-company-bio">
                                                                                    <div className="title-block" style={{fontWeight: "bold"}}>
                                                                                        <a href={t.link} target={"_blank"} rel="noreferrer">
                                                                                            {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>
                                                                                </div>
                                                                            </div>

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
                                                            filterTarget(this.state.targets, 0).length > 0 ?
                                                                filterTarget(this.state.targets, 0).map(t =>
                                                                    <div className="task-item-wrapper">
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
                                                                            <div className="task-item-value">{(parseInt(t.total_price)).toLocaleString('ru')} ₽</div>

                                                                            <div className="task-item-value">На проверке</div>
                                                                            {/*<div className="task-item-value">*/}
                                                                            {/*    <div className="button-default">Изменить</div>*/}
                                                                            {/*</div>*/}
                                                                        </div>
                                                                        <div className="info-task-wrapper">
                                                                            <div className="image-wrapper-bio">
                                                                                <div className="wrapper-image-icon">
                                                                                    {
                                                                                        t.cm_file_id !== "" ?
                                                                                            <img className="img-channel" src={`/core/v1/file_ch/${t.cm_file_id}`} alt={"img"}/>
                                                                                            :
                                                                                            <img className="img-channel" src={noImg} alt={"img"}/>

                                                                                    }
                                                                                </div>
                                                                                <div className="info-company-bio">
                                                                                    <div className="title-block" style={{fontWeight: "bold"}}>
                                                                                        <a href={t.link} target={"_blank"} rel="noreferrer">
                                                                                            {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>
                                                                                </div>
                                                                            </div>

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
                                                                filterTarget(this.state.targets, 2).length > 0 ?
                                                                    filterTarget(this.state.targets, 2).map(t =>

                                                                        <div className="task-item-wrapper">
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
                                                                                <div className="task-item-value">{(parseInt(t.total_price)).toLocaleString('ru')} ₽</div>

                                                                                <div className="task-item-value red">
                                                                                    Не соответствует правилам
                                                                                </div>
                                                                                {/*<div className="task-item-value">*/}
                                                                                {/*    <div className="button-default">Изменить</div>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                            <div className="info-task-wrapper">
                                                                                <div className="image-wrapper-bio">
                                                                                    <div className="wrapper-image-icon">
                                                                                        {
                                                                                            t.cm_file_id !== "" ?
                                                                                                <img className="img-channel" src={`/core/v1/file_ch/${t.cm_file_id}`} alt={"img"}/>
                                                                                                :
                                                                                                <img className="img-channel" src={noImg} alt={"img"}/>

                                                                                        }
                                                                                    </div>
                                                                                    <div className="info-company-bio">
                                                                                        <div className="title-block" style={{fontWeight: "bold"}}>
                                                                                            <a href={t.link} target={"_blank"} rel="noreferrer">
                                                                                                {t.link.split('/')[t.link.split('/').length - 1]} <span style={{color: "#dcdcdc"}}>({t.count_sub})</span>
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="text-info-bio"><span style={{fontWeight: "bold"}} >Описание канала: </span>{t.bio === "" ? "нет" : t.bio}</div>
                                                                                    </div>
                                                                                </div>

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
                                                                                <div className="title-pop-up">Данные рекламной кампании</div>
                                                                            </div>
                                                                            <div>
                                                                                <div style={{padding: "10px"}}>Выберите платформу для размещения рекламы:</div>
                                                                                <div className="wrapper-input">
                                                                                    <Select
                                                                                        isMulti={true}
                                                                                        onChange={this.handleChange}
                                                                                        options={this.state.optionsTypeTarget}
                                                                                        styles={this.styles}
                                                                                        placeholder="Начните вводить или выберите из списка..."
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                this.state.select !== null ?
                                                                                    <>
                                                                                        <div>
                                                                                            <div style={{padding: "10px"}}>Заголовок рекламной кампании:</div>
                                                                                            <div className="wrapper-input">
                                                                                                <input className="input-default" type="text" onChange={this.handleChangeNameCompany}/>
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            this.state.nameCompany !== null ?
                                                                                                <>
                                                                                                <div>
                                                                                                    <div style={{padding: "10px"}}>Описание рекламной кампании:</div>
                                                                                                    <div className="wrapper-input">
                                                                                                        <TextareaAutosize {...this.settingsTextArea} onChange={this.handleChangeDescriptionCompany} className="input-default" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                {
                                                                                                    this.state.descriptionCompany !== null ?
                                                                                                        <>
                                                                                                            <div>
                                                                                                                <div style={{padding: "10px"}}>Ссылка на цель: </div>
                                                                                                                <div className="wrapper-input">
                                                                                                                    <input className="input-default" type="text" onChange={this.handleChangeLink} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <div style={{padding: "10px"}}>Выберите тип Вашей рекламы:</div>
                                                                                                                <div className="wrapper-input">
                                                                                                                    <Select
                                                                                                                        // isMulti={true}
                                                                                                                        onChange={this.handleChangeAd}
                                                                                                                        options={this.state.optionsTypeAD}
                                                                                                                        styles={this.styles}
                                                                                                                        placeholder="Начните вводить или выберите из списка..."
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <div style={{padding: "10px"}}>Бюджет в сутки (100): </div>
                                                                                                                <div className="wrapper-input">
                                                                                                                    <InputMask className="input-default" formatChars={{
                                                                                                                        '9': '[0-9]',
                                                                                                                        'a': '[A-Za-z]',
                                                                                                                        '*': '.*',
                                                                                                                    }} id="tg" mask="99999999" maskChar={false} alwaysShowMask={true} onChange={this.handleChangeLimitDay} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <div style={{padding: "10px"}}>Пример рекламного поста в Telegram:</div>
                                                                                                                <div className="wrapper-input" style={{display: "flex"}}>
                                                                                                                    <div style={{marginRight: "10px"}}>
                                                                                                                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid #dcdcdc"}}>
                                                                                                                            <Avatar src={target} sx={{ width: 36, height: 36 }}></Avatar>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="tg-wrapper">
                                                                                                                        <i className="tgme_widget_message_bubble_tail">
                                                                                                                            <svg
                                                                                                                                className="bubble_icon"
                                                                                                                                width="9px"
                                                                                                                                height="20px"
                                                                                                                                viewBox="0 0 9 20">
                                                                                                                                <g fill="none">
                                                                                                                                    <path
                                                                                                                                        className="background"
                                                                                                                                        fill="#ffffff"
                                                                                                                                        d="M8,1 L9,1 L9,20 L8,20 L8,18 C7.807,15.161 7.124,12.233 5.950,9.218 C5.046,6.893 3.504,4.733 1.325,2.738 L1.325,2.738 C0.917,2.365 0.89,1.732 1.263,1.325 C1.452,1.118 1.72,1 2,1 L8,1 Z"></path>
                                                                                                                                    <path
                                                                                                                                        className="border_1x"
                                                                                                                                        fill="#0000001"
                                                                                                                                        d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0 L9,0 L9,20 L7,20 L7,20 L7.002,18.068 C6.816,15.333 6.156,12.504 5.018,9.58 C4.172,7.406 2.72,5.371 0.649,3.475 C-0.165,2.729 -0.221,1.464 0.525,0.649 C0.904,0.236 1.439,0 2,0 Z"></path>
                                                                                                                                    <path
                                                                                                                                        className="border_2x"
                                                                                                                                        d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.5 L9,0.5 L9,20 L7.5,20 L7.5,20 L7.501,18.034 C7.312,15.247 6.64,12.369 5.484,9.399 C4.609,7.15 3.112,5.052 0.987,3.106 C0.376,2.547 0.334,1.598 0.894,0.987 C1.178,0.677 1.579,0.5 2,0.5 Z"></path>
                                                                                                                                    <path
                                                                                                                                        className="border_3x"
                                                                                                                                        d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.667 L9,0.667 L9,20 L7.667,20 L7.667,20 L7.668,18.023 C7.477,15.218 6.802,12.324 5.64,9.338 C4.755,7.064 3.243,4.946 1.1,2.983 C0.557,2.486 0.52,1.643 1.017,1.1 C1.269,0.824 1.626,0.667 2,0.667 Z"></path>
                                                                                                                                </g>
                                                                                                                            </svg>
                                                                                                                        </i>
                                                                                                                        <div className="tg-message-wrapper" style={{width: "445px"}}>
                                                                                                                            <div style={{color: "#2381CC"}}>TargetBoostBot</div>
                                                                                                                            <div style={{marginTop: "6px", fontWeight: "bold"}}>{this.state.nameCompany}</div>
                                                                                                                            <div style={{marginTop: "6px", fontStyle: "italic"}}>{this.state.descriptionCompany}</div>
                                                                                                                            <div style={{marginTop: "6px", textDecoration: "underline", color: "#2381CC"}}>
                                                                                                                                <a href={this.state.link}>{this.state.link}</a>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    : null
                                                                                                }
                                                                                                </>
                                                                                            : null
                                                                                        }
                                                                                    </>
                                                                                :
                                                                                    null

                                                                            }
                                                                            {
                                                                                this.state.link !== null ?
                                                                                    <div className="wrapper-input">
                                                                                        <div onClick={this.createTarget} className="button-any blue unselectable" >Создать</div>
                                                                                    </div>
                                                                                :
                                                                                    <div className="wrapper-input">
                                                                                        <div className="button-any grey unselectable" >Еще не все...</div>
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    null

                                    }

                                    {/*<div className="block-default-pre">*/}
                                    {/*    <div className="alert">*/}
                                    {/*        Скоро мы запустим бета-тестирование, следите за нашим <a href="/blog"> блогом</a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="block-default-pre" style={{fontSize: "13px", background: "#fcf3e2"}}>*/}
                                    {/*    Добавьте нашего бота (<a href="https://t.me/targetBoostBot" target="_blank" rel="noreferrer" className="underline">@targetBoostBot</a>) администратором в Ваш телеграм канал, чтобы мы могли отслеживать, каких подписчиков привели мы.*/}
                                    {/*</div>*/}
                                    {/*<div className="block-default-pre" style={{fontSize: "12px", background: "#fcf3e2"}}>*/}
                                    {/*    Созданные рекламные кампании запустятся после того, как их проверят наши администраторы в течение 1-3 часов.*/}
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

export default Targets;
