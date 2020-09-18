import React, {useContext} from 'react';
import {Body} from "../components/Body";
import Featured from '../components/Featured';
import FeaturedMovieEditor from '../components/FeaturedMovieEditor'
import {PostCreator} from '../components/PostCreator'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {store} from '../authentication/UserProvider'

const Home = () => {
    const context = useContext(store);
    const loggedInAdmin = (context.state.user && context.state.isAdmin);
    return (
        <div>
            <Row>
                <Col xs={12} md={8}>
                    <Row>
                        <Col>
                            <Body/>
                        </Col>
                        {
                            loggedInAdmin ?
                                <Col xs={12}>
                                    <PostCreator/>
                                </Col>
                                :
                                null
                        }

                    </Row>

                </Col>

                <Col xs={12} md={4}>
                    <Featured bg="light"/>
                    {
                        loggedInAdmin ?
                            <FeaturedMovieEditor/>
                            :
                            null
                    }

                </Col>
            </Row>
        </div>
    );
}

export default Home;