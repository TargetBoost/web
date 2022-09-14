import React, {Component} from "react";
// import Feed from "./feed";
import Preview from "./preview";

class Content extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            store: this.props.store
        }
    }

    render() {
        return (
            <>
                <Preview auth={this.state.auth}/>
                <div className="wrapper-content">
                    {/*<Feed auth={this.state.auth}/>*/}
                </div>
            </>
        )
    }
}

export default Content;
