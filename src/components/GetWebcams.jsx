import React, { useEffect } from 'react';
import Webcam from './Webcam';
import Slider from "react-slick";

const API_KEY_WINDY = process.env.REACT_APP_API_KEY_WINDY;
const Base_URL_WINDY = 'https://api.windy.com/api/webcams/v2/list/'

function GetWebcams ({ weather, webcams, setWebcams }) {

    useEffect(() => {
        if (weather.main != '') {
            getWebcams();
      }
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 830,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };


    const location = {
        lat: weather.coord.lat,
        lng: weather.coord.lon,
        radius: 50
    }

    const getWebcams = () => {
    try {
        fetch(`${Base_URL_WINDY}nearby=${location.lat},${location.lng},${location.radius}/category=meteo/orderby=distance,desc/limit=20?show=webcams:location,image,player&key=${API_KEY_WINDY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWebcams(data);
              })
    } catch (err){
        console.log(err);
        }
    }

    return (
        <div className="webcam-section">
          <div className="webcam-header">
            <h2>Watch live Weather around <strong>{weather.name}</strong> {'(< 50km)'}</h2>
            <button onClick={getWebcams}>Update Webcams</button>
          </div>
            {typeof webcams.result != "undefined" ? 
            (

             <div className="webcams-list">
                < Slider {...settings}>
                {webcams && webcams.result.webcams.map(webcam => (
                    <Webcam webcam={webcam} key={webcam.id}/>))
                }
                </Slider>
            </div>

            )
            : ('')
            }
        </div>
    )
}

export default GetWebcams;