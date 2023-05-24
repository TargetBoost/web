import React, {Component} from "react";

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetAction: "sign-in",
            load: true,
            vast: ""
        }
    }

    handleToggleVideo = (e) => {
        console.log(e)
    }

    componentDidMount() {
        fetch(`/core/v1/service/test/video/vast`, {
            method: "GET",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {
                    this.setState({vast: res.data, load: true})
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


    render() {
        return (
            <>
                {
                    this.state.load ?
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
                                            Всю дополнительную информацию по работе платформы Вы можете получить через <a className="button-text" target="_blank" href="https://t.me/targetboostchat">чат с поддержкой.</a>
                                        </p>
                                    </div>
                                    {/*<div className="block-default-icon">*/}
                                    {/*    <img className="default-icon" src={target} alt="target"/>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="block-default-pre">
                                {/*<video onClick={this.handleToggleVideo}  src="//" className="video-thumbnail" controls=""*/}
                                {/*       disablePictureInPicture="" preload="none"*/}
                                {/*       poster="https://samplelib.com/lib/preview/mp4/sample-5s.jpg"*/}
                                {/*       controlsList="nodownload"></video>*/}
                            </div>
                            <div className="block-default-pre">
                                <div className="end">
                                    Основатель<br/>
                                    <a className="button-text" target="_blank" href="https://t.me/andrey_shsh">Андрей</a>
                                    <br/>
                                    <br/>
                                    Основатель и финансовый директор<br/>
                                    <a className="button-text" target="_blank" href="https://t.me/Grigoriy_zol">Григорий</a>
                                </div>
                            </div>
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

export default Contact;
