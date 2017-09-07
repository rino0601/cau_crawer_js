/**
 * Created by rino0 on 2017-09-07.
 */
import React from "react";
import {Embed} from "semantic-ui-react"

class Home extends React.Component {
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
                <Embed
                    id='O6Xo21L0ybE'
                    source='youtube'
                />
            </div>
        );
    }
}

export default Home;