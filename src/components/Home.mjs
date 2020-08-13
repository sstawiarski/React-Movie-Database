import React from 'react';
import { Body } from "./Body";
import { Featured, FeaturedEditor } from './Featured';
import { PostCreator } from './PostCreator'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'

class Home extends React.Component {
    render() {
        return (
            <Container id="main-content">
                <Row>
                    <Col xs={12} md={8}>
                        <Body />
                    </Col>

                    <Col xs={12} md={4}>
                        <Featured key={Date.now()} bg="light" />
                        <FeaturedEditor />
                    </Col>
                </Row>
                <Row>
                    <PostCreator/>
                </Row>
            </Container>

        );
    }
}

export default Home;