
import React from 'react';
import '../../App.css';
import '../playlist.css';
// import styles from '../../styles/Home.module.css'

const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken='
const apiUrlEnd = '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&publishedAfter=2019-09-28T00:00:00Z&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'
var nextpage = 'EAAajQFQVDpDRElpRUVSRVJVVkdORVEyTkRjNU1FVTVOVGNvQVVpejZ0LUMxcjJIQTFBQldrUWlRMmxLVVZSSFkzUlZWbVJ1VlZScmQwNHdhSFpsYWxsNFlqQldWR1ZYZUZWaFIwbDVWRlZ6TldSc1FrUk9ia3B5UldkelNURmplbDkwUVZsUmRWQnlVMHhSSWc'
var url = fetch(apiUrl + apiUrlEnd);

const array = [];
const numOfVideos = 0; 

var count = numOfVideos / 50;
var count = 0;


console.log(apiUrl + apiUrlEnd);
function Playlist() {

 
 fetch(apiUrl + apiUrlEnd)
 .then(res => {
  console.log(res.json);
 return res.json();
 })
 .then(data=>{

  // console.log(data.pageInfo.totalResults);

  data.items.forEach((curr=>{
    var vidTitle = curr.snippet.title;
    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
    var vidThumbnail = curr.snippet.thumbnails.default.url;
    var date = curr.snippet.publishedAt;
    // console.log(vidThumbnail, date);
         
        var markup = `<div key=${date} class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;

// var markup = [vidTitle,vidUrl,vidThumbnail,date];

array.push(markup);
    return document.querySelector('vid').insertAdjacentHTML('beforeend',markup);
                  // array.push(  React.createElement('a', { key: date }, vidThumbnail))


    count++;  


}))

 

nextpage = data.nextPageToken;




  }); //end of then(data)



 return (
    <div>
<vid></vid>
    </div>
    );
}
export default Playlist;


// export default function Linker () {
//   return (
//     <div>
//      <Playlist />
//     </div>
//     );
// }