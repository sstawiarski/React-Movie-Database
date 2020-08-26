import React from 'react';

import UserContext from './UserContext'

import roles from './roles'
import { auth } from './firebase/firebase.utils';

class UserProvider extends React.Component {
    state = {
        user: null,
        isAdmin: false
    };

    checkAdmin = () => {
        if (this.state.user && roles.hasOwnProperty(this.state.user.uid)) {
            if (roles[this.state.user.uid] === "admin") return true;
        }

        return false;
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ user: user}, () => {
                this.setState({isAdmin: this.checkAdmin()})
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <UserContext.Provider value={{
                user: this.state.user,
                isAdmin: this.state.isAdmin
            }} >

                {this.props.children}

            </UserContext.Provider>
        );
    }
}

export default UserProvider;