import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../Images/logo.PNG"
import "../Style/Movies.css"


const Movies = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState (null);



    useEffect(() => {
        const getData = async () => {
            try {
              const response = await axios.get(`https://swapi.dev/api/films`);
              setData(response.data.results);
              console.log(setData)
              setError(null);
            } catch (err) {
              setError(err.message);
              setData(null);
            } finally {
              setLoading(false);
            }
          };
          getData(); 
    }, [])
    
    return (
        <div id="root">
            <div className="main">    
                <header>
                    <img src = {logo} alt="logo" />
                </header>
                <div className="data">
                    {loading && <div>Fetching data, please wait ...</div>}
                    {error && <div>{`There is a problem fetching your data - ${error}`}</div>}
                </div>
                <ul className="container">
                    {data && data.map((item) =>{
                        return (<li key={item.episode_id}>
                            <h2>{item.title}</h2>
                            <h3>{item.release_date}</h3>
                            <p>{item.opening_crawl.split('\n').slice(0, 8).join('\n')}</p>
                            <hr />
                            <a href="#void">More info</a>
                        </li>)
                    }
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Movies;