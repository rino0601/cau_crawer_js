import React, {Component} from 'react';
import {Container, Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'
import {Link, Route, Switch} from 'react-router-dom'

import Home from "./Home";
import NotFound from './NotFount';
import Register from "./Register";
import Account from "./Account";
import LoginItem from "../component/LoginItem";

class App extends Component {

    state = {isSidebarOpen: false};

    openSidebar = () => this.setState({isSidebarOpen: true});
    closeSidebar = () => {
        if (this.state.isSidebarOpen) {
            this.setState({isSidebarOpen: false});
        }
    };


    render() {
        const {isSidebarOpen} = this.state;
        return (
            <Sidebar.Pushable as={Segment} style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}>
                <Sidebar as={Menu} animation='overlay' style={{width: 250}} visible={isSidebarOpen} icon='labeled'
                         vertical
                         inverted onClick={this.closeSidebar}>
                    <Menu.Item as={Link} name='gamepad' to="/game">
                        <Icon name='gamepad'/>
                        Games
                    </Menu.Item>
                    <Menu.Item name='camera'>
                        <Icon name='camera'/>
                        Channels
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher onClick={this.closeSidebar} dimmed={isSidebarOpen}>
                    <Menu pointing secondary size="large">
                        <Menu.Item icon="sidebar" onClick={this.openSidebar}/>
                        <Menu.Item as={Link} to="/">
                            <Menu.Header>
                                CAU Portal Helper
                            </Menu.Header>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <LoginItem isLogin={true}/>
                        </Menu.Menu>
                    </Menu>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/account" component={({match}) => (<Switch>
                                <Route path={match.url + "/register"} component={Register}/>
                                <Route path={match.url} component={Account}/>
                            </Switch>)}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default App;
