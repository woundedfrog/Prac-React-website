
import React from 'react';
import '../../App.css';
import '../playlist.css';
// import styles from '../../styles/Home.module.css'

const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50'
const apiUrlEnd = '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

  var nextpage = ''
  var url = apiUrl + nextpage + apiUrlEnd;

const array = [];
const numOfVideos = 0; 

var count = numOfVideos / 50;
var count = 0;


// console.log('old____' + nextpage);

function format(nn) {


 
 fetch(nn)
 .then(res => {
  console.log(res.json);
 return res.json();
 })
 .then(data=>{

console.log(url);
nextpage = '&pageToken=' + data.nextPageToken;
url = apiUrl + nextpage + apiUrlEnd;
count = count + 1;
console.log(url);
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

 






  }); //end of then(data)



};


function Playlist(url) {

var x = [1,2,3]
// console.log(apiUrl2);
//         console.log(url);
x.forEach((curr)=>{

 url = apiUrl + nextpage + apiUrlEnd;
 // why is the url not being updated and passed through to the call???
 // count = count + 1;
 console.log(count);
 format(url);
    });
}
export default Playlist;


// export default function Linker () {
//   return (
//     <div>
//      <Playlist />
//     </div>
//     );
// }




// maybe this code can work too:


// const Stars = ({n}) => {
//   let stars = []
//   for (let i = 0; i < n; ++i) {
//     stars.push(<i className="fa fa-star" key={i}></i>)
//   }

//   return (
//     <div className="Stars">
//       {stars}
//     </div>
//   )