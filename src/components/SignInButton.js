import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserLogo } from '../assets/user-male-circle.svg'
import { store } from '../authentication/UserProvider'

const Profile = (props) => {
    const context = React.useContext(store);
    const { user } = context.state;
    const { dispatch } = context;

    const signOut = async () => {
        await fetch(`${process.env.REACT_APP_SERVER_ADDR}/logout`)
        dispatch({type: 'logout'});
    }

    return (
        <div className="profile">
            {
                user ?
                    <div>
                        <Link to="/" className="profile-text" onClick={signOut}>Sign Out</Link>
                        <Link to={`/profile/${user}`}>
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
}

export default Profile;