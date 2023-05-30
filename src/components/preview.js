import React, {Component} from "react";
import youtube from "../icon/youtube.png"
import vk from "../icon/vk.png"
import io from "../icon/io.png"
import background from "../img/d.png"
import background_tg from "../img/dd.png"

import qiwi from "../icon/qiwi.png"
import telegram from "../icon/telegram.png"




class Preview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            executor: "executer",
        }
    }

    swapButton = (e) => {
        this.setState({executor: e.target.getAttribute("target")})

        let childrenCollection = document.getElementsByClassName("button-light")

        for (let i=0; i !== childrenCollection.length; i++) {
            childrenCollection[i].classList.remove('active-white')
        }
        e.target.classList.add("active-white")
    }

    render() {
        return (
            <>
                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "right 0px top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1000px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    paddingLeft: "400px"
                }}>
                    <h1>Накрутка в социальных сетях</h1>
                    <h2>Telegram, Youtube, VK</h2>
                    <div className="preview-inside-block">
                        <p>
                            Наша платформа помогает раскручивать социальные сети, такие как Telegram, Youtube, VK.
                            Начать очень просто, зарегистрируйтесь, создайте первую рекламную кампани уже сейчас и получите столько подписчиков и просмотров сколько Вам необходимо.
                            <br/>
                            <br/>
                            Зарабатывай вместе с нами, выполняй задания по подпискам/лайкам и прочим действиям в социальных сетях.
                            Мы автоматически проверяем выполненные задания и сразу зачисляем оплату на Ваш баланс.
                        </p>
                    </div>
                    {/*<div className="navigation-preview">*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка VK 2 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Лайк VK 1,5 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Подписка на канал Youtube 1 руб.</div>*/}
                    {/*    <div className="button-light pre-add unselectable">Посмотреть видео на Youtube 1 руб.</div>*/}
                    {/*</div>*/}
                </div>

                <div className="block-default-pre" style={{
                    backgroundImage: `url(${background_tg})`,
                    backgroundPosition: "left -100px top 50%",
                    // backgroundAttachment: "fixed",
                    backgroundSize: "1100px, auto",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    paddingLeft: "400px",
                    height: "335px",

                }}>
                    <h2>Что дает накрутка?</h2>
                    <div className="navigation-preview">
                        {/*<div className="block-default-icon">*/}
                        {/*    <img className="default-icon" src={telegram} alt="telegram"/>*/}
                        {/*</div>*/}
                        <div className="block-text-pre">
                            Каналы Telegram - на данный момент самый популярный способ получения информации. Большое количество подписчиков канала даст вам доверие потенциальной аудитории к каналу и как следствие более выраженный, но при этом естественный прирост подписчиков.
                            <br/>
                            <br/>
                            Покупка лайков/просмотров на Youtube является эффективным способом повышения популярности видео, не важно будь это музыкальное видео, обзор продукта или ваш персональный блог.
                            Подписчики Youtube так же являются важным критерием ранжирования и влияют на рекомендацию Ваших роликов, но Youtube очень пристально следит за резкими изменениями этого показателя, по-этому мы осуществляем постепенное увеличение подписчиков, чтобы обойти их алгоритмы выявления накрутки.
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
                {/*<div className="block-default-pre">*/}
                {/*    <h2>Накрутка каналов Telegram</h2>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={telegram} alt="telegram"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Каналы Telegram - на данный момент самый популярный способ получения информации. Большое количество подписчиков канала даст вам доверие потенциальной аудитории к каналу и как следствие более выраженный, но при этом естественный прирост подписчиков.                                    </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h3>Раскрутка каналов Youtube</h3>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={youtube} alt="youtube"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Покупка лайков/просмотров на Youtube является эффективным способом повышения популярности видео, не важно будь это музыкальное видео, обзор продукта или ваш персональный блог.*/}
                {/*            Подписчики Youtube так же являются важным критерием ранжирования и влияют на рекомендацию Ваших роликов, но Youtube очень пристально следит за резкими изменениями этого показателя, поэтому мы осуществляем постепенное увеличение подписчиков, чтобы обойти их алгоритмы выявления накрутки.*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h3>Раскрутка сообществ VK</h3>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="block-default-icon">*/}
                {/*            <img className="default-icon" src={vk} alt="vk"/>*/}
                {/*        </div>*/}
                {/*        <div className="block-text-pre">*/}
                {/*            Раскрутка сообществ VK - актуальная тема в 2022 году. Сегодня можно увидеть тысячи различных сообществ разной тематики. Одни создают группу как хобби, другие для продажи товаров и предоставления услуг, третьи для заработка на рекламе.*/}
                {/*            Чтобы Ваше сообщество стало заметным и популярным нужно приложить время и усилия. Вы должны придерживаться наших рекомендаций и раскрутить группу в VK станет намного проще, эффективнее и быстрее.*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="block-default-pre">*/}
                {/*    <h3>Заработок на заданиях в социальных сетях</h3>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Зарабатывай выполняя задания по подпискам/лайкам и прочим действиям в социальных сетях.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Мы автоматически проверяем выполненные задания и сразу зачисляем оплату на Ваш баланс.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre" style={{fontSize: "13px", background: "#f2e4a8"}}>*/}
                {/*    Мы запустились в тестовом режиме.<br/>*/}
                {/*    У нас уже есть задания которые можно выполнить!<br/>*/}
                {/*</div>*/}
                {/*<div className="block-default-pre">*/}
                {/*    <h2>Способы вывода средств</h2>*/}
                {/*    <div className="preview-inside-block">*/}
                {/*        <p>*/}
                {/*            Вывод средств осуществляется от 5 руб посредствам создания заявки в личном кабиенете.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="navigation-preview">*/}
                {/*        <div className="flex-left-right">*/}
                {/*            /!*<div className="block-default-icon-many">*!/*/}
                {/*            /!*    <img className="default-icon-many" src={io} alt="io"/>*!/*/}
                {/*            /!*    <div className="title-default-icon-many">ЮMoney</div>*!/*/}
                {/*            /!*</div>*!/*/}
                {/*            <div className="block-default-icon-many">*/}
                {/*                <img className="default-icon-many" src={qiwi} alt="qiwi"/>*/}
                {/*                <div className="title-default-icon-many">QIWI</div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        )
    }
}

export default Preview;
