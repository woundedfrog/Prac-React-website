
import React from 'react';
import '../../App.css';
// import styles from '../../styles/Home.module.css'

export default function Playlist() {
  const thisdata = []
  
async function getVideos(): Promise<any[]> {
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk'

thisdata => fetch(apiUrl)
.then(data => data.json())
.then(list => list.items);


 console.log(thisdata)
}
}