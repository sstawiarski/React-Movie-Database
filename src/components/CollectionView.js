import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const CollectionView = (props) => {

    const [{
        data,
        origData,
        offset,
        pageCount,
        currentPage
    }, setState] = React.useState({
        data: [],
        origData: [],
        offset: 0,
        pageCount: 0,
        currentPage: 1
    });

    React.useEffect(() => {
        setState({
            origData: props.data,
            data: props.data.slice(0, props.perPage),
            pageCount: Math.ceil(props.data.length / props.perPage)
        })
    }, [props.data, props.perPage]);

    const handlePageClick = (direction) => {
        let offset = Math.ceil(currentPage * props.perPage) * direction;
        
        setState({
            offset: offset,
            currentPage: currentPage + direction
        });
    }

    React.useEffect(() => {
        const length = origData.length > offset + props.perPage ? offset + props.perPage : origData.length;
        setState({ data: origData.slice(offset, length) })
    }, [offset, currentPage, origData, props.perPage])

        return (
            <div className="collection-view">
                <Table bordered hover style={{ width: "85%", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title (Year)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => window.location = `/details/${item.imdb}`}>
                                    <td>{item.imdb}</td>
                                    <td>{item.title} ({item.year})</td>
                                </tr>

                            );
                        }) : null}
                    </tbody>
                </Table>
                <div className="pagination" style={{ left: "50%", transform: "translate(40%, 0%)" }}>
                    {currentPage > 1 ? <Button variant="outline-primary" onClick={() => handlePageClick(-1)}>Previous</Button> : <Button variant="outline-primary" disabled>Previous</Button>}
                    {currentPage < pageCount ? <Button variant="outline-primary" style={{ margin: "0px 10px 0px 10px" }} onClick={() => handlePageClick(1)}>Next</Button> : <Button variant="outline-primary" style={{ margin: "0px 10px 0px 10px" }} disabled>Next</Button>}
                </div>
            </div >
        );

}

export default CollectionView;