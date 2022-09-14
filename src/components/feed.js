import React, {Component} from "react";
import TextareaAutosize from 'react-textarea-autosize';

import like_icon from "../icon/like_red.png"
import avatarDefault from "../icon/avatar.png"


class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            feeds: [],
            isLoad: false,
            error: false,
            errorText: "",
        }
    }

    componentDidMount() {

        fetch("http://localhost:8080/v1/feeds", {
            method: "GET",
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(res => {
                this.setState({feeds: res.data, isLoad: true})
            })
            .catch(error => {
                this.setState({isLoad: true, error: true, errorText: error.toString()})
                console.log(error)
            });
    }

    render() {
        return (
            <div className="wrapper-feed">
                {
                    this.state.isLoad ?
                        this.state.error ?
                            <div className="wrapper-error">
                                <div className="error">Ошибка сервера</div>
                                <div className="error small-text">Мы уже работаем над этим и скоро все поправим</div>
                            </div>
                            :
                            this.state.feeds.map(data =>
                                <div className="item-wrapper-feed" key={data.id}>
                                    <div className="item-feed">
                                        {/*<div className="item-image-wrapper-feed">*/}
                                        {/*    <div className="title-feed">{data.title}</div>*/}
                                        {/*    <img className="item-preview-img" src={test_img} alt="qwe"/>*/}
                                        {/*</div>*/}
                                        <div className="item-preview-text">
                                            {data.value}
                                        </div>

                                        <div className="control-place-feed">
                                            {/*<div className="comment-feed-wrapper">*/}
                                            {/*    <div className="comment-feed-button">*/}
                                            {/*        Показать комментарии*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <div className="like unselectable">
                                                <div className="like-item">
                                                    <img className="like-img" src={like_icon} alt="like"/>
                                                </div>
                                                <div className="like-text">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="comments-wrapper">*/}
                                        {/*    /!*<div className="state-comments">*!/*/}
                                        {/*    /!*    Новых комментариев пока нет.*!/*/}
                                        {/*    /!*</div>*!/*/}
                                        {/*</div>*/}
                                        <div className="comment-feed-wrapper">
                                            {
                                                !this.state.auth ?
                                                    <div className="pop-up-close-comments unselectable">
                                                        Авторизуйтесь, чтобы написать комментарий
                                                    </div>
                                                :
                                                    null
                                            }

                                            <div className="icon-user">
                                                <img className="icon-user-img" src={avatarDefault} alt="asd" />
                                            </div>
                                            <div className="wrapper-textarea">
                                                <TextareaAutosize className="textarea-small"
                                                                  placeholder="Написать комментарий..."/>
                                            </div>
                                            <div className="wrapper-button-send">
                                                <svg width="24" height="24" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <g id="send_24__Page-2" stroke="none" strokeWidth="1" fill="none"
                                                       fillRule="evenodd">
                                                        <g id="send_24__send_24">
                                                            <path id="send_24__Rectangle-76" d="M0 0h24v24H0z"></path>
                                                            <path
                                                                d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2L8.73 13.2a4 4 0 0 0-3 2.54Z"
                                                                id="send_24__Mask" fill="#dcdcdc"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                        <div className="wrapper-loader">
                            <div className="loader"/>
                        </div>
                }

            </div>
        )
    }
}

export default Feed;
