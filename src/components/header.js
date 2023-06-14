import React, {Component} from "react";
import target from "../icon/target.webp"
// import { Dropdown, Menu } from 'semantic-ui-react'
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Dns from '@mui/icons-material/Dns';
import People from '@mui/icons-material/People';
import Mony from '@mui/icons-material/Money';
// import 'semantic-ui-css/semantic.min.css'

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: props.auth,
            store: this.props.store,
            targetAction: "sign-in",
            isAuthOpen: false,
            openMenu: false,
            anchorEl: null,
        }

        this.state.store.subscribe(() => {
            this.setState(this.state.store.getState())
        })
    }

    handleClose = (e) => {
        this.setState({openMenu: false, anchorEl: e.currentTarget})
    }

    handleClick = (e) => {
        this.setState({openMenu: true, anchorEl: e.currentTarget})
    }

    render() {
        let store = this.state.store.getState()
        return (
            <div className="header-bg">
                <div className="wrapper-header">
                    <div className="place-logo" >
                        <div className="place-logo" onClick={(e) => {
                            e.preventDefault();
                            if (store.user.auth) {
                                if (store.user.execute === true) {
                                    window.location.href = '/tasks/'
                                } else {
                                    window.location.href = '/targets/'
                                }
                            }else{
                                window.location.href = '/'
                            }
                        }}>
                            <div className="wrapper-logo-img">
                                <img src={target} className="logo-img" alt="logo"/>
                            </div>
                            <div className="logo-text-t">Target Boost</div>
                        </div>

                        <div className="wrapper-navigation">
                            <div className="navigation-preview">
                                <div className="flex-left-right">

                                    <div className="unselectable button-light active-white" target="all" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/'
                                    }}>Главная</div>
                                    <div className="unselectable button-light" target="history" >Монетезация</div>
                                    <div className="unselectable button-light" target="history" >Блог</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-auth">
                        {
                            store.user.load === false ?
                                store.user.auth === true ?
                                    <React.Fragment>
                                        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                                            <Typography sx={{ minWidth: 100 }}>Ваш баланс: { (parseFloat(store.user.balance)).toLocaleString('ru')  } ₽</Typography>
                                            <Tooltip title="Настройки">
                                                <IconButton
                                                    onClick={this.handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={this.state.openMenu ? "account-menu" : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={this.state.openMenu ? "true" : undefined}
                                                >
                                                    {
                                                        store.user.mainPhoto !== "" ?
                                                            <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 30, height: 30 }}></Avatar>

                                                            :
                                                            <Avatar sx={{ width: 30, height: 30 }}></Avatar>
                                                    }
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Menu
                                            anchorEl={this.state.anchorEl}
                                            id="account-menu"
                                            open={this.state.openMenu}
                                            onClose={this.handleClose}
                                            onClick={this.handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: "visible",
                                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                    mt: 1.5,
                                                    "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1
                                                    },
                                                    "&:before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "background.paper",
                                                        transform: "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0
                                                    }
                                                }
                                            }}
                                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                        >
                                            <MenuItem onClick={()=>{window.location.href = '/settings'}}>
                                                <>
                                                {
                                                    store.user.mainPhoto !== "" ?
                                                        <Avatar src={`/core/v1/file_ch/${store.user.mainPhoto}`} sx={{ width: 60, height: 60 }}></Avatar>
                                                    :
                                                        <Avatar sx={{ width: 60, height: 60 }}></Avatar>
                                                }
                                                    {store.user.tg}
                                                </>

                                            </MenuItem>
                                            <Divider />
                                            {
                                                store.user.execute === true ?
                                                        <MenuItem onClick={()=>{window.location.href = '/tasks'}}>
                                                            <ListItemIcon>
                                                                <Dns fontSize="small" />
                                                            </ListItemIcon>
                                                            Задания
                                                        </MenuItem>

                                                    :
                                                        <MenuItem onClick={()=>{window.location.href = '/targets'}}>
                                                            <ListItemIcon>
                                                                <Dns fontSize="small" />
                                                            </ListItemIcon>
                                                            Рекламные кампании
                                                        </MenuItem>
                                            }
                                            {
                                                store.user.execute === true ?
                                                    <MenuItem onClick={()=>{window.location.href = '/withdrawal'}}>
                                                        <ListItemIcon>
                                                            <Mony fontSize="small" />
                                                        </ListItemIcon>
                                                        Заявка на вывод средств
                                                    </MenuItem>
                                                :
                                                    <MenuItem onClick={()=>{window.location.href = '/wallet'}}>
                                                        <ListItemIcon>
                                                            <Mony fontSize="small" />
                                                        </ListItemIcon>
                                                        Пополнить баланс
                                                    </MenuItem>

                                            }
                                            {
                                                store.user.admin === true ?
                                                    <>
                                                        <Divider />
                                                        <MenuItem onClick={()=>{window.location.href = '/admin'}}>
                                                            <ListItemIcon>
                                                                <People fontSize="small" />
                                                            </ListItemIcon>
                                                            Администратор
                                                        </MenuItem>
                                                        <Divider />
                                                    </>
                                                :
                                                    null
                                            }

                                            <MenuItem onClick={()=>{
                                                window.localStorage.removeItem('token')
                                                window.location.href = '/'
                                            }} >
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Выйти
                                            </MenuItem>
                                        </Menu>
                                    </React.Fragment>

                                :
                                    <>
                                        <div className="button-default-big unselectable" onClick={()=>{
                                            this.setState({showPopUp: true})
                                        }}>Войти</div>
                                    </>
                            :
                                <div className="loader-small"/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
