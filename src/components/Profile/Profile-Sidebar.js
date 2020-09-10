import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileSidebar = (props) => {

    const { age, location, email, username, profilePicture } = props.userInfo;
    return (
        <Card>
            <Card.Header>User Information</Card.Header>
            <Card.Img src={profilePicture} style={{ display: "block", width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }} />
            <Card.Body>
                <p><b>Username: </b> {username}</p>
                <p><b>Email: </b> {email}</p>
                {age ? <p><b>Age: </b> {age}</p> : null}
                {location ? <p><b>Location: </b> {location}</p> : null}
            </Card.Body>
        </Card>
    );

}

export default ProfileSidebar;