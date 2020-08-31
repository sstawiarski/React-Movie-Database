import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

class FavoritesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.email,
            favorites: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/profile/${this.state.email}/all`)
            .then(response => response.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ favorites: json.favorites })
            })
    }

    render() {
        return (
            <div className="favorites-detail-box">
                <h3 className="userpage-header" style={{ marginTop: "10px", textAlign: "center" }}>{`${this.state.email}'s Favorites`}</h3>
                <Card bg="light">
                    <Card.Body>
                        <div className="item-grid">
                            {this.state.favorites.map(item => {
                                return (
                                    <div className="userpage-item" key={item.imdb}>
                                        <Link to={`/details/${item.imdb}`}>
                                            <img src={item.poster} alt={`Poster for ${item.title}`} style={{ width: "100px" }} />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default FavoritesDetail;