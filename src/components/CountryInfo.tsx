import React, {useEffect, useState} from 'react';

interface Props{
    name: string;
    alpha3Code: string;
}
interface borders {
    code: string;
}
interface CountryData {
    name: string;
    capital: string;
    population: number;
    flags: {svg: string;};
    borders: borders[];
}
const CountryInfo: React.FC<Props> = ({name , alpha3Code}) => {

    const [countryData, setCountryData] = useState<CountryData>();
    const url = `https://restcountries.com/v2/alpha/${alpha3Code}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            if (response.ok) {
                const item = await response.json() as CountryData;
                setCountryData(item);
            }
        }
        void fetchData();
    }, [alpha3Code]);

    useEffect(() => {
        console.log(countryData);
    }, [countryData]);
    return (
        <div>
            <p>{name}</p>
            <p>{alpha3Code}</p>
            {countryData && (
                <>
                    <p>Capital: {countryData.capital}</p>
                    <p>Population: {countryData.population}</p>
                    <img src={countryData.flags.svg} alt={`${countryData.name} flag`}/>
                    <p>Borders: {countryData.borders.join(' ')}</p>
                </>
            )}
        </div>
    );
};

export default CountryInfo;