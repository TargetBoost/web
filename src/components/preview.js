import React, {Component} from "react";
import youtube from "../icon/youtube.png"
import vk from "../icon/vk.png"
import io from "../icon/io.png"
import qiwi from "../icon/qiwi.png"




class Preview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            executor: "target",
        }
    }

    swapButton = (e) => {
        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = e.target.parentNode.children

        for (let i=0; i !== childrenCollection.length; i++) {
            e.target.parentNode.children[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    render() {
        return (
            <>
                <div className="navigation-preview">
                    <div className="button-light active-white" target="target" onClick={this.swapButton}>Рекламодателям</div>
                    <div className="button-light" target="executer" onClick={this.swapButton}>Исполнителям</div>
                    <div className="button-light" target="feed" onClick={this.swapButton}>Новости</div>
                </div>

                {
                    this.state.executor === "target" ?
                        <>
                            <div className="block-default-pre">
                                <h1>Раскрутка в социальных сетях</h1>
                                <h3>Youtube, VK, Одноклассники</h3>
                                <div className="preview-inside-block">
                                    <p>
                                        Регистрирутесь, создавайте задания, наши исполнители с радостью их выполнят 🙂
                                    </p>
                                </div>
                                {/*<div className="navigation-preview">*/}
                                {/*    <div className="button-light pre-add unselectable">Подписка VK 2 руб.</div>*/}
                                {/*    <div className="button-light pre-add unselectable">Лайк VK 1,5 руб.</div>*/}
                                {/*    <div className="button-light pre-add unselectable">Подписка на канал Youtube 1 руб.</div>*/}
                                {/*    <div className="button-light pre-add unselectable">Посмотреть видео на Youtube 1 руб.</div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="block-default-pre">
                                <h2>Раскрутка каналов Youtube</h2>
                                <div className="navigation-preview">
                                    <div className="block-text-pre">
                                        Покупка лайков/просмотров на Youtube является эффективным способом повышения популярности видео, не важно будь это музыкальное видео, обзор продукта или ваш персональный блог.
                                        Подписчики Youtube так же являются важным критерием ранжирования и влияют на рекомендацию Ваших роликов, но Youtube очень пристально следит за резкими изменениями этого показателя, поэтому мы осуществляем постепенное увеличение подписчиков, чтобы обойти их алгоритмы выявления накрутки.
                                    </div>
                                    <div className="block-default-icon">
                                        <img className="default-icon" src={youtube} alt="youtube"/>
                                    </div>
                                </div>
                            </div>
                            <div className="block-default-pre">
                                <h2>Раскрутка сообществ VK</h2>
                                <div className="navigation-preview">
                                    <div className="block-text-pre">
                                        Раскрутка сообществ VK актуальная тема в 2022 году. Сегодня можно увидеть тысячи различных сообществ разной тематики. Одни создают группу как хобби, другие для продажи товаров и предоставления услуг, третьи для заработка на рекламе.
                                        Чтобы Ваше сообщество стало заметным и популярным нужно приложить время и усилия. Вы должны придерживаться наших рекомендаций и раскрутить группу в VK станет намного проще, эффективнее и быстрее.
                                    </div>
                                    <div className="block-default-icon">
                                        <img className="default-icon" src={vk} alt="vk"/>
                                    </div>
                                </div>
                            </div>
                        </>

                    :
                        this.state.executor === "executer" ?
                            <>
                                <div className="block-default-pre">
                                    <h1>Заработок на заданиях в социальных сетях</h1>
                                    <h3>Youtube, VK, Одноклассники</h3>
                                    <div className="preview-inside-block">
                                        <p>
                                            Зарабатывай выполняя задания по подпискам/лайкам и прочим действиям в социальных сетях.
                                        </p>
                                    </div>
                                </div>
                                <div className="block-default-pre">
                                    <h2>Выполнение заданий</h2>
                                    <div className="preview-inside-block">
                                        <p>
                                            Мы автоматически провериям выполнение заданий и сразу зачисляем оплату на Ваш баланс.
                                        </p>
                                    </div>
                                </div>
                                <div className="block-default-pre">
                                    <h2>Способы вывода средств</h2>
                                    <div className="preview-inside-block">
                                        <p>
                                            Вывод средств осуществляется от 5 руб посредствам создания заявки в личном кабиенете.
                                        </p>
                                    </div>
                                    <div className="navigation-preview">
                                        <div className="block-default-icon-many">
                                            <img className="default-icon-many" src={io} alt="io"/>
                                            <div className="title-default-icon-many">ЮMoney</div>
                                        </div>
                                        <div className="block-default-icon-many">
                                            <img className="default-icon-many" src={qiwi} alt="qiwi"/>
                                            <div className="title-default-icon-many">QIWI</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        :
                            <>
                                <div className="block-default-pre">
                                    <div className="title-block">Новости платформы</div>
                                    <div className="feed">
                                        <div className="item-feed">
                                            <h2>Способы вывода средств</h2>
                                            <div className="preview-inside-block red">
                                                <p>
                                                    В данный момент вывод средств осущевстляется только через QIWI
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-feed">
                                            <h2>test</h2>
                                            <div className="preview-inside-block">
                                                <p>
                                                    просто новость для теста верстки
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                }
            </>
        )
    }
}

export default Preview;
