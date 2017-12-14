class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      videos: [],
      currentVideo: {id: {videoID: null}, snippet: {title: null, description: null}}
    };
  }
  
  componentDidMount() {
    searchYouTube({query: null, max: null, key: null }, (APIvideos) => {
      this.setState({ videos: APIvideos}); 
      this.setState({currentVideo: APIvideos[0]}); 
    }); 
  }
  
  onVideoEntryClicked(data) {
    this.setState({
      currentVideo: data
    });
  }
  
  handleUserQuery(event, stateQuery) {
    this.liveSearch(stateQuery);
  }

  liveSearch(text) {
    searchYouTube({query: text, max: null, key: null }, (APIvideos) => {
      this.setState({ videos: APIvideos}); 
      this.setState({currentVideo: APIvideos[0]}); 
    });
  }
  
  
  onSearchButtonClicked(userQuery) {
    console.log(userQuery);
    searchYouTube({query: userQuery, max: null, key: null }, (APIvideos) => {
      this.setState({ videos: APIvideos}); 
      this.setState({currentVideo: APIvideos[0]}); 
    });
  }
  
  render() {
    return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search videos={this.state.videos} onSearchButtonClicked={(userQuery) => this.onSearchButtonClicked(userQuery)} handleUserQuery={(event, stateQuery)=>this.handleUserQuery(event, stateQuery)}/>
        </div>
      </nav>
    <div className="row">
      <div className="col-md-7">
        <VideoPlayer video={this.state.currentVideo}/>
      </div>
      <div className="col-md-5">
        <VideoList videos={this.state.videos} onVideoEntryClicked={(data) => this.onVideoEntryClicked(data)} />
      </div>
    </div>
  </div>);
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
