import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

class ProfileSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { age, location, email, username } = this.props.userInfo;
        return (
            <Card>
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                    <p><b>Username: </b> {username}</p>
                    <p><b>Email: </b> {email}</p>
                    <p><b>Age: </b> {age}</p>
                    <p><b>Location: </b> {location}</p>
                </Card.Body>
            </Card>
        );
    }

}

export default ProfileSidebar;