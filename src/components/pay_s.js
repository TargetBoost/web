import React, {Component} from "react";
import youtube from "../icon/youtube.png"
import vk from "../icon/vk.png"
import io from "../icon/io.png"
import qiwi from "../icon/qiwi.png"
import telegram from "../icon/telegram.png"




class Pay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
        }
    }

    render() {
        return (
            <>
                <div className="block-full-size">
                    <div className="alert">
                        Ваш баланс успешно пополнен
                    </div>
                </div>
            </>
        )
    }
}

export default Pay;
