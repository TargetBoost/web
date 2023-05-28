import React, {Component} from "react";
import 'react-input-range/lib/css/index.css';

class Agreement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    componentDidMount() {

    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                <div className="block-default-pre">
                    <h1>Соглашение</h1>
                    <div className="navigation-preview">
                        <div className="block-text-pre">
                            <ol type="1">
                                <li>Запрещается отписываться от каналов менее чем через 2 месяца (бан).</li>
                                <li>Запрещается размещать рекламные и прочее кампании связанные с
                                    наркотическими средствами и психотропными веществами, табачными изделиями и вейпами, взрывчатые вещества, за исключением пиротехнических изделий, медицинские услуги по искусственному прерыванию беременности, услуги по написанию рефератов и других научных работ, пропаганда терроризма, полетическая тематика (бан).</li>
                                <li>(Оскарбление/токсичное поведение) в чата поддержки (бан).</li>
                                <li>Мы не меняем тип аккаунта. Вы исполнитель либо заказчик.</li>
                            </ol>
                        </div>
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
        )
    }
}

export default Agreement;
