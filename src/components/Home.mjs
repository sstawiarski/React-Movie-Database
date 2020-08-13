import React from 'react';
import { Body } from "./Body";
import { Featured, FeaturedEditor } from './Featured';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends React.Component {
    render() {
        return (
            <div id="main-content">
                <Row>

                    <Col>
                        <Body />
                    </Col>

                    <Col xs={4}>
                        <Featured key={Date.now()} bg="light" />
                        <FeaturedEditor />
                    </Col>

                </Row>


            </div>

        );
    }
}

export default Home;