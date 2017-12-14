var searchYouTube = (options, callback) => {
  // TODO
  var query = options.query || 'the Netherlands';
  var max = options.max || 5;
  var key = options.key || window.YOUTUBE_API_KEY;
  
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    method: 'GET',
    dataType: 'json',
    data: {
      'key': key,
      'q': query,
      'maxResults': max,
      'part': 'snippet',
      'type': 'video',
      'videoEmbeddable': true
    },
    success: (data) => {
      console.log('success got data');
      
      callback(data.items);
    },
    error: (data) => {
      console.log('FAILED to get data');
    }
    
  });
  
};

window.searchYouTube = searchYouTube;
