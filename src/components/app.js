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
import {toast, ToastContainer} from 'react-toastify';


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            snow: false
        }

        this.routes = mount({
            '/' : route({view: <Content store={this.state.store}/>}),
            '/jobs' : route({view: <Jobs store={this.state.store}/>}),
            '/login' : route({view: <Login store={this.state.store}/>}),
            '/about' : route({view: <Contact store={this.state.store}/>}),
            '/registration' : route({view: <Registration store={this.state.store}/>}),
            '/user/:id' : route( request => {

                fetch(`/core/v1/service/user/${request.params.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": window.localStorage.getItem("token")
                    }
                })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if (res.status.message === null) {
                            this.state.store.dispatch({
                                type: "update_user", value: {
                                    id: res.data.id,
                                    number: res.data.number,
                                    login: res.data.login,
                                    auth: true
                                },
                            })
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    });

                return {
                    title: `user`,
                    view: <User store={this.state.store} id={request.params.id} type={"executor"}/>,
                }
            }),
        })

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())

            let state = this.state.store.getState()

            console.log(state)

            // if (state.error.showError) {
            //     toast.error(state.error.errorText, {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            // }
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

        fetch(`/core/v1/system/is_auth`, {
            method: "GET",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                // window.location.href = `/user/${res.data.id}`

                if (res.status.message === null) {
                    this.state.store.dispatch({
                        type: "update_user", value: {
                            id: res.data.id,
                            number: res.data.number,
                            login: res.data.login,
                            auth: true
                        },
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {
                    this.state.snow ?
                        <Snowfall/>
                    :
                        null
                }
                <Header auth={false} load={true} store={this.state.store}/>
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
