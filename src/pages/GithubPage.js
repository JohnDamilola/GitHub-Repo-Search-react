import React from 'react';
import axios from 'axios';

var ContributorsProfile = React.createClass({
  render: function() {
    return(
      <div className="col-md-4">
        <div className="profile">
          <div className="row">
            <div className="col-md-3">
              <img src={this.props.datas.avatar_url} alt="" width="70" />
            </div>
            <div className="col-md-9">
              <p>Name: {this.props.datas.login}</p>
              <a href={this.props.datas.html_url}>
                <button className="btn btn-md btn-default btn-block">
                  Go to Profile
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var MainContributor = React.createClass({
  getInitialState: function() {
    return{
      get: [],
      full_name: this.props.params.login+"/"+this.props.params.name,
    };
  },
  componentDidMount: function() {
    //https://api.github.com/repos/PSNB92/Tetris/contributors
    var th = this;
    var url = "https://api.github.com/repos/"+this.state.full_name+"/contributors";
    axios.get(url)
    .then(function (response) {
      th.setState({get: response.data});
    });
  },
  render: function() {
    var cards = this.state.get.map(function(card,i) {
      return (<ContributorsProfile datas={card} key={i} />)
    });
    return(
        <div className="card">
          <div className="container-fluid">
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

export default MainContributor;
