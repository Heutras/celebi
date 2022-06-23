import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map = ( { setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const classes = useStyles();
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
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
            }}
            onChildClick={(x, a) => {
                setChildClicked(x)
            }}
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