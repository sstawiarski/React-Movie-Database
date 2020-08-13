import React from 'react';
import { Body } from "./Body";
import { Featured, FeaturedEditor } from './Featured';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(text) {
        this.setState({featured: text});
    }

    render() {
        return (
            <div id="main-content">
                <Row>

                    <Col>
                        <Body />
                    </Col>

                    <Col xs={4}>
                        <Featured key={Date.now()} bg="light" featured={this.state.featured}/>
                        <FeaturedEditor onSubmit={this.handleSubmit}/>
                    </Col>

                </Row>


            </div>

        );
    }
}

export default Home;