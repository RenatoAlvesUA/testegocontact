import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";


class Map extends Component {


    /* componentDidMount() {
         let lat_Origem;
         let lng_Origem;
         if ('geolocation' in navigator) {
             navigator.geolocation.getCurrentPosition((position) => {
                 this.setState({
                     lat_Origem: position.coords.latitude,
                     lng_Origem: position.coords.longitude
                 })

               /*    const DirectionsService = new window.google.maps.DirectionsService();
                     console.log(DirectionsService)

                     console.log(this.props.lat)
                     console.log(this.props.lng)
                     console.log(lat_Origem)
                     console.log(lng_Origem)

                     DirectionsService.route({
                         origin: new window.google.maps.LatLng(lat_Origem, lng_Origem),
                         destination: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                         travelMode: window.google.maps.TravelMode.DRIVING,
                     }, (result, status) => {
                         if (status === window.google.maps.DirectionsStatus.OK) {
                             console.log(status)
                             console.log(result)
                             this.setState({

                                 loading: true,
                             });
                         } else {
                             console.error(`error fetching directions ${result}`);
                         }
                     })
            })
        }
    }*/
/*
{markers.map((marker, index) => (
                        <Marker {...marker}/>

                    )
                )}
 */

    render() {
        const markers = this.props.markers || []
        console.log(this.props.directions)
        return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={this.props.center}
            >

                {this.props.directions && <DirectionsRenderer directions={this.props.directions}/>}

            </GoogleMap>

        );
    }

};

export default withGoogleMap(Map);
