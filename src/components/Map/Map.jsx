import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import { LocationOnOutlined } from "@material-ui/icons";

const Map = ( { setCoordinates, setBounds, coordinates, places}) => {
    const classes = useStyles();
    const coords = { lat: 0, lng: 0}
    const isDesktop = useMediaQuery('(min-width:600px)');
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
                console.log('lat degeri', e.center.lat, 'lng degeri',e.center.lng)
                console.log('degisimden gelen bounds.ne degeri', e.marginBounds.ne, 'degisimden gelen bounds.sw degeri',e.marginBounds.sw)
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
            }}
            onChildClick={''}
            >
                {places?.map( (x, i) => (
                    <div 
                    className={classes.markerContainer}
                    lat={Number(x.latitude)}
                    lng={Number(x.longitude)}
                    key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {x.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={x.photo ? x.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={x.name}
                                    />
                                    <Rating size="small" value={Number(x.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;