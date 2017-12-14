class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      videos: [],
      currentVideo: {id: {videoID: null}, snippet: {title: null, description: null}}
    };
  }
  
  // search method is invoked immediatly after mount with default search query
  componentDidMount() {
    searchYouTube({query: null, max: null, key: null }, (APIvideos) => {
      this.setState({ videos: APIvideos}); 
      this.setState({currentVideo: APIvideos[0]}); 
    }); 
  }
  
  // changes the state based on the entry the user clicks on video list
  onVideoEntryClicked(videoClicked) {
    this.setState({
      currentVideo: videoClicked
    });
  }
  
  // live searches user input in search bar with a debounce time of 500ms
  handleUserQuery(event, stateQuery) {
    this.liveSearch(stateQuery);
  }
  
  // triggers live search after search button is clicked
  // takes in values from input box
  onSearchButtonClicked(userQuery) {
    this.liveSearch(userQuery);
  }
  
  // gets data from youtubes api based on query text parameter
  liveSearch(text) {
    searchYouTube({query: text, max: null, key: null }, (APIvideos) => {
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
