import React, {Component} from "react";
import vk from "../icon/vk.png";

class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            id: this.props.id,
            type: this.props.type
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                {
                    store.user.load !== false ?
                        this.state.type === "executor" ?
                            <div className="block-default-pre">
                                <div className="title-block">Список заданий</div>
                                <div className="navigation-preview">
                                    {/*<div className="block-text-pre">*/}
                                    {/*    Раскрутка сообществ VK актуальная тема в 2022 году. Сегодня можно увидеть тысячи различных сообществ разной тематики. Одни создают группу как хобби, другие для продажи товаров и предоставления услуг, третьи для заработка на рекламе.*/}
                                    {/*    Чтобы Ваше сообщество стало заметным и популярным нужно приложить время и усилия. Вы должны придерживаться наших рекомендаций и раскрутить группу в VK станет намного проще, эффективнее и быстрее.*/}
                                    {/*</div>*/}
                                    {/*<div className="block-default-icon">*/}
                                    {/*    <img className="default-icon" src={vk} alt="vk"/>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            :
                            <div>123</div>

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
