import React, { Component } from 'react';
import './style.css';
import {Menu} from 'antd';

const categories = ['Home', 'iOS', 'Python', 'React.js'];

class Menus extends Component {
    constructor(props){
        super(props)
        this.state={
            current: categories[0]
        }
    }

    handleClick = (e) =>{
        console.log('click ', e);
        if(e.key === 'Home page'){
            // this.props.getArticleList('');
        }else{
            // this.props.getArticleList(e.key);
        }
        let toPath = e.key === 'Home page'?'/':'/'+e.key;
        this.setState({
            current: e.key,
        });
        this.props.history.push(toPath);
    }

    render() { 
        return ( 
            <Menu
                onClick = {this.handleClick}
                selectedKeys = {[this.state.current]}
                mode="horizontal"
                className="menucontainer"
            >
                {
                    categories.map((item, index)=>(
                        <Menu.Item className="menuitem" key = {item}>
                            {item}
                        </Menu.Item>
                    ))
                }
            </Menu>
         );
    }
}
 
export default Menus;