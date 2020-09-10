import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileBody = (props) => {

    const { profileText } = props;
    return (
        <Card>
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
                {profileText ? profileText : null}
            </Card.Body>
        </Card>
    );

}

export default ProfileBody;