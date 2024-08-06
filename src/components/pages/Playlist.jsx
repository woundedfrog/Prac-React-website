import React from 'react';
import '../../App.css';
import '../playlist.css';
import {
    useRef,
    useState,
    useEffect
} from "react";
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

        setPlaylistId(inputRef.current.value.length == 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    }
    
    useEffect(() => {
    (nextPage !== 'NoNewUrl') ? setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd) : setNewUrl('DeadEnd');
    }, [playlistId, apiUrl, nextPage, apiUrlEnd]);

    const getVideosPage = (nn) => {
        console.log();
        let response;
        if (nn == 'DeadEnd') {
            return
        };
        fetch(nn).then(res => {
          return (!res.ok) ? alert('No valid Url') : response = res.json();

        }).then(data => {
            if (typeof data == "undefined") {
                return;
            }
            setNextPage(typeof data.nextPageToken != "undefined" ? '&pageToken=' + data.nextPageToken : 'NoNewUrl');
            // setPrevPage(typeof data.prevPageToken != "undefined" ? '&pageToken=' + data.prevPageToken : false);

            data.items.forEach((curr => {
                const info = {
                 vidTitle: curr.snippet.title,
                 vidUrl: 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId,
                 vidThumbnail: curr.snippet.thumbnails.default.url,
                 date: curr.snippet.publishedAt,

              };
                var markup = `<p className='vidcounter'>${count+1}</p><div key=${count} class='videoitem'><a class='vidlink' href='${info.vidUrl}' target='_blank'><img class='vidimg' src='${info.vidThumbnail}'></img></a><p>${info.vidTitle}</p></div>`;
                array.push(info);
                // document.querySelector('vid').insertAdjacentHTML('beforeend', markup);
                
                setCount(array.length);
                // return info;
            }))
        }); //end of then(data)
    };
    console.log(array);

    const pushIt = array.map((vid,idx) => 
                            <li ><p className='vidcounter'>{idx}</p><
                            div key={idx} className='videoitem'>
                            <a className='vidlink' href={vid.vidUrl} target='_blank'>
                            <img classNaME='vidimg' src={vid.vidThumbnail}></img>
                            </a>
                            <p>{vid.vidTitle}</p>
                            </div></li>
                          );

    return( < > < div className = "App" > < form onSubmit = {
            submitHandler
        } > < input ref = {
            inputRef
        }
        /> < button type = "submit" > Submit < /button > < /form> < p > Submit Value: < b > {
        newUrl
    } < /b></p > < br / > < /div> < h2 onClick = {
    () => getVideosPage(newUrl)
} > click < /h2> < p key = "totalVids" > Number of videos loaded: {
vidCount
} < /p>
<ul className='videolist'>{pushIt}</ul>  
< / > 
)

};

function Getter() {
    // PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk
  // PLK5U0tyd34tCTqZI9deO4VjxhgJDhhBpC
}
export default Format;