import React from 'react';
import { Card } from 'react-bootstrap';

class ProfileSidebar extends React.Component {
    render() {
        const { age, location, email, username, profilePicture } = this.props.userInfo;
        return (
            <Card>
                <Card.Header>User Information</Card.Header>
                <Card.Img src={profilePicture} style={{display: "block", width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}} />
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