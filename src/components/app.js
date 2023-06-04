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
import Targets from "./targets";
import Contact from "./contact";
import {toast, ToastContainer} from 'react-toastify';
import ReactRain from 'react-rain-animation';

import 'react-toastify/dist/ReactToastify.css';

// import all the styles
import "react-rain-animation/lib/style.css";
import Admin from "./admin";
import Tasks from "./tasks";
import Wallet from "./wallet";
import Settings from "./settings";
import WalletUser from "./walletUser";
import Pay from "./pay_s";
import Agreement from "./agreement";
import AuthVK from "./error_auth_vk";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            store: this.props.store,
            snow: false,
            rain: false
        }

        this.routes = mount({
            '/' : route({view: <Content store={this.state.store}/>}),
            '/jobs' : route({view: <Jobs store={this.state.store}/>}),
            '/login' : route({view: <Login store={this.state.store}/>}),
            '/about' : route({view: <Contact store={this.state.store}/>}),
            '/admin' : route({view: <Admin store={this.state.store}/>}),
            '/wallet' : route({view: <Wallet store={this.state.store}/>}),
            '/withdrawal' : route({view: <WalletUser store={this.state.store}/>}),
            '/s/pay' : route({view: <Pay store={this.state.store}/>}),
            '/error_auth_vk' : route({view: <AuthVK store={this.state.store}/>}),
            '/settings' : route({view: <Settings store={this.state.store}/>}),
            '/registration' : route({view: <Registration store={this.state.store}/>}),
            '/agreement' : route({view: <Agreement store={this.state.store}/>}),

            '/targets' : route( request => {

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
                        if (res.status.message === null) {

                            fetch(`/core/v1/service/user/${res.data.id}`, {
                                method: "GET",
                                headers: {
                                    "Authorization": window.localStorage.getItem("token")
                                }
                            })
                                .then(response => response.json())
                                .then(res => {
                                    if (res.status.message === null) {
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: res.data.id,
                                                number: res.data.number_phone,
                                                login: res.data.login,
                                                auth: true,
                                                execute: res.data.execute,
                                                admin: res.data.admin,
                                                balance: res.data.balance,
                                                number_phone: res.data.number_phone,
                                                block: res.data.block,
                                                cause: res.data.cause,
                                                tg: res.data.tg,
                                                vkToken: res.data.vk_token,
                                                vkUserFirstName: res.data.vk_user_first_name,
                                                vkUserLastName: res.data.vk_user_last_name,
                                            },
                                        })
                                    }else{
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: 0,
                                                number: 0,
                                                login: null,
                                                auth: false
                                            },
                                        })
                                    }

                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        }else{
                            this.state.store.dispatch({
                                type: "update_user", value: {
                                    load: false,
                                    id: 0,
                                    number: 0,
                                    login: null,
                                    auth: false
                                },
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });

                return {
                    title: `user`,
                    view: <Targets store={this.state.store} type={"executor"}/>,
                }
            }),
            '/tasks' : route( request => {
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
                        if (res.status.message === null) {

                            fetch(`/core/v1/service/user/${res.data.id}`, {
                                method: "GET",
                                headers: {
                                    "Authorization": window.localStorage.getItem("token")
                                }
                            })
                                .then(response => response.json())
                                .then(res => {
                                    if (res.status.message === null) {
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: res.data.id,
                                                number: res.data.number_phone,
                                                login: res.data.login,
                                                auth: true,
                                                execute: res.data.execute,
                                                admin: res.data.admin,
                                                balance: res.data.balance,
                                                number_phone: res.data.number_phone,
                                                block: res.data.block,
                                                cause: res.data.cause,
                                                tg: res.data.tg,
                                                vkToken: res.data.vk_token,
                                                vkUserFirstName: res.data.vk_user_first_name,
                                                vkUserLastName: res.data.vk_user_last_name,
                                            },
                                        })
                                    }else{
                                        this.state.store.dispatch({
                                            type: "update_user", value: {
                                                load: false,
                                                id: 0,
                                                number: 0,
                                                login: null,
                                                auth: false
                                            },
                                        })
                                    }

                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        }else{
                            this.state.store.dispatch({
                                type: "update_user", value: {
                                    load: false,
                                    id: 0,
                                    number: 0,
                                    login: null,
                                    auth: false
                                },
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });

                return {
                    title: `user`,
                    view: <Tasks store={this.state.store} type={"executor"}/>,
                }
            }),
        })

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())

            let state = this.state.store.getState()

            if (state.error.showError) {
                toast.error(state.error.errorText, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            if (state.error.showInfo) {
                toast.info(state.error.infoText, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    componentDidMount () {
        fetch("/core/v1/system/settings", {
            method: "GET",
        })
            .then(response => response.json())
            .then(res => {
                this.state.store.dispatch({
                    type: "set_settings", value: {
                        snow: res.data.snow,
                        rain: res.data.rain
                    },
                })
                this.setState({snow: res.data.snow, rain: res.data.rain})
            })
            .catch(error => {
                console.log(error)
            })

        fetch(`/core/v1/system/is_auth`, {
            method: "GET",
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status.message === null) {

                    fetch(`/core/v1/service/user/${res.data.id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": window.localStorage.getItem("token")
                        }
                    })
                        .then(response => response.json())
                        .then(res => {
                            if (res.status.message === null) {
                                this.state.store.dispatch({
                                    type: "update_user", value: {
                                        load: false,
                                        id: res.data.id,
                                        number: res.data.number_phone,
                                        login: res.data.login,
                                        auth: true,
                                        execute: res.data.execute,
                                        admin: res.data.admin,
                                        balance: res.data.balance,
                                        number_phone: res.data.number_phone,
                                        block: res.data.block,
                                        cause: res.data.cause,
                                        tg: res.data.tg,
                                        vkToken: res.data.vk_token,
                                        vkUserFirstName: res.data.vk_user_first_name,
                                        vkUserLastName: res.data.vk_user_last_name,
                                    },
                                })
                            }else{
                                this.state.store.dispatch({
                                    type: "update_user", value: {
                                        load: false,
                                        id: 0,
                                        number: 0,
                                        login: null,
                                        auth: false
                                    },
                                })
                            }

                        })
                        .catch(error => {
                            console.log(error)
                        });
                }else{
                    this.state.store.dispatch({
                        type: "update_user", value: {
                            load: false,
                            id: 0,
                            number: 0,
                            login: null,
                            auth: false
                        },
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        let state = this.state.store.getState()
        return (
            <>
                <ToastContainer
                    position="top-center"
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
                    state.settings.snow === true ?
                        <Snowfall/>
                    :
                        this.state.rain === true ?
                            <ReactRain
                                numDrops="500"
                            />
                        :
                            null
                }
                <Header auth={false} store={this.state.store}/>
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
