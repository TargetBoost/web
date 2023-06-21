import React, {Component} from "react";
class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let date = new Date()
        return (
            <>
                <div className="footer">
                    <div className="logo-text">© 2022-{date.getFullYear()} Target Boost</div>
                    <div className="footer-button" onClick={()=> {window.location.href = "https://t.me/targetboostchat"}}>Чат с поддержкой</div>
                    {/*<div className="footer-button">Пользовательское соглашение</div>*/}
                    {/*<div className="footer-button" onClick={()=> {window.location.href = "/agreement"}}>Правила</div>*/}
                    <div className="footer-button" onClick={()=> {window.location.href = "/jobs"}}>Вакансии</div>
                    <div className="footer-button" onClick={()=> {window.location.href = "/about"}}>О Нас</div>
                </div>

            </>
        )
    }
}

export default Footer;
