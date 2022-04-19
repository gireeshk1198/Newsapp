import React, { Component } from 'react'
import "./Newsitem.css"
import Modal from './Modal';


export class NewsItem extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        let { title, description, urlToImage,author, name, publishedAt} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        left: '1'
                    }
                    }>

                        <span className="badge rounded-pill bg-danger"> {name} </span>
                    </div>
                    <img src={!urlToImage ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        {/* <a rel="noreferrer" href={url} target="_blank" className="align-self-end btn btn-info btn-sm">Read More</a> */}

                        
                            
                        
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <img src={!urlToImage ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : urlToImage} className="card-img-top" alt="..." />
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(publishedAt).toGMTString()}</small></p>
                        </Modal>
                        <button style={{color:"blue"}} type="button" onClick={this.showModal}>
                            ReadMore
                        </button>
                        </div> 
                    </div>

                </div>

        )
    }
}

export default NewsItem
