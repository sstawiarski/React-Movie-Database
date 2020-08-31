import React from 'react';
import { Card } from 'react-bootstrap';

class ProfileBody extends React.Component {
    render() {
        const { profileText } = this.props;
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