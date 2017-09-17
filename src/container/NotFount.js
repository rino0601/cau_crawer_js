/**
 * Created by rino0 on 2017-09-07.
 */
import React from "react";
import ReduxForm from "../component/ReduxForm";
import FormInput from "../component/FormInput";
import {Field} from "redux-form"

class NotFount extends React.Component {
    static propTypes = {};
    // static defaultProps = {};
    // static  childContextTypes = {};
    // static contextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    // getChildContext() {}
    // componentDidMount(){}
    // componentWillUnmount(){}
    render() {
        return (
            <div>
                NOT FOUND!
                <ReduxForm
                    form="theform"
                    title="theform"
                    validate={(values)=>{
                        return {
                            asdf:"alowady"
                        }
                    }}
                >
                    <Field name="asdf" component={FormInput}/>
                </ReduxForm>
            </div>
        );
    }
}

export default NotFount;