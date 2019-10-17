import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = (props) => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((res) => setData(res.data))
    }, [])

    return (
        <div>
            <SearchBar setSearch={setSearch} />
            <Results data={data} search={search} setSearch={setSearch} />
        </div>
    )
}



const Country = ({ country, setSearch, showDetailed }) => {
    if (showDetailed) return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => <li key={language.iso639_1} >{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name} height={100} width={200}/>
        </div>
    )
    return (
        <div>
            {country.name} <button onClick={() => setSearch(country.name)} >show</button>
        </div>
    )
}

const Results = ({ data, search, setSearch }) => {
    const filtered = data.filter((country) => country.name.toUpperCase().includes(search.toUpperCase()))
    if (filtered.length > 10) {
        return (
            <div>
                <p>too many search results</p>
            </div>
        )
    }

    if (filtered.length === 1) {
        const country = filtered[0]
        return (
            <div>
                <Country key={country.numericCode} country={country} showDetailed={true} setSearch={setSearch} />
            </div>
        )
    }
    return (
        <div>
            {filtered.map((country) => <Country key={country.numericCode} country={country} showDetailed={false} setSearch={setSearch} />)}
        </div>
    )
}

const SearchBar = ({ search, setSearch }) => {
    return (
        <div>
            find countries <input value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));