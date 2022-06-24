import axios from 'axios';




export const getPlacesData = async (type, sw, ne) => {
    try {
        
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': '7728f68468msh2d786d20c96fd52p139657jsn2bfcee01b8bf'
          }
        });
        
        return data;
    }
    catch(error) {
        console.log(error);
    }
}