import {useState, useEffect} from "react";
import SongDetails from "../components/SongDetails"
const MusicChartContainer = () => {
    const [songs, setSongs] =  useState([]);

    const [loaded, setLoaded] = useState(false);
  
   
    const getSongs = async () => {
      console.log("OONZ OONZ OONZ OONZ")
      const response = await fetch("https://itunes.apple.com/gb/rss/topsongs/limit=20/json")
      const data = await response.json();
      await setSongs(data.feed.entry);
      await setLoaded(true);
  };
  
    useEffect(() => {
    getSongs();
    }, [])
  
    const songsNodes = songs.map(song => {
      return (
          (<SongDetails 
              loaded={loaded} 
              artist= {song["im:artist"].label} 
              title={song["im:name"].label} 
              key={song.id.attributes["im:id"]} 
              image={song["im:image"][2].label}
              preview={song.link[1].attributes.href}>
              </SongDetails>)
      )
  })
  
    return(
        <>
        <h1>Muzic Chartz Top 20</h1>
                {songsNodes}
        </>
    )
}

export default MusicChartContainer;