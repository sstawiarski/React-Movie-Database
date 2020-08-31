import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ProfileFavorites extends React.Component {
    render() {
        const { favorites } = this.props;
        return (
            <div>
                {favorites ?
                    <Card style={{ marginTop: "10px" }}>
                        <Card.Header>Favorites</Card.Header>
                        <Card.Body style={{ display: "flex", justifyContent: "space-evenly" }}>
                            {favorites.slice(0, 5).map((item) => {
                                return (
                                    <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip className="favorites-tooltip">
                                            <span>{`${item.title} (${item.year})`}</span>
                                        </Tooltip>
                                    }
                                    key={item.imdb}>
                                        <Link to={`/details/${item.imdb}`}>
                                            <img src={item.poster} alt={`Poster for ${item.title}`} style={{ width: "100px", margin: "0px 10px 0px 10px" }} />
                                        </Link>
                                    </OverlayTrigger>
                                )
                            })}
                        </Card.Body>
                    </Card>
                    : null}
            </div>
        );
    }

}

export default ProfileFavorites;