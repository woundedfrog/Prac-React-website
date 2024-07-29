
import React from 'react';
import '../../App.css';
import '../playlist.css';
// import styles from '../../styles/Home.module.css'



function Playlist() {

  
// const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyARvK7mrv4xbrRCwmt05YSu-q5U1UFwqNc'

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken='
const apiUrlEnd = '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&publishedAfter=2019-09-28T00:00:00Z&key=AIzaSyARvK7mrv4xbrRCwmt05YSu-q5U1UFwqNc'
var nextpage = 'EAAajQFQVDpDRElpRUVSRVJVVkdORVEyTkRjNU1FVTVOVGNvQVVpejZ0LUMxcjJIQTFBQldrUWlRMmxLVVZSSFkzUlZWbVJ1VlZScmQwNHdhSFpsYWxsNFlqQldWR1ZYZUZWaFIwbDVWRlZ6TldSc1FrUk9ia3B5UldkelNURmplbDkwUVZsUmRWQnlVMHhSSWc'
var url = apiUrl + apiUrlEnd;
const array = [];

var count = 0;
  fetch(url)
.then(res => {
 return res.json();
 })
 .then(data=>{
  // console.log(data.items);
  data.items.forEach((curr=>{
    var vidTitle = curr.snippet.title;
    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
    var vidThumbnail = curr.snippet.thumbnails.default.url;
    var date = curr.snippet.publishedAt;
    // console.log(vidThumbnail, date);
         
        var markup = `<div class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;
if (array.indexOf(markup) === -1) {
            
array.push(markup);

}
    count++;  


    // console.log(array.indexOf(markup) , array);  

}))

nextpage = data.nextPageToken;

  
array.forEach((items) => {
  // console.log(array.indexOf(items) >! 1);
  if (array.indexOf(items) >= 1) {
    document.querySelector('vid').insertAdjacentHTML('beforeend',items);
  };
}
 
 )
  }) //end of then(data)



 return ( 
  <>


  <vid className='videoitems'>
    
  </vid>
  </>
)
}

export default Playlist;