import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ui from 'semantic-ui-react';
import {
    reduxForm, propTypes
} from "redux-form";

class SemanticUiReactReduxForm extends Component {
    static propTypes = {
        ...propTypes,
        title: PropTypes.string,
        descriptions: PropTypes.arrayOf(PropTypes.string),
        children: PropTypes.node,
        onDelete: PropTypes.func
    };
    state = {visible: false};
    toggleVisibility = () => this.setState({visible: !this.state.visible});
    confirmDelete = () => {
        this.props.onDelete(this.props.values);
        this.toggleVisibility();
    };

    // componentWillMount(){}
    // componentDidMount(){}
    // componentWillReceiveProps(nextProps){}
    // shouldComponentUpdate(nextProps, nextState){}
    // componentWillUnmount(){}

    render() {
        const {visible} = this.state;
        const {title, descriptions, children, handleSubmit, reset, pristine, submitting, submitSucceeded, submitFailed, warning} = this.props;
        return (
            <ui.Form
                error={submitFailed} success={submitSucceeded} warning={warning}
                loading={submitting} onSubmit={handleSubmit}
            >
                <ui.Message attached header={title} list={descriptions}/>
                <ui.Segment attached>{children}</ui.Segment>
                <ui.Message attached="bottom">
                    <ui.Sidebar.Pushable>
                        <ui.Sidebar.Pusher>
                            <ui.Grid padded>
                                <ui.Grid.Column mobile={16} tablet={8} computer={10}>
                                    <ui.Message error header='Input Error' content={this.props.error}/>
                                    <ui.Message success header='Request Success' content={this.props.warning}/>
                                    <ui.Message warning header='Request Success' content={this.props.warning}/>
                                </ui.Grid.Column>
                                <ui.Grid.Column mobile={16} tablet={8} computer={6}>
                                    <ui.Button.Group fluid>
                                        <ui.Button type="button" icon="edit" color="green" disabled={true}/>
                                        {this.props.onDelete &&
                                        <ui.Button type="button" icon="trash" color="red" disabled={pristine || submitting}
                                                   onClick={this.toggleVisibility}/>
                                        }
                                        <ui.Button type="button" icon="undo" disabled={pristine || submitting} onClick={reset}/>
                                        <ui.Button color='black' disabled={pristine || submitting} labelPosition="right" icon='upload'
                                                   content="Submit" type="submit"/>
                                    </ui.Button.Group>
                                </ui.Grid.Column>
                            </ui.Grid>
                        </ui.Sidebar.Pusher>
                        <ui.Sidebar as={ui.Segment} animation='overlay' direction='top' visible={visible}>
                            <ui.Grid style={{padding: 0}}>
                                <ui.Grid.Column mobile={16} tablet={8} computer={10}>
                                    This action cannot be undone. Are you sure?
                                </ui.Grid.Column>
                                <ui.Grid.Column mobile={16} tablet={8} computer={6}>
                                    <ui.Button.Group fluid size="mini">
                                        <ui.Button
                                            color='red' icon='trash' labelPosition='right' content="Delete"
                                            type="button" name="confirm" onClick={this.confirmDelete}
                                        />
                                        <ui.Button
                                            icon='close' labelPosition='right' content="Cancel"
                                            type="button" name="cancel" onClick={this.toggleVisibility}
                                        />
                                    </ui.Button.Group>
                                </ui.Grid.Column>
                            </ui.Grid>
                        </ui.Sidebar>
                    </ui.Sidebar.Pushable>
                </ui.Message>
            </ui.Form>
        )
    }
}

export default reduxForm({})(SemanticUiReactReduxForm);