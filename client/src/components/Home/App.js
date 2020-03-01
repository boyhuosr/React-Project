import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';
import Menus from '../Menus';
import ArticleList from '../ArticleList';
import Footer from '../Footer';
import './style.css';
import 'antd/dist/antd.css';
import {Input, Button} from 'antd'

const {TextArea} = Input;


class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    title: '',
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (title, message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      title: title,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApplyTitle ,updateToApplyMessage) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      updateTitle: {title: updateToApplyTitle},
      updateMessage: {message: updateToApplyMessage}
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div className="h_container">
        <Header />
        <Menus />
        <ul className="container">
          {data.length <= 0
            ? 'NO ARTICLE YET'
            : data.map((dat) => (
                <ul  key={data.title}>
                  {/* <span style={{ color: 'gray' }}> id: </span> {dat.id} <br /> */}
                  <label>Title: {dat.title}</label> 
                  <span className="title"> <ArticleList /> </span>
                  <br />
                  <p className="message">{dat.message}</p>
                  <br />
                  
                </ul>
              ))}
        </ul>
        <div className="inputArea">
          <h3>Create an Article</h3>
          <TextArea
              className="inputTitle"
              onChange={(e) => this.setState({ title: e.target.value })}
              placeholder="add a title"
              autoSize={{minRows:1, maxRows:2}}
          />
          <div style={{ margin: '3px 0' }} />
          
          <TextArea
            className="inputContent"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add content"
            autoSize={{minRows:10, maxRows:20}}
          />
          <div style={{ margin: '3px 0' }} />
          <Button className="addButton" onClick={() => this.putDataToDB(this.state.title, this.state.message)}>
            Submit
          </Button>
        </div>
        {/* <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div> */}
        {/* <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <br />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApplyTitle: e.target.value })}
            placeholder="put new value of the title here"
          />
          <br />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApplyMessage: e.target.value })}
            placeholder="put new value of the message here"
          />
          <br />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApplyTitle, this.state.updateToApplyMessage)
            }
          >
            UPDATE
          </button>
        </div> */}

        <Footer />
      </div>
    );
  }
}

export default App;