import React, { useState, useRef } from "react";
import { CircularProgress, Grid, InputLabel, MenuItem, FormControl, Select, Typography } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ( { places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();


    const ref = useRef([]);
    
    return(
        <div className={classes.container}>
            <Typography variant="h4"> Restorantlar, Oteller ve attractions around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((x, i) => (
                    <Grid item key={i} xs={12}
                    ref={(el) =>{
                         if(!ref.current.includes(el)){
                            ref.current.push(el)
                         }
                    }}
                    >
                        <PlaceDetails
                            place={x}
                            selected={Number(childClicked) === i }
                            refProp={Number(childClicked) === i && ref.current[i]}    
                                
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;