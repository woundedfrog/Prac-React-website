import React from 'react';
import '../../App.css';
import '../playlist.css';
import { useState } from 'react';

// const apiUrl2 = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50'
const apiUrlEnd = '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

var nextpage = '';
var prevpage = '';

let newUrl = (apiUrl + nextpage + apiUrlEnd);

let array = [];


var count = 0;


// console.log('old____' + nextpage);

function Format(nn) {
    console.log("next___  " + nextpage);
    console.log("prev___ " + prevpage);

    if (nextpage == false && prevpage != false) {
        return;
    }
    const getVideosPage = () => {



        fetch(nn)
            .then(res => {
                // console.log(res.json);
                return res.json();
            })
            .then(data => {
                // return (data.nextPageToken === false);
                nextpage = typeof data.nextPageToken != "undefined" ? '&pageToken=' + data.nextPageToken : false;
                prevpage = typeof data.prevPageToken != "undefined" ? '&pageToken=' + data.prevPageToken : false;
                console.log("next___  " + nextpage);
                console.log("prev___ " + prevpage);

                newUrl = apiUrl + nextpage + apiUrlEnd;

                data.items.forEach((curr => {
                    var vidTitle = curr.snippet.title;
                    var vidUrl = 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId;
                    var vidThumbnail = curr.snippet.thumbnails.default.url;
                    var date = curr.snippet.publishedAt;
                    // console.log(vidThumbnail, date);

                    var markup = `<div key=${count} class='videoitem'><a class='vidlink' href='${vidUrl}' target='_blank'><img class='vidimg' src='${vidThumbnail}'></img></a><p>${vidTitle}</p></div>`;

                    // var markup = [vidTitle,vidUrl,vidThumbnail,date];

                    array.push(markup);
                    array.push(markup);
                    document.querySelector('vid').insertAdjacentHTML('beforeend', markup);
                    // array.push(  React.createElement('a', { key: date }, vidThumbnail))



                    count = count + 1;

                }))


            }); //end of then(data)

    };

    console.log("renderedVid:" + array.length);
    array = array.filter((val, id, array) => {
        return array.indexOf(val) == id;
    });

    return (getVideosPage());



};


function Getter() {

    let pageCount = 3;
    const [vidCount, setCount] = useState(0);
    // console.log(apiUrl2);


    return ( <
        >
        <h1>Videos</h1> <
        p > Working < /p> <
        h2 onClick = {
            () => Format(newUrl, setCount(array.length)) } > click < /h2> <
        p key = "totalVids" > Number of videos loaded: { vidCount } < /p> 
        <
        />

    )
}

export default Getter;