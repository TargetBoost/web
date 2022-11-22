import React, {Component} from "react";
import ReactJWPlayer from "react-jw-player";
import target from "../icon/target.png"

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            advertising: {
                admessage: "This video will resume in xx seconds",
                adscheduleid: "your_ad_schedule_id",
                client: "vast",
                cuetext: "Advertisement",
                outstream: false,
                preloadAds: false,
                vpaidcontrols: false,
                rules: {
                    startOnSeek: "pre",
                    timeBetweenAds: 0
                },
                schedule: [{
                    tag: [
                        "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]"
                    ],
                    type: "linear",
                    offset: 25
                },
                    {
                        tag: [
                            "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]"
                        ],
                        type: "linear",
                        offset: 125
                    },
                    {
                        tag: [
                            "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]"
                        ],
                        type: "linear",
                        offset: 225
                    }]
            }
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
                    <ReactJWPlayer
                        file="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        playerId="123"
                        playerScript="https://cdn.jwplayer.com/libraries/someid.js"
                        customProps={{ advertising: { ...this.advertising } }}
                    />
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
