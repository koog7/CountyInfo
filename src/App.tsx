import './App.css'
import CountryAside from "./components/CountryAside.tsx";
import React, {useEffect, useState} from "react";
import CountryInfo from "./components/CountryInfo.tsx";

interface Props{
    name: string;
    alpha3Code: string;
}
const App: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Props[]>([{ name: 'Afghanistan', alpha3Code: 'AFG' }]);

    const getData = (name: string , alpha3Code: string) => {
        setSelectedCountry([{ name, alpha3Code }]);
    };

    useEffect(() => {
        if (selectedCountry) {
            console.log('Selected Country:', selectedCountry);
        }
    }, [selectedCountry]);
    console.log(selectedCountry)

    return (
        <>
            <CountryAside Click={getData} />
            {selectedCountry && (
                <CountryInfo name={selectedCountry[0].name} alpha3Code={selectedCountry[0].alpha3Code} />
            )}
        </>
    );
};
export default App
