/**
 * Created by rino0 on 2017-09-08.
 */
import React from "react";
import {Divider, Form, Message, Segment} from "semantic-ui-react"
import {Link} from "react-router-dom"

class Account extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    state = {};

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    render() {
        return (
            <Form>
                <Message
                    attached
                    header='Welcome to CAU Portal Helper'
                    list={[
                        "가입하신 소셜 계정으로 로그인 해주세요.",
                        "계정이 없으신 경우, portal.cau.ac.kr 계정과 최소 한개의 소셜 로그인 계정이 필요합니다.",
                        "소셜 계정의 이메일 주소로 이메일 알림을 하니, 주로 사용하는 계정으로 가입해주세요! ",
                        "가입시, 중앙대 포탈 로그인을 증명하는 절차를 거칩니다.",
                        "약관(?)에 동의 하지 않으면 이용 할 수 없습니다."
                    ]}
                />
                <Segment attached>
                    <Form.Group widths="equal">
                        <Form.Button type="button" fluid icon="google plus" color="google plus" content="Google+로 로그인하기"/>
                        <Form.Button type="button" fluid icon="facebook" color="facebook" content="Facebook 으로 로그인하기"/>
                    </Form.Group>
                    <Divider horizontal>Or</Divider>
                    <Link to="/account/register">
                        <Form.Button
                            fluid icon="signup" color="black" content="포탈 계정 인증하고 가입하기"/>
                    </Link>
                </Segment>
            </Form>
        );
    }
}

export default Account;