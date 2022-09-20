import React, {Component, Suspense} from "react";
import Snowfall from 'react-snowfall'
import Header from "./header";
import Footer from "./footer";
import {NotFoundBoundary, Router, View} from 'react-navi'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {mount, route} from 'navi'
import Content from "./content";
import Jobs from "./jobs";
import Login from "./login";
import Registration from "./registration";
import User from "./user";
import Contact from "./contact";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            snow: true
        }

        this.routes = mount({
            '/' : route({view: <Content store={this.state.store}/>}),
            '/jobs' : route({view: <Jobs store={this.state.store}/>}),
            '/login' : route({view: <Login store={this.state.store}/>}),
            '/about' : route({view: <Contact store={this.state.store}/>}),
            '/registration' : route({view: <Registration store={this.state.store}/>}),
            '/user/:id' : route( request => {
                return {
                    title: `user`,
                    view: <User store={this.state.store} id={request.params.id} type={"executor"}/>,
                }
            }),
        })
    }

    componentDidMount () {
        fetch("/core/v1/system/settings", {
            method: "GET",
        })
            .then(response => response.json())
            .then(res => {
                this.setState({snow: res.data.snow})
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <>
                {
                    this.state.snow ?
                        <Snowfall/>
                    :
                        null
                }
                <Header auth={false} load={true}/>
                <div className="wrapper">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/"
                                   render={({history, match}) => <Router routes={this.routes} history={history}
                                                                         basename={match.url}>

                                       {/*<ToastContainer*/}
                                       {/*    position="bottom-right"*/}
                                       {/*    autoClose={2000}*/}
                                       {/*    hideProgressBar={false}*/}
                                       {/*    newestOnTop={false}*/}
                                       {/*    closeOnClick*/}
                                       {/*    rtl={false}*/}
                                       {/*    pauseOnFocusLoss*/}
                                       {/*    draggable*/}
                                       {/*    pauseOnHover*/}
                                       {/*/>*/}


                                       <NotFoundBoundary
                                           render={() =>
                                           <div className="wrapper-feed">
                                               <div className="wrapper-error">
                                                   <div className="error">404 Такой страницы не существует</div>
                                                   <div className="error small-text">вернуться <div
                                                       style={{textDecoration: "underline", cursor: "pointer"}}
                                                       onClick={() => {window.history.go(-1)}}>Назад</div></div>
                                               </div>
                                           </div>}>
                                           <Suspense fallback={false}>
                                               <View />
                                           </Suspense>
                                       </NotFoundBoundary>
                                       <Footer/>
                                   </Router>

                               }/>

                        </Switch>
                    </BrowserRouter>
                </div>
            </>
        )
    }
}

export default App;
