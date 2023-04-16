import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Dropdown from "./components/Dropdown";
import Instructions from './components/Instructions';
// import {AwesomeButton} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css"
import './App.css';

const {Configuration, OpenAIApi} = require("openai")

function App() {
  const [loading, setLoading] = useState(false);        // state for loading 
  const [location, setLocation] = useState(null);       // state for getting the users location
  const [temperature, setTemperature] = useState(null); // state for getting the users temperature
  const [apiResponse, setApiResponse] = useState([]);   // state for the OPENAI response
  const [imageURL, setImageURL] = useState("")          // Image state

  // Get the users geolocation
  useEffect(() => {
    setLoading(true);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    }
    else {
      alert("Geolocation not supported!");
      setLoading(false);
    }
  }, []);
  
  // Get the users temperature using the geolocation logic
  useEffect(() => {
    if(location) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Math.round(location.latitude * 100) / 100}&longitude=${Math.round(location.longitude * 100) / 100}&hourly=temperature_2m,precipitation`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemperature(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [location]);
  
  
  // OPENAI API LOGIC
  const handleSubmit = async (e) => {
    console.log(selectedInputs.Gender)
    console.log(selectedInputs.Occasion)
    console.log(selectedInputs.Style)

    let arr = []
    e.preventDefault();
    setLoading(true);
    try {
      const configuration = new Configuration({
          apiKey: process.env.REACT_APP_OPENAI_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      
      let text = 
      `
      Only include 3 bullet points in your response.

      Tell me what to wear for ${temperature["hourly"]["temperature_2m"][0]} Celsius degree weather
      ${selectedInputs.Gender === undefined ? "" : "for a " + selectedInputs.Gender + " style of clothing"}
      ${selectedInputs.Occasion === undefined ? "" : "along with a " + selectedInputs.Occasion + " style of clothing"}
      ${selectedInputs.Style === undefined ? "" : "also include a " + selectedInputs.Style + " style of clothing"}

      With all the information above, generate 3 SHORT bullet points telling me what to wear
      for upper body, lower body, and shoes.
      
      That looks like this:

      - [upper body]
      - [lower body]
      - [shoes]
      ` 

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.5,
        max_tokens: 100,
      });
      setApiResponse(result.data.choices[0].text);
      arr = result.data.choices[0].text.split("- ")

      // text = 
      //   `
      //   ${selectedInputs.Gender === undefined ? "Neutral" : selectedInputs.Gender}
      //    person with a 
      //   ${selectedInputs.Occasion == undefined ? "neutral" : selectedInputs.Occasion}
      //    attire, along with a 
      //   ${selectedInputs.Style == undefined ? "neutral" : selectedInputs.Style}
      //    style
      // `
      
      // const imageResult = await openai.createImage({
      //   prompt: text,
      //   n: 1,
      //   size: "1024x1024", 
      // })
      // setImageURL(imageResult.data.data[0].url)

    }
    catch (e) {
      console.log(e)
      setApiResponse("Something went wrong!");
    }
    console.log(arr)
    setApiResponse(arr)

    setLoading(false);
  };

  // retrieving image url
  const retrieveImageUrl = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const configuration = new Configuration({
          apiKey: process.env.REACT_APP_OPENAI_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      
      let text = 
      `
        ${selectedInputs.Gender === undefined ? "Neutral" : selectedInputs.Gender}
         person with a 
        ${selectedInputs.Occasion == undefined ? "neutral" : selectedInputs.Occasion}
         attire, along with a 
        ${selectedInputs.Style == undefined ? "neutral" : selectedInputs.Style}
         style
      `
      const imageResult = await openai.createImage({
        prompt: text,
        n: 1,
        size: "1024x1024", 
      })
      setImageURL(imageResult.data.data[0].url)

    }
    catch (e) {
      console.log(e)
      setApiResponse("Something went wrong!");
    }

    setLoading(false); 
  }

  // form state
  const [selectedInputs, setSelectedInputs] = useState({})

  function handleInputSubmit(inputType, inputValue)
  {
    setSelectedInputs((prevInputs) => ({
      ...prevInputs,
      [inputType]: inputValue
    }))
  }


  return (
    <div className="App">
      <Header />

      <div style={{ minHeight: "calc(100px - 34px)" }}>
        <Instructions />
        {/* API RESPONSE */}

        <div>
          {imageURL === "" ? "" : <img src={imageURL} alt="" className='img-style'/>}
        </div>

        <h4>{loading ? "Generating Response..." : 
              apiResponse.map((item, index, key) => {
                if(index === 0) {
                  return <>{item}</>
                } 
                return <><br />- {item}</>
              })}</h4>

        {/* <AwesomeButton type='primary' 
        className='aws-btn' onPress={handleSubmit}>Click Me!</AwesomeButton> */}

        <div className='form-container'>
            <Dropdown 
              type="Gender"
              options={[
                {value: "Male", label: "Male"},
                {value: "Female", label: "Female"},
                {value: "Neutral", label: "Neutral"}
              ]}
            onSubmit={handleInputSubmit}
            />
            <Dropdown 
              type="Occasion"
              options={[
                {value: "Casual", label: "Casual"},
                {value: "Formal", label: "Formal"},
                {value: "Business", label: "Business"}
              ]}
            onSubmit={handleInputSubmit}
            />
            <Dropdown 
              type="Style"
              options={[
                {value: "Minimalist", label: "Minimalist"},
                {value: "Athletic", label: "Athletic"},
                {value: "Street Wear", label: "Street Wear"}
              ]}
            onSubmit={handleInputSubmit}
            />
        </div>
        <button className='btn' onClick={handleSubmit}>Get Info!</button>
        <br />
        <button className='img-btn' onClick={retrieveImageUrl}>Get Image!</button>

      </div>
        <Footer />
    </div>
  );
}

export default App;
