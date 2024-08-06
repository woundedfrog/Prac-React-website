import React from 'react';
import '../../App.css';
import '../playlist.css';
import { useRef, useState, useEffect} from "react";
import xtype from 'xtypejs';

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';

// var playlistId = ''; //'&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk';
const apiUrlEnd = '&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk';

// var nextPage = '';
// var prevPage = '';

// const newUrl = '';
let array = [];
var count = 0;

// const [vidCount, setCount] = useState(0);

function Format() { // console.log("next___  " + nextPage);
    // console.log("prev___ " + prevPage);

    const [vidCount, setCount] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const inputRef = useRef('');

    const [playlistId, setPlaylistId] = useState(inputRef.current.value);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
 
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('current ' + inputRef.current.value);

    console.log('idvalue: ' + playlistId);
    
        setPlaylistId(inputRef.current.value.length == 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    }  

     useEffect(() => {
       if (nextPage !== 'NoNewUrl') {
       setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd);
     }
     else {
           setNewUrl('DeadEnd');
         }
    }, [playlistId,apiUrl,nextPage,apiUrlEnd]);

    const getVideosPage = (nn) => {
                                     console.log();
    let response;
         if (nn == 'DeadEnd'){
                              return
                            };
        fetch(nn)
            .then(res => {
                             if(!res.ok) { alert('No valid Url');
                                         return; }
    else { console.log('ijoji  ' + res.ok);
          return response = res.json();
          }
            }).then(data => {
 if (typeof data == "undefined") {
                                        return; }
                setNextPage(typeof data.nextPageToken != "undefined" ? '&pageToken=' + data.nextPageToken : 'NoNewUrl');
                setPrevPage(typeof data.prevPageToken != "undefined" ? '&pageToken=' + data.prevPageToken : false);
               
                                     console.log('GetVideo ran');
                console.log("next___  " + nextPage);
                console.log("prev___ " + prevPage);

                // setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd);

                data.items.forEach((curr => {
                    var vidTitle = curr.snippet.title;
                    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
                    var vidThumbnail = curr.snippet.thumbnails.default.url;
                    var date = curr.snippet.publishedAt;

                    var markup = `<p className='vidcounter'>${count+1}</p><div key=${count} class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;

                    array.push(markup);
                    document.querySelector('vid')
                        .insertAdjacentHTML('beforeend', markup);
                    setCount(array.length);
                }))
            }); //end of then(data)
    };

    console.log("renderedVid:" + array.length);

    array = array.filter((val, id, array) => {
        return array.indexOf(val) == id;
    });
    return (
        < >
        <div className="App">
              <form onSubmit={submitHandler}>
                <input ref={inputRef} />
                <button type="submit">Submit</button>
              </form>

              <p>Submit Value: <b>{newUrl}</b></p>

      <br/>
    </div>

        < h2 onClick = {
            () => getVideosPage(newUrl)
        } >
        click
        < /h2>
        < p key = "totalVids" > Number of videos loaded: { vidCount } < /p> 
        < />
    )
};

function Getter() {

    // PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk

}
export default Format;
