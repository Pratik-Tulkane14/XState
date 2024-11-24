import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const BASE_URL = "https://crio-location-selector.onrender.com"
function App() {
  const [countriesList, setCountriesList] = useState<[]>([]);
  const [country, setCountry] = useState<string>("");
  const [statesList, setStatesList] = useState<[]>([])
  const [state, setState] = useState<string>("");
  const [citiesList, setCitiesList] = useState<[]>([])
  const [city, setCity] = useState<string>("")
  const getCountries = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/countries`);

      setCountriesList(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getStateList = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/country=${country}/states`);
      setStatesList(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getCitiesList = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/country=${country}/state=${state}/cities`);
      setCitiesList(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCountries()
  }, [])
  useEffect(() => {
    if (country !== "") {
      getStateList();
    }
  }, [country])
  useEffect(() => {
    if (state !== "") {
      getCitiesList();
    }
  }, [state])
  return (
    <>
      <h3>Select Location</h3>
      <div className='main'>

        <select name="country" id="country" value={country} onChange={(e) => {
          setCountry(e.target.value);
        }}>
          <option value="1">Select Country</option>
          {countriesList.map((ele, index) => {
            return (
              <option value={ele} key={index}>{ele}</option>
            )
          })}
        </select>
        <select name="state" id="state" value={state} onChange={(e) => {
          setState(e.target.value);
        }}>
          <option value="1">Select State</option>
          {statesList.map((ele, index) => {
            return (
              <option value={ele} key={index} >{ele}</option>
            )
          })}
        </select>
        <select name="city" id="city" value={city} onChange={(e) => {
          setCity(e.target.value);
        }}>
          <option value="1">Select City</option>
          {citiesList.map((ele, index) => {
            return (
              <option value={ele} key={index} >{ele}</option>
            )
          })}
        </select>
      </div>
      <div>
        {city && `You Selected ${country},${state},${city}`}
      </div>
    </>
  )
}

export default App
