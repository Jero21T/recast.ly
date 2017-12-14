class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentVideo: {id: {videoID: null}, snippet: {title: null, description: null}}
    };
  }
  
  componentDidMount() {
    window.searchYouTube({query: null, max: null, key: null }, (APIvideos) => {
      this.setState({ videos: APIvideos}); 
      this.setState({currentVideo: APIvideos[0]}); 
    }); 
  }
  
  onVideoEntryClicked(data) {
    this.setState({
      currentVideo: data
    });
  }
  
  
  onSearchButtonClicked() {
    
  }
  
  render() {
    return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search videos={this.state.videos}/>
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
