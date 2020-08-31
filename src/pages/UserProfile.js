import React from 'react';
import { Link } from 'react-router-dom'
import ProfileBody from '../components/Profile/Profile-Body';
import ProfileSidebar from '../components/Profile/Profile-Sidebar';
import ProfileFavorites from '../components/Profile/Profile-Favorites';

import { Container, Row, Col } from 'react-bootstrap';

import UserContext from '../UserContext';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }


    componentDidMount() {
        this.fetchInfo();
    }


    fetchInfo = async () => {
        fetch(`http://localhost:4000/profile/${this.props.match.params.email}`)
            .then(response => response.json())
            .then(json => this.setState({ user: JSON.parse(json) }));
    }

    render() {
        return (
                <Container className="main-content">
                    <UserContext.Consumer>
                        {value => {
                            if (value.user) {
                                if (value.user.email === this.props.match.params.email || value.isAdmin) {
                                    return <div className="edit-profile-button"><Link to={`/profile/${this.props.match.params.email}/edit`}><span>Edit profile</span></Link></div>
                                } else {
                                    return null;
                                }
                            }
                        }}
                    </UserContext.Consumer>
                    <Row>
                        <Col xs={12} md={8}>
                            <Row>
                                <Col>
                                    {this.state.user ? <ProfileBody profileText={this.state.user.profileText} /> : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.state.user ? <ProfileFavorites favorites={this.state.user.favorites} count={this.state.user.favoriteCount} email={this.state.user.email} /> : null}
                                </Col>
                            </Row>

                        </Col>

                        <Col xs={12} md={4}>
                            {this.state.user ? <ProfileSidebar userInfo={this.state.user} /> : null}
                        </Col>
                    </Row>
                </Container>
        );
    }
}


export default UserProfile;