import React from 'react';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

import ForumItem from '../components/ForumItem'

const Forums = ({ history }) => {

    const [forumList, setForumList] = React.useState(null)

    React.useEffect(() => {
        fetch("http://localhost:4000/forums")
            .then(response => response.json())
            .then(json => {
                if (json.forumsFound) setForumList(json.forumList);
            });
    }, [])

    return (
        <Container style={{display: "flex", alignContent: "center"}}>
            {forumList ? 
            <Table style={{ flexBasis: "1"}}>
                <tbody>
                {forumList.map(item => {
                    return <ForumItem key={item.id} history={history} name={item.name} id={item.id} />
                })}
                </tbody>
            </Table> 
            : null}
        </Container>
    );
}

export default Forums;