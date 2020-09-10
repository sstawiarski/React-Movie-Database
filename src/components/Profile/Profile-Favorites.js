import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
    background: #eee;
    border: 3px solid transparent;
    width: 100px;
    margin: 0px 10px 0px 10px;

    &:hover {
        background: #e1e1e1;
        border: 3px solid black;
    }
`;

const DetailsLink = styled.span`
    float: right;
`;

const ProfileFavorites = ({ favorites, count, username }) => {
        return (
            <div>

                {favorites ?
                    <Card style={{ marginTop: "10px" }}>
                        <Card.Header>Favorites {count > 5 ? <Link to={`/profile/${username}/favorites`}><DetailsLink>See All</DetailsLink></Link>: null}</Card.Header>

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
                                            <Image src={item.poster} alt={`Poster for ${item.title}`} />
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