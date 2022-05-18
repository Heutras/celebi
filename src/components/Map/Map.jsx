import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab';

import useStyles from './styles';

const Map = ( setCoordinates, setBounds, coordinates) => {
    const classes = useStyles();
    const coords = { lat: 0, lng: 0}
    const isMobile = useMediaQuery('(min-width:600px)');
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDz8ex1pI08hMW4bUBf0j0PY45cUAI_xtA' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            option={''}
            onChange={(e) => {
                console.log('onchange degeri', e)
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
            }}
            onChildClick={''}
            >

            </GoogleMapReact>
        </div>
    );
}
/*  */
export default Map;