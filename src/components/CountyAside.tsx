import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

interface Props{
    name: string;
}

interface CountryClick{
    Click: (item: string) => void;
}

const CountyAside: React.FC<CountryClick> = ({Click}) => {

    const [countyName , setCountryName] = useState<string[]>([]);
    const url = 'https://restcountries.com/v2/all?fields=alpha3Code,name'
    const fetchData = async () => {
        const response = await fetch(url);
        if (response.ok) {
            const item = await response.json() as Props[];
            const names = item.map(item => item.name);
            setCountryName(names);
        }
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <div>
            <Box
                component="aside"
                sx={{
                    width: '250px',
                    padding: '16px',
                    borderRight: '2px solid #0FFF50',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                }}>
                <Typography variant="h6" gutterBottom borderBottom={'2px solid #0FFF50'} paddingBottom={'5px'}>
                    Countries
                </Typography>
                <List>
                    {countyName.map((item, index) => (
                        <ListItem key={index} button onClick={() => Click(item)}>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default CountyAside;