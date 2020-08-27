import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

class ProfileBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { profileText, favorites } = this.props;
        return (
            <Card>
                <Card.Header>User Profile</Card.Header>
                <Card.Body>
                    {profileText ? profileText : null}
                </Card.Body>
            </Card>
        );
    }

}

export default ProfileBody;