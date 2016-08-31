import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';

import './styles/index2.css';
import './styles/bootstrap.css';
import './styles/materialdesignicons.min.css';
import './styles/font-awesome.css';

import MainContributor from './pages/GithubPage';

var GithubHeader = React.createClass({
  render: function() {
    return(
        <div className="header">
          <h3>Git Hub Repo Search <i className="fa fa-search"></i></h3>
        </div>
    );
  }
});

var GithubSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.in);
    if (input.value!==""){
      this.props.display(input.value);
      this.props.apiRequest(input.value);
    }
  },
  render: function() {
    return(
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="input" ref="in" placeholder="Github Repo Name"/>
          </form>
        </div>
    );
  }
});

var GithubProfile = React.createClass({
  render: function() {
    //var pass = this.props.datas.full_name;
    return(
      <Link to={`/GithubPage/${this.props.datas.full_name}`}>
      <div className="col-md-4">
        <div className="profile">
          <div className="row">
            <div className="col-md-3">
              <img src={this.props.datas.owner.avatar_url} alt="" width="70" />
            </div>
            <div className="col-md-9">
              <p> Full-Name: {this.props.datas.full_name}</p>
              <p> Url: {this.props.datas.repos_url}</p>
              <p> Forks: {this.props.datas.forks}</p>
              <p> Language: {this.props.datas.language}</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  }
});

var Card = React.createClass({
  getInitialState: function() {
    return{
      repoName: "tetris",
      msg: "",
      get: [],
    };
  },
  display: function(item) {
    this.setState({
      repoName: item,
      msg: "The repositories with "+item+" as their names are",
    });
  },
  apiRequest: function(item) {
    var th = this;
    //const url = "https://api.github.com/users/"+this.state.repoName;
    var url = "https://api.github.com/search/repositories?q="+item;
    axios.get(url)
    .then(function (response) {
      th.setState({get: response.data.items});
    });
  },
  render: function() {
    var cards = this.state.get.map(function(card,i) {
      return (<GithubProfile datas={card} key={i} />)
    });
    return(
        <div className="card">
          <div className="container-fluid">
            <GithubHeader />
            <GithubSearch apiRequest={this.apiRequest} display={this.display} >{this.state.repoName}</GithubSearch>
            <h4 className="text-center">{this.state.msg}</h4>
            <div className="inner">
              <div className="row">
                {cards}
              </div>
            </div>
          </div>
        </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

const root = document.getElementById('root');
//ReactDOM.render(<Card />, root)
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Card}></IndexRoute>
      <Route path="GithubPage/:login/:name" component={MainContributor}></Route>
    </Route>
  </Router>, root);
