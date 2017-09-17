/**
 * Created by rino0 on 2017-09-10.
 */
import React from "react";
import {Form, Grid, Message, Progress, Segment} from "semantic-ui-react"
import {Field, reduxForm} from "redux-form"

import FormInput from "../component/FormInput";

const theAgreementString = "나는 운영 주체를 신뢰하고 서비스에 있어 계정 정보가 필요함을 이해 하였습니다";

const formName = "registerFrom";
const fieldAgreement = "agreement";
const fieldId = "id_";
const fieldPassword = "password";
const FirstStepForm = reduxForm({
    form: formName, // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: values => {
        const errors = {};
        return errors;
    }
})(({error, submitFailed, handleSubmit, pristine, submitting, onPrev}) => (
    <Form
        onSubmit={handleSubmit}
        error={submitFailed}
    >
        <Message
            attached
            header='약관 동의'
            list={[
                "(약식으로 설명합니다. 정식 약관은 필요할 때 적용할 예정)",
                "본 서비스를 제공,이용 함에 있어서, 학교측의 대응이 어떨지 모릅니다.",
                "때문에 언제든지 갑작스럽게 중단 될 수 있습니다.",
                "기술적 문제로 인해 portal.cau.ac.kr 의 계정을 직접 입력 받습니다.",
                "everytime.kr 과 같은 서비스와 달리, 폐기 하지 않습니다.",
                "입력 받은 계정 정보는 ID와 PW 모두 암호화 저장함을 보장 합니다.",
                "운영 주체를 신뢰 한다면 가입을 진행해주세요.",
                "아니라면 지금 창을 닫으시면 됩니다."
            ]}
        />
        <Segment attached>
            <Message
                color='yellow'
                header="약관 동의 안내"
                list={[
                    "약관에 동의 하시면, 아래 문장을 정확하게 따라 입력 해주세요.",
                    theAgreementString,
                ]}
            />
            <Field name={fieldAgreement}
                   validate={val => val === theAgreementString ? undefined : "일치 해야 합니다!"}
                   component={FormInput}
                   placeholder={theAgreementString}
            />
        </Segment>
        <Message attached="bottom">
            <Grid columns={2}>
                <Grid.Column>
                    <Form.Button type="button" fluid icon="arrow left" color="grey" content="이전 단계"
                                 onClick={onPrev}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Form.Button type="submit" fluid icon="arrow right" color="blue" content=" 다음 단계"
                                 disabled={pristine || submitting}
                    />
                </Grid.Column>
            </Grid>
        </Message>
    </Form>
));

const SecondStepForm = reduxForm({
    form: formName, // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: values => {
        const errors = {};
        return errors;
    }
})(({error, submitFailed, handleSubmit, pristine, submitting, onPrev}) => (
    <Form
        onSubmit={handleSubmit}
        error={submitFailed}
    >
        <Message
            attached
            header='Portal 계정 증명'
            list={[
                "본명과 http://portal.cau.ac.kr 에서 사용하는 계정을 입력 해주세요.",
                "서버에서, 받은 값을 통해, 실제로 접속을 시도해 봅니다. 이름은 저장하지 않습니다!",
                "수강 신청 기간등, 메인화면이 로그인 화면이 아닐때, 안 될 수도 있습니다.",
            ]}
        />
        <Segment attached>
            <Form.Group widths="equal">
                <Field name={fieldId}
                       component={FormInput}
                       label="Id"
                />

                <Field name={fieldPassword}
                       component={FormInput}
                       label="Password"
                       type="password"
                />
            </Form.Group>

        </Segment>
        <Message attached="bottom">
            <Grid columns={2}>
                <Grid.Column>
                    <Form.Button type="button" fluid icon="arrow left" color="grey" content="이전 단계"
                                 onClick={onPrev}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Form.Button type="submit" fluid icon="arrow right" color="blue" content=" 다음 단계"
                                 disabled={pristine || submitting}
                    />
                </Grid.Column>
            </Grid>
        </Message>
    </Form>
));


class Register extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    state = {currentStep: 0};

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    handlePrev = () => {
        if (this.state.currentStep > 0) {
            this.setState({currentStep: this.state.currentStep - 1});
        }
    };
    handleNext = () => {
        this.setState({currentStep: this.state.currentStep + 1});
    };

    render() {
        const {currentStep} = this.state;
        return (
            <div>
                <Progress value={currentStep} total={2} size='small' progress autoSuccess/>
                {currentStep === 0 && <FirstStepForm onPrev={this.handlePrev} onSubmit={this.handleNext}/>}
                {currentStep === 1 && <SecondStepForm onPrev={this.handlePrev} onSubmit={this.handleNext}/>}
            </div>
        );
    }
}

export default Register;