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
    const [borderCountries , setBorderCountries] = useState<string[]>([])
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
        setBorderCountries([]);
        if (countryData && countryData.borders) {
            countryData.borders.map(async (code) => {
                try {
                    const response = await fetch(`https://restcountries.com/v2/alpha/${code}`);
                    if (response.ok) {
                        const item = await response.json();
                        setBorderCountries(prevState => [...prevState, item.name]);
                        console.log(item.name);
                    }
                }catch (error) {
                    console.error('Error:', error);
                }
            });
        }else {
            setBorderCountries(['Границ нет']);
        }
    }, [countryData]);

    return (
        <div>
            <p>{name}</p>
            <p>{alpha3Code}</p>
            {countryData && (
                <>
                    <p>Capital: {countryData.capital}</p>
                    <p>Population: {countryData.population}</p>
                    <img width={'300px'} src={countryData.flags.svg} alt={`${countryData.name} flag`}/>
                    <ul>
                        {borderCountries.map((country, index) => (
                            <li key={index}>{country}</li>
                        ))}
                    </ul>Добавлена функция отображения названий граничащих стран
                </>
            )}
        </div>
    );
};

export default CountryInfo;