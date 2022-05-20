import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api'
import { RadioButtonUncheckedSharp } from "@material-ui/icons";
const App = () => {
    const [ places, setPlaces ] = useState([]);

    const [ coordinates, setCoordinates] = useState({});
    const [ bounds, setBounds] = useState({});

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( ({ coords: { latitude, longitude}}) => {
            setCoordinates( {lat: latitude, lng: longitude})
        })
    }, [])
    
    useEffect( () => {
        console.log(coordinates,'cords1 ', bounds, 'konum ciktis1i')
        console.log('bu bounds.swnin degeri',bounds.sw,'bu da bounds.ne',bounds.ne)
        getPlacesData(bounds.sw, bounds.ne)
        .then( (data) => {
            setPlaces(data)
        })
    }, [ coordinates, bounds])
    
    return (
        <>
            <CssBaseline/>
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        bounds = {bounds}
                    />
                    {console.log('gonderilen coords bunlar', coordinates,'gonderilen B bu', bounds)}
                </Grid>
            </Grid>
        </>
    );
}


export default App;