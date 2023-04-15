import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css"
import './App.css';

const {Configuration, OpenAIApi} = require("openai")

function App() {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null);       // state for getting the users location
  const [temperature, setTemperature] = useState(null); // state for getting the users temperature
  const [apiResponse, setApiResponse] = useState([]);   // state for the OPENAI response

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
      Look at this template for clothes to wear depending on the weather

      - [top clothing]
      - [bottom clothing]
      - [feet clothing]

      I will give you a temperature, and I want you to tell me what I 
      should wear depending on the weather. Your response should include 
      colors that would go well together along with the specific type of clothing. 
      Include sample colors in the bullet points you create. 
      Keep the answers brief but detailed.

      Only include the bullet points in your response.

      Tell me what to wear for ${temperature["hourly"]["temperature_2m"][0]} Celsius degree weather.
      ` 

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.5,
        max_tokens: 100,
      });
      setApiResponse(result.data.choices[0].text);
      arr = result.data.choices[0].text.split("- ")
    }
    catch (e) {
      console.log(e)
      setApiResponse("Something went wrong!");
    }
    console.log(arr)
    setApiResponse(arr)

    setLoading(false);
  };
  
  return (
    <div className="App">
      <Header />
      <h1>Hello!</h1>
      {/* Showing OpenAI API Response */}
      <h1>{
        loading ? "Generating Response..."
        : apiResponse.map((item, index) => {
          if(index === 0)
          {
            return <>{item}</>
          }
          return <><br />- {item}</>
        })
        }</h1>
      <AwesomeButton type='primary' 
      className='aws-btn' onPress={handleSubmit}>
        {loading ? "Generating Response..." : "Click Me!"}
      </AwesomeButton>
      <Footer />
    </div>
  );
}

export default App;
