/**
 * Created by rino0 on 2017-09-08.
 */
import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Button, Card, Image, Menu, Popup} from "semantic-ui-react";


class LoginItem extends React.Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        avatar: PropTypes.string
    };
    static defaultProps = {
        avatar: "http://www.gravatar.com/avatar/?d=identicon"
    };
    // static  childContextTypes = {};
    // static contextTypes = {};

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    renderContent = () => (
        <Card>
            <Card.Content>
                <Image floated='right' size='mini' src='http://www.gravatar.com/avatar/?d=identicon'/>
                <Card.Header>
                    Steve Sanders
                </Card.Header>
                <Card.Meta>
                    Friends of Elliot
                </Card.Meta>
                <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' icon="setting" content="설정"/>
                    <Button basic color='red' icon="sign out" content="로그아웃"/>
                </div>
            </Card.Content>
        </Card>
    );

    render() {
        return (
            <div>
                {this.props.isLogin
                    ? <Popup
                        style={{padding: 0}}
                        trigger={<Menu.Item style={{
                            paddingTop: 7, paddingBottom: 7
                        }}><Image src={this.props.avatar} avatar/></Menu.Item>}
                        on='click'
                        position='bottom right'
                        offset={-20}
                        content={this.renderContent()}
                        hideOnScroll
                    />
                    : <Menu.Item as={Link} name='sign in' icon="sign in" to="/account"/>
                }
            </div>
        );
    }
}

export default LoginItem;