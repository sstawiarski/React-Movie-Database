import React from 'react';
import { Link } from 'react-router-dom'
import ProfileBody from '../components/Profile/Profile-Body';
import ProfileSidebar from '../components/Profile/Profile-Sidebar';
import ProfileFavorites from '../components/Profile/Profile-Favorites';

import { Container, Row, Col } from 'react-bootstrap';

import { store } from '../authentication/UserProvider';

const UserProfile = (props) => {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const fetchInfo = async () => {
            fetch(`${process.env.REACT_APP_SERVER_ADDR}/profile/${props.match.params.username}`)
                .then(response => response.json())
                .then(json => setUser(json));
        }
        fetchInfo();
    }, [props.match.params.username])


    const value = React.useContext(store);
    const { isAdmin } = value.state;

    return (
        <Container className="main-content">

            {user && (user.username === props.match.params.username || isAdmin) ? <div className="edit-profile-button"><Link to={`/profile/${props.match.params.username}/edit`}><span>Edit profile</span></Link></div> : null}


            <Row>
                <Col xs={12} md={8}>
                    <Row>
                        <Col>
                            {user ? <ProfileBody profileText={user.profileText} /> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {user ? <ProfileFavorites favorites={user.favorites} count={user.favoriteCount} username={user.username} /> : null}
                        </Col>
                    </Row>

                </Col>

                <Col xs={12} md={4}>
                    {user ? <ProfileSidebar userInfo={user} /> : null}
                </Col>
            </Row>
        </Container>
    );
}


export default UserProfile;