import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserLogo } from '../assets/user-male-circle.svg'
import { auth } from '../firebase/firebase.utils'
import UserContext from '../UserContext'

const Profile = () => {
    const context = React.useContext(UserContext);
    const currentUser = context.user;
    return (
        <div className="profile">
            {
                currentUser ?
                    <div>
                        <Link to="/" className="profile-text" onClick={() => auth.signOut()}>Sign Out</Link>
                        <Link to={`/profile/${currentUser.email}`}>
                            <UserLogo className="profile-image" />
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to="/signin" className="profile-text">Sign In</Link>
                        <Link to="/signin" className="profile-text">
                            <UserLogo className="profile-image" />
                        </Link>
                    </div>
            }

        </div>
    )
};

export default Profile;