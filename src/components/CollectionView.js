import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class CollectionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            origData: [],
            offset: 0,
            pageCount: 0,
            currentPage: 1
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                origData: this.props.data,
                data: this.props.data.slice(0, this.props.perPage),
                pageCount: Math.ceil(this.props.data.length / this.props.perPage)
            })
        }
    }

    handlePageClick = (direction) => {
        let offset = Math.ceil(this.state.currentPage * this.props.perPage) * direction;
        this.setState({
            offset: offset,
            currentPage: this.state.currentPage + direction
        }, () => {
            const length = this.state.origData.length > this.state.offset + this.props.perPage ? this.state.offset + this.props.perPage : this.state.origData.length;
            this.setState({ data: this.state.origData.slice(this.state.offset, length) })
        });

    }

    render() {
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
                        {this.state.data ? this.state.data.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => window.location = `/details/${item.imdb}`}>
                                    <td>{item.imdb}</td>
                                    <td>{item.title} ({item.year})</td>
                                </tr>

                            );
                        }) : null}
                    </tbody>
                </Table>
                <div className="pagination" style={{ left: "50%", transform: "translate(50%, 0%)" }}>
                    {this.state.currentPage > 1 ? <Button variant="outline-primary" onClick={() => this.handlePageClick(-1)}>Previous</Button> : <Button variant="outline-primary" disabled>Previous</Button>}
                    {this.state.currentPage < this.state.pageCount ? <Button variant="outline-primary" style={{ margin: "0px 10px 0px 10px" }} onClick={() => this.handlePageClick(1)}>Next</Button> : <Button variant="outline-primary" style={{ margin: "0px 10px 0px 10px" }} disabled>Next</Button>}
                </div>
            </div >
        );
    }

}

export default CollectionView;