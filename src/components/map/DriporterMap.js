/* global google */
import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import driInActiveImage from '../../assets/images/ic_vehicle.svg';
import driActiveImage from '../../assets/images/ic_vehicleActive.svg';
import statusMapping from '../../utils/StatusMapping';
import ambulanceImg from '../../assets/images/ic_vacantCar.svg';


const DriporterMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCObVgS0QEFVLXSUwCNKpB8NuLmyKeWqc4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '590px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null, 
        center: {
          lat: 25.28891, lng: 51.0479856,
        },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: _.debounce(
          () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter(),
            });
          },
          100,
          { maxWait: 500 },
        ),
        onSearchBoxMounted: (ref) => {
          // console.log('onSearchBoxMounter', ref);
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      });
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
    id: 0,
  }), {
    onToggleOpen: ({ isOpen }) => index => ({
      isOpen: !isOpen,
      id: index,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  // console.log('props-----------------', props);

  (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={10}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customer's Near landmark"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '240px',
            height: '32px',
            marginTop: '27px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </SearchBox>
      
      <Marker
          position={{lat: 25.28591, lng: 51.0479856}}
          onClick={() => props.onToggleOpen()}
          icon={ambulanceImg}
        >
        </Marker>

        <Marker 
          position={{lat: 25.3690056, lng: 51.174759}}
          onClick={() => props.onToggleOpen()}
          icon={ambulanceImg}
        >
        </Marker>

        <Marker 
          position={{lat: 25.4677928, lng: 51.1493983}}
          onClick={() => props.onToggleOpen()}
          icon={ambulanceImg}
        >
        </Marker>

        <Marker
          position={{lat: 25.15891, lng: 51.0479856}}
          onClick={() => props.onToggleOpen()}
          icon={ambulanceImg}
        >
        </Marker>
      {props && props.driporterLocations ? props.driporterLocations.map((data, index) => (
        <Marker
          position={data}
          onClick={() => props.onToggleOpen(data.userId)}
          icon={data.status === 'offline' ? driInActiveImage : driActiveImage}
        >
          {props.id === data.userId ? (
              props.isOpen &&
              <InfoBox
                onCloseClick={props.onToggleOpen}
                options={{ closeBoxURL: '', enableEventPropagation: true }}
              >
                <div style={{ backgroundColor: '#C0ECAE', opacity: 0.75, padding: '12px' }}>
                  <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                    {data.name} <br />
                    {statusMapping(data.status)}

                  </div>
                </div>
              </InfoBox>
            ) : null}

        </Marker>
        )) : null}
    </GoogleMap>
  ));

export default DriporterMap;
