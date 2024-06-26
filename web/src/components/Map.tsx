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
            if (!layer.options.basemap) {
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
            attribution: '© OpenStreetMap contributors',
            basemap: true,
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
            "ขอบเขตอำเภอ": amphoe
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
        try {
            const map: any = mapRef.current;
            if (!layer) return;

            const tambon = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
                layers: 'CM:tambon_cm',
                format: 'image/png',
                transparent: true,
                zIndex: 1
            });

            const amphoe = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
                layers: 'CM:amphoe_cm',
                format: 'image/png',
                transparent: true,
                zIndex: 1
            })

            const province = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
                layers: 'CM:prov_cm',
                format: 'image/png',
                transparent: true,
                zIndex: 1
            });

            const trans = L.tileLayer.wms('https://engrids.soc.cmu.ac.th/geoserver/CM/wms?', {
                layers: 'CM:road',
                format: 'image/png',
                transparent: true,
                zIndex: 1
            });

            removeWmsLayer();
            for (let key in layer.layer) {
                if (layer.layer[key]) {
                    switch (key) {
                        case 'tambon':
                            tambon.addTo(map);
                            break;
                        case 'amphoe':
                            amphoe.addTo(map);
                            break;
                        case 'province':
                            province.addTo(map);
                            break;
                        case 'trans':
                            trans.addTo(map);
                            break;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [layer]);
    return <div className='map' id="map" ></div>;
};

Map.propTypes = {
    layer: PropTypes.object.isRequired
};

export default Map;
