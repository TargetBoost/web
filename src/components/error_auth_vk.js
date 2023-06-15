import React, {Component} from "react";
// import youtube from "../icon/youtube.png"
// import vk from "../icon/vk.png"
// import io from "../icon/io.png"
// import qiwi from "../icon/qiwi.png"
// import telegram from "../icon/telegram.png"




class AuthVK extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    render() {
        // let store = this.state.store.getState()
        return (
            <>
                <div className="block-default-pre">
                    <div className="preview-inside-block">
                        <p>
                            Ошибка авторизации VK.
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

export default AuthVK;
