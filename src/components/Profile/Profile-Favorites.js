import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileFavorites = ({ favorites, count, email }) => {
        return (
            <div>
                {favorites ?
                    <Card style={{ marginTop: "10px" }}>
                        <Card.Header>Favorites {count > 5 ? <Link to={`/profile/${email}/favorites`}><span style={{float: "right"}}>See All</span></Link>: null}</Card.Header>
                        <Card.Body style={{ display: "flex", justifyContent: "space-evenly" }}>
                            {favorites.map((item) => {
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

export default ProfileFavorites;