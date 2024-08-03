import React from 'react';
import '../../App.css';
import '../playlist.css';

const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50'
const apiUrlEnd = '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

// pageToken=EAEajgFQVDpDRElpRUVZNVEwSTNNVGN4TkVaRlFUY3lOamtvQVVpTjdNQ0R0OC1IQTFBQVdrVWlRMmxLVVZSSFkzUlZWbVJ1VlZScmQwNHdhSFpsYWxsNFlqQldWR1ZYZUZWaFIwbDVWRlZ6TldSc1FrUk9ia3B5UldkM1NYZFBkV3QwVVZsUmVVMVhiVFIzUlNJ&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk
// pageToken=EAAajgFQVDpDRElpRUVZNVEwSTNNVGN4TkVaRlFUY3lOamtvQVVpTjdNQ0R0OC1IQTFBQldrVWlRMmxLVVZSSFkzUlZWbVJ1VlZScmQwNHdhSFpsYWxsNFlqQldWR1ZYZUZWaFIwbDVWRlZ6TldSc1FrUk9ia3B5UldkM1NYZFBkV3QwVVZsUmVVMVhiVFIzUlNJ&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk
var nextpage = '';
var prevpage = '';
let newUrl = (apiUrl + nextpage + apiUrlEnd);
// console.log(url);
// console.log(apiUrl);
// console.log(nextpage);
// console.log(apiUrlEnd);
// console.log(apiUrl + nextpage + apiUrlEnd);
// console.log(apiUrl2);
let array = [];
let array2 = [];
const numOfVideos = 0;

var count = numOfVideos / 50;
var count = 0;


// console.log('old____' + nextpage);

function Format(nn,arr) {

const getVideosPage = () => {


    fetch(nn)
        .then(res => {
            // console.log(res.json);
            return res.json();
        })
        .then(data => {

            nextpage = '&pageToken=' + data.nextPageToken;
            prevpage = '&pageToken=' + data.prevPageToken;
            console.log("next___  " + nextpage);
            console.log("prev___  " + data.prevPageToken);
            newUrl = apiUrl + nextpage + apiUrlEnd;
            console.log(newUrl);
            data.items.forEach((curr => {
                var vidTitle = curr.snippet.title;
                var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
                var vidThumbnail = curr.snippet.thumbnails.default.url;
                var date = curr.snippet.publishedAt;
                // console.log(vidThumbnail, date);

                var markup = `<div key=${count} class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;

                // var markup = [vidTitle,vidUrl,vidThumbnail,date];

                arr.push(markup);
                document.querySelector('vid').insertAdjacentHTML('beforeend', markup);
                // array.push(  React.createElement('a', { key: date }, vidThumbnail))


                
            count = count + 1;
console.log("renderedVid:" + count);

            }))


        }); //end of then(data)

};

  return (getVideosPage());



};


function Getter() {

  let pageCount = 3;
  console.log(newUrl);
  // console.log(apiUrl2);
return (
  <>
  <h1>Videos</h1>
  <p>Working</p>

      <h2 onClick={()=>Format(newUrl,array)}>click</h2>
  {/*{Format(newUrl)}*/}
  {/*{console.log(array)}*/}
  {/*{console.log(newUrl)}*/}
  </>

  );
}

// function Playlist(url) {

//     var x = [1, 2, 3]
//     // console.log(apiUrl2);
//     //         console.log(url);
//     x.forEach((curr) => {

//         url = apiUrl + nextpage + apiUrlEnd;
//         // why is the url not being updated and passed through to the call???
//         // count = count + 1;
//         console.log(count);
//         format(url);
//     });
// }
export default Getter;