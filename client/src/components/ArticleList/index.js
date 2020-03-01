import React, { Component } from 'react';
import './style.css';

class ArticleList extends Component {
    
    render() { 
        return ( 
            <div>
                <div className="info">
                    <div className="tag">
                        <img src={require('./calendar.png')} alt="Publish Date" />
                        <div>2020-02-22</div>
                    </div>
                    <div className="tag">
                            <img src={require('./views.png')} alt="Readers"/>
                            <div>22</div>
                    </div>
                        <div className="tag">
                            <img src={require('./comments.png')} alt="Comments"/>
                            <div>11</div>
                        </div>
                </div>
            </div>
         );
    }
}
 
export default ArticleList;