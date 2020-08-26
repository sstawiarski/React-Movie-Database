import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserLogo } from '../assets/user-male-circle.svg'
import { auth } from '../firebase/firebase.utils'

const Profile = ({ currentUser }) => (
    <div className="profile">
        {
            currentUser ?
            <div onClick={() => auth.signOut()}>
                Sign Out
            </div>
            :
            <Link to="/signin" className="profile-text">Sign In</Link>
        }
        <UserLogo className="profile-image" />
    </div>
);

export default Profile;