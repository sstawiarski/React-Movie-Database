import React from 'react';
import { ReactComponent as UserLogo } from '../assets/user-male-circle.svg'

const Profile = () => (
    <div className="profile">
        <a href="/signin" className="profile-text">Sign In</a>
        <UserLogo className="profile-image" onClick={()=> alert("Clicked!")}/>
    </div>
);

export default Profile;