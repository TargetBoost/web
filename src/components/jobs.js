import React, {Component} from "react";

class Jobs extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="block-full-size">
                    <h1>Работа в Target Boost</h1>
                    <div className="preview-inside-block">
                        <p>
                            Присоединяйся к нашей команде 😀
                        </p>
                    </div>
                </div>
                <div className="block-default-pre">
                    <div className="navigation-preview">
                        <p>
                            Новых вакансий пока нет
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

export default Jobs;
