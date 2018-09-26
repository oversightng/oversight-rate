import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from "react-sidebar";
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ProfileCard from './allprofilecard';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

class AllPoliticians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: '',
      searchText: '',
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount(){
    return fetch(REQUEST_URL)
      .then((response) => response.json() )
        .then((json) => {
          this.setState({
            data: json,
            showDialog: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  handleUserInput(s) {
    this.setState({
      input: s,
    })
  }

  handleChange() {
    this.setState({
      searchText: searchText
    })
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    window.location.reload();
  }

  render() {
    const title = 'Filter Politicians';
    const searchStyle = {
      color: '#3c763d',
      // display: 'none',
      floatingLabelFocusStyle: {
        color: '#3c763d',
      },
    };
    const mapped_data = this.state.data.map((p) => {
      return p.name.toLowerCase();
    });
    const filtered = this.state.data.filter((p) => {
      return (p.name.toLowerCase().indexOf(this.state.input) > -1);
    });
    const politicians = filtered.map((politician, key) => {
      return (
        <div key={politician._id} className="all-politicians-page-card">
          <ProfileCard
            id={politician._id}
            name={politician.name}
            avatar={politician.avatar}
            post={politician.current_post.title}
            state={politician.state}
            dob={politician.dob}
            party={politician.current_party.name}
            loggedin={this.props.loggedin}
            averageRating={politician.rating.average}
            verified={this.state.verified}
          />
        </div>
      );
    });
    const drawList =
      (
        <ul className="draw-list">
          <li>Home</li>
          <li>Party</li>
          <li>State</li>
          <li>Gender</li>
          <li>Ethnicity</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      );

    return (
      <MuiThemeProvider>
        <div className="col-md-12">
          <div className="col-md-2">
          </div>
          <Sidebar
            sidebar={drawList}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            sidebarClassName="draw-sidebar"
            rootClassName="draw-container"
          >
            <button className="menu-button" onClick={() => this.onSetSidebarOpen(true)}>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </button>
          </Sidebar>
          <div className="col-md-10">
            <AutoComplete
              className="search-input"
              style={searchStyle}
              floatingLabelText="Search Politician"
              filter={AutoComplete.fuzzyFilter}
              dataSource={mapped_data}
              maxSearchResults={5}
              onUpdateInput={this.handleUserInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              underlineStyle={searchStyle}
            />
            <div className="float-right icon-menu">
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Admin Page" href="/oversight-rate/admin" />
                <MenuItem primaryText="APC" />
                <MenuItem primaryText="PDP" />
                <MenuItem primaryText="Most Liked" />
                <MenuItem primaryText="Highest Rated" />
                <MenuItem primaryText="Trending" />
                <MenuItem primaryText="All Politicians" href="/all"/>
                <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} />
              </IconMenu>
            </div>
          </div>
          <div className="all-politicians-container">
            {politicians}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AllPoliticians;
