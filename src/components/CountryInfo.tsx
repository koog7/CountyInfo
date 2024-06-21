import React, {useEffect, useState} from 'react';
import { Grid, Typography, Box, List, ListItem } from '@mui/material';

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
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} marginLeft={'125px'}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h2" color={'#0fff50'} width={'350px'} marginBottom={'50px'}>{name}</Typography>
                    <Typography variant="subtitle1"><span style={{color:'#0fff50'}}>Code:</span> {alpha3Code}</Typography>
                    {countryData && (
                        <>
                            <Typography variant="h6"><span style={{color:'#0fff50'}}>Capital:</span> {countryData.capital}</Typography>
                            <Typography variant="h6"><span style={{color:'#0fff50'}}>Population:</span>  {countryData.population}</Typography>
                        </>
                    )}
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="flex-start">
                    {countryData && (
                        <img width={'400px'} src={countryData.flags.svg} alt={`${countryData.name} flag`} />
                    )}
                </Grid>
                <Grid item xs={12} md={6} sx={{ alignSelf: 'flex-end' }}>
                    <Typography variant="h4"><span style={{color:'#0fff50'}}>Border Countries:</span></Typography>
                    <List>
                        {borderCountries.map((country, index) => (
                            <ListItem key={index} sx={{borderBottom: '1px solid #0fff50', width:'240px'}}>{country}</ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CountryInfo;