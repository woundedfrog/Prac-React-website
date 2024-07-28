
import React from 'react';
import '../../App.css';
import '../playlist.css';
// import styles from '../../styles/Home.module.css'



function Playlist() {

  
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=513&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&publishedAfter=2019-09-28T00:00:00Z&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'


  fetch(apiUrl)
.then(res => {
 return res.json();
 })
 .then(data=>{
  data.items.forEach((curr=>{
    var vidTitle = curr.snippet.title;
    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
    var vidThumbnail = curr.snippet.thumbnails.default.url;
    var date = curr.snippet.publishedAt;
    // console.log(vidThumbnail, date);
         
        var markup = `<div class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;
console.log('counter');
            document.querySelector('vid').insertAdjacentHTML('beforeend',markup);

              


      
}))
 })

return (
  <>


<div className='videolist'>
  <vid className='videoitems'>
    
  </vid>
  </div>
  </>

  );
}

export default Playlist;