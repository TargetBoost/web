import React, {Component} from "react";
import target from "../icon/target.png"

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
        }
    }

    render() {
        return (
            <>
                <div className="block-default-pre">
                    <h1>Target Boost</h1>
                    <div className="navigation-preview">
                        <div className="block-text-pre">
                            <p>
                                Мы маркетинговый агрегатор по продвижению контента в социальных сетях.
                                <br/>
                                Так же мы занимаемся контекстной рекламой и pre-roll вставками через наш видеоплеер. <br/>
                                <br/>
                                Всю дополнительную информацию по работе платформы Вы можете получить через <a className="button-text" target="_blank" href="">чат с поддержкой.</a>
                            </p>
                        </div>
                        {/*<div className="block-default-icon">*/}
                        {/*    <img className="default-icon" src={target} alt="target"/>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="block-default-pre">
                    <div className="end">
                        Основатель<br/>
                        <a className="button-text" target="_blank" href="https://t.me/andrey_shsh">Андрей</a>
                        <br/>
                        <br/>
                        Основатель и финансовый директор<br/>
                        <a className="button-text" target="_blank" href="https://t.me/Foodfox_Grigory_Zolotookhin">Григорий</a>
                    </div>
                </div>
            </>
        )
    }
}

export default Contact;
