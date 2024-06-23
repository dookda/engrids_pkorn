import React, { useEffect } from 'react';
import L from 'leaflet';
import './Map.css';

const Map = () => {
    useEffect(() => {
        const map = L.map('map').setView([18.71281373038289, 98.94286749933825], 12);

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        const amphoe = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
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

        const handleClick = (e: any) => {
            console.log(e.latlng)
            L.marker(e.latlng).addTo(map)
                .bindPopup("คุณคลิกที่พิกัด: " + e.latlng.toString())
                .openPopup();
        }

        map.on('click', (e) => handleClick(e));

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return <div className='map' id="map" ></div>;
};

export default Map;
