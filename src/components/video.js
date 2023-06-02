import React, {Component} from "react";
import play from "../icon/play-button-arrowhead-2.png"
import pause from "../icon/pause-2.png"
import logo from "../icon/tb.png"
import poster from "../img/img.png"

import 'react-input-range/lib/css/index.css';

class Video extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            urls: ['https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'],
            status: "other",
            source: "",
            currentTime: 0,

            action: "pause",
            showControl: true,
            showTimeLineBox: false,
            timeMouseMove: 0,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    obj = React.createRef();
    timer = React.createRef();
    prog = React.createRef();

    progLow = React.createRef();
    fullScreen = React.createRef();
    controls = React.createRef();
    timeLineBox = React.createRef();
    timeBox = React.createRef();

    componentDidMount() {

    }

    playAd(player){
        let this_ = this
        this_.setState({status: "ad"})
        let timerNew = setTimeout(()=>{
            this_.setState({status: "ad_now"})
            player.pause()
            let ct = player.currentTime
            let sources = player.querySelectorAll('source')
            let sourceNow = sources[0].src
            let currentTime = player.currentTime
            this_.setState({source: sourceNow, currentTime: currentTime})

            sources[0].src = this_.state.urls[0]

            player.load()
            player.play()
            console.log(this_.state)
        },10000)
        return () => clearTimeout(timerNew)
    }

    playBack(player){
        let this_ = this
        let timerBack = setTimeout(() => {
            player.pause()
            let sources = player.querySelectorAll('source')
            sources[0].src = this_.state.source
            player.load()
            player.currentTime = this_.state.currentTime

            player.play()
            this_.setState({status: "play"})
            console.log(this_.state)
        }, 20000)

        return () => clearTimeout(timerBack);
    }

    action = (e) => {
        if (e.target.getAttribute("action") === "play"){
            this.setState({action: "play"})

            this.obj.current.play()
            // let elem = this.fullScreen.current
            // if (elem.requestFullscreen) {
            //     elem.requestFullscreen();
            // } else if (elem.mozRequestFullScreen) {
            //     elem.mozRequestFullScreen();
            // } else if (elem.webkitRequestFullscreen) {
            //     elem.webkitRequestFullscreen();
            // } else if (elem.msRequestFullscreen) {
            //     elem.msRequestFullscreen();
            // }

        }else if (e.target.getAttribute("action") === "pause") {
            this.setState({action: "pause"})
            this.obj.current.pause()
        }
    }

    timerUpdate = (e) => {
        let input = e.target.currentTime
        let pad = function(input) {return (input < 10) ? "0" + input : input;};
        // let fps = 24;

        // console.log(e, this.timer.current)
        // let video = e.target
        // let s = parseInt(video.currentTime % 60);
        // let m = parseInt((video.currentTime / 60) % 60);

        const duration = e.target.duration;
        const currentTime = e.target.currentTime;
        this.prog.current.value = (currentTime / duration) * 100

        this.timer.current.innerHTML = [
            pad(Math.floor(input / 3600)),
            pad(Math.floor(input % 3600 / 60)),
            pad(Math.floor(input % 60)),
            // pad(Math.floor(input * fps % fps))
        ].join(':');
    }

    play = (e) => {
        let player = e.target
        this.setState({actionState: "play"})
        if (e.type === "play" && this.state.status !== "ad" && this.state.status !== "ad_now") {
            // this.playAd(player)
            // console.log(1)
            // this.playBack(player)
            // console.log(2)
        }

    }

    setTimeVideo = (e) => {
        let player = this.obj.current
        player.pause()
        player.currentTime = this.state.timeMouseMove
        // player.load()
        player.play()
        this.setState({action: "play"})
    }

    progressMouseMove = (event) => {
        this.timeLineBox.current.style.left = event.nativeEvent.offsetX -32 + 'px'
        // console.log()
        let input =  this.obj.current.duration / 100 * (event.nativeEvent.offsetX / this.prog.current.offsetWidth * 100) // @rinakranc
        let pad = function(input) {return (input < 10) ? "0" + input : input;};
        // let fps = 24;

        this.setState({timeMouseMove: input})
        // console.log(e, this.timer.current)
        // let video = e.target
        // let s = parseInt(video.currentTime % 60);
        // let m = parseInt((video.currentTime / 60) % 60);

        // const duration = e.target.duration;
        // const currentTime = e.target.currentTime;
        // this.prog.current.value = (currentTime / duration) * 100

        this.timeBox.current.innerHTML =  [
            pad(Math.floor(input / 3600)),
            pad(Math.floor(input % 3600 / 60)),
            pad(Math.floor(input % 60)),
            // pad(Math.floor(input * fps % fps))
        ].join(':')
        // console.log(event.nativeEvent.offsetX / this.prog.current.offsetWidth * 100)
        // this.timeLineBox.current.style.left = event.nativeEvent.offsetX -32
    }

    render() {
        let store = this.state.store.getState()
        return (
            <>
                <div className="video-wrapper"  ref={this.fullScreen} >
                    <video onContextMenu={(event)=>{event.preventDefault()}} poster={poster} ref={this.obj} width="100%" id="video" controls={false} onPlay={this.play} onTimeUpdate={this.timerUpdate} onLoadedData={()=>{this.setState({actionState: "load"})}}>
                        <source
                            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            type="video/mp4"
                        />
                        Your browser doesn't support HTML5 video tag.
                    </video>
                    <div className="controls-video-wrapper" id="controls_bar" onMouseEnter={()=>{this.setState({showControl: true})}} onMouseLeave={()=>{this.setState({showControl: false})}}>
                        <div className="controls-video-panel" style={{opacity: !this.state.showControl && this.state.action === "play" ? "0" : "1",}} ref={this.controls}>
                            <div className="action-button-wrapper">
                                {
                                    this.state.action === "pause" ?
                                        <img src={play} action="play" onClick={this.action} className="action-button" alt="play"/>
                                    :
                                        <img src={pause} action="pause" onClick={this.action} className="action-button" alt="play"/>
                                }
                            </div>
                            <div ref={this.timer} className="controls-video-time-wrapper">
                                00:00:00
                            </div>
                            {/*<div className="action-button-wrapper" style={{width: "15px", height: "15px", margin: "0 5px"}}>*/}
                            {/*    {*/}
                            {/*        this.state.actionState === "load" ?*/}
                            {/*            <div className="loader-small" style={{width: "15px", height: "15px"}}/>*/}
                            {/*            :*/}
                            {/*            null*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div className="controls-video-time-progress-wrapper">
                                {
                                    this.state.status === "ad_now" ?
                                       <span style={{fontSize: "12px"}}>Реклама</span>
                                    :
                                        <>
                                            <progress
                                                className="controls-video-time-progress"
                                                value="0"
                                                onMouseMove={this.progressMouseMove}
                                                ref={this.prog}
                                                max={"100"}
                                                onMouseEnter={()=> this.setState({showTimeLineBox: true})}
                                                onMouseLeave={()=> this.setState({showTimeLineBox: false})}
                                                onClick={this.setTimeVideo}
                                            />
                                            <div className="time-now-video-mouse" ref={this.timeLineBox} style={{opacity: !this.state.showTimeLineBox ? "0" : "1"}}>
                                                <div ref={this.timeBox}>00:00:00</div>
                                                <div className="triangle-bottom-position">
                                                    <div className="triangle-bottom"></div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                            <div className="logo-video">
                                <img src={logo} action="pause" className="logo-video-img" alt="logo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Video;
