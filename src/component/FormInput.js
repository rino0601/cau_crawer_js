/**
 * Created by rino0 on 2017-09-10.
 */
import React from "react";
import PropTypes from "prop-types";
import {Form, Popup} from "semantic-ui-react";

class FormInput extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        submitOnEnter: PropTypes.bool
    };
    state = {
        value: this.props.input.value
    };

    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps.input;
        this.setState({value});
    }

    onKeyPress = (e) => {
        if (this.props.submitOnEnter && e.key === "Enter") {
            this.props.input.onChange(e);
            this.props.input.onBlur(e);
        }
    };

    handleChange = (e, {value}) => {
        this.setState({value});
    };

    render() {
        const {input, meta, ...rest} = this.props;
        const {onChange, value, ...iinput} = input;
        return (
            <Popup
                trigger={<Form.Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.onKeyPress}
                    error={meta.touched && meta.invalid}
                    loading={meta.asyncValidating}
                    {...iinput}
                    {...rest}
                />}
                position='bottom left'
                open={meta.touched && meta.invalid}
                content={meta.error}
            />

        );
    }
}

export default FormInput;