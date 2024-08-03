import React from 'react';
import '../../App.css';
import '../playlist.css';
import { useRef, useState } from "react";
import xtype from 'xtypejs';

// const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';

var playlistId = '';//'&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk';
const apiUrlEnd = '&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk';

var nextpage = '';
var prevpage = '';

let newUrl = '';
let array = [];
var count = 0;


function Format(nn) {
    // console.log("next___  " + nextpage);
    // console.log("prev___ " + prevpage);
    if (nextpage == false && prevpage != false) {
        return;
    }
    const getVideosPage = () => {
        fetch(nn)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // return (data.nextPageToken === false);
                nextpage = typeof data.nextPageToken != "undefined" ? '&pageToken=' + data.nextPageToken : false;
                prevpage = typeof data.prevPageToken != "undefined" ? '&pageToken=' + data.prevPageToken : false;
                console.log("next___  " + nextpage);
                console.log("prev___ " + prevpage);
                newUrl = (apiUrl + nextpage + playlistId + apiUrlEnd);
                data.items.forEach((curr => {
                    var vidTitle = curr.snippet.title;
                    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
                    var vidThumbnail = curr.snippet.thumbnails.default.url;
                    var date = curr.snippet.publishedAt;


                    // console.log(vidThumbnail, date);
                    var markup = `<p className='vidcounter'>${count+1}</p><div key=${count} class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;

                    array.push(markup);
                    document.querySelector('vid')
                        .insertAdjacentHTML('beforeend', markup);
                    count = count + 1;
                }))
            }); //end of then(data)
    };
    console.log("renderedVid:" + array.length);
    array = array.filter((val, id, array) => {
        return array.indexOf(val) == id;
    });
    return getVideosPage();
};


function Getter() {
    let pageCount = 3;
    const [vidCount, setCount] = useState(0);


  const [playId, setVal] = useState('');
  const inputRef = useRef();



  const submitHandler = (e) => {
    e.preventDefault();

    setVal(inputRef.current.value);

    // playlistId = '&playlistId=' + inputRef.current.value;
    console.log(playId.length == 0);
    playlistId = (inputRef.current.value.length == 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    
     newUrl = (apiUrl + nextpage + playlistId + apiUrlEnd);
  }
// PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk

    return (
            < >
        <div className="App">
              <form onSubmit={submitHandler}>
                <input ref={inputRef} />
                <button type="submit">Submit</button>
              </form>

              <p>Submit Value: <b>{playId}</b></p>

      <br/>
    </div>

    < h2 onClick = {() => Format(newUrl, setCount(array.length))} > 
    click 
    < /h2> 
        < p key = "totalVids" > Number of videos loaded: {
            vidCount
        }
        < /p> 
        < / > 
)
}
export default Getter;