import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import './Map.css';

const Map = ({ layer }: any) => {
    const mapRef = useRef<L.Map>(null);

    const removeLayer = () => {
        mapRef.current?.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
                mapRef.current?.removeLayer(layer);
            }
        });
    }

    const removeWmsLayer = () => {
        mapRef.current?.eachLayer((layer: any) => {

            if (layer instanceof L.tileLayer.wms) {

                console.log(layer);
                mapRef.current?.removeLayer(layer);
            }
        });
    }

    const handleClick = (e: any) => {
        console.log(e.latlng)
        removeLayer();
        L.marker(e.latlng).addTo(mapRef.current!)
            .bindPopup("คุณคลิกที่พิกัด: " + e.latlng.toString())
            .openPopup();
    }

    useEffect(() => {
        mapRef.current = L.map('map').setView([18.71281373038289, 98.94286749933825], 12);
        const map: any = mapRef.current;
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        const amphoe: L.Layer = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
            layers: 'CM:amphoe_cm',
            format: 'image/png',
            transparent: true,
        })

        const baseMaps = {
            'OpenStreetMap': osm.addTo(map)
        };

        const overlayMaps = {
            "ขอบเขตอำเภอ": amphoe.addTo(map)
        }

        L.control.layers(baseMaps, overlayMaps).addTo(map);

        map.on('click', (e: any) => handleClick(e));

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    useEffect(() => {

        if (!layer) return;
        const map: any = mapRef.current;

        const tambon = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
            layers: 'CM:tambon_cm',
            format: 'image/png',
            transparent: true,
            zIndex: 1
        });

        const province = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
            layers: 'CM:prov_cm',
            format: 'image/png',
            transparent: true,
            zIndex: 2
        });

        const trans = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
            layers: 'CM:road',
            format: 'image/png',
            transparent: true,
            zIndex: 3
        });
        // console.log(layer.layer);

        if (layer.layer.tambon) {
            console.log('add tambon');
            tambon.addTo(map);
        } else {
            console.log('remove tambon');
            removeWmsLayer()
        }

    }, [layer]);

    return <div className='map' id="map" ></div>;
};

Map.propTypes = {
    layer: PropTypes.object.isRequired
};

export default Map;
