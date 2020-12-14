let DistritoSearch = new L.Control.Search({
    container: 'distritosearch',
    layer: distrito,
    propertyName: 'nome_distrito',
    marker: false,
    textCancel: true,
    collapsed: true,
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

DistritoSearch.on('search:locationfound', function (e) {
    e.layer.setStyle({fillColor: '#ff6a07', color: '#000000', fillOpacity: 0.4});
    if (e.layer._popup)
        e.layer.openPopup();
}).off('search:collapsed', function (e) {
    distrito.eachLayer(function (layer) {	//restore feature color
        distrito.resetStyle(layer);
    });
});

let TerritorioSearch = new L.Control.Search({
    container: 'territoriosearch',
    layer: territorio,
    propertyName: 'nome_territorio',
    marker: false,
    textCancel: true,
    collapsed: true,
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

TerritorioSearch.on('search:locationfound', function (e) {
    e.layer.setStyle({fillColor: '#ff6a07', color: '#000000', fillOpacity: 0.4});
    if (e.layer._popup)
        e.layer.openPopup();
}).off('search:collapsed', function (e) {
    territorio.eachLayer(function (layer) {	//restore feature color
        territorio.resetStyle(layer);
    });
});



let AreasSearch = new L.Control.Search({
    container: 'areasearch',
    layer: areas,
    propertyName: 'nome_area',
    marker: false,
    textCancel: true,
    collapsed: true,
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

AreasSearch.on('search:locationfound', function (e) {
    e.layer.setStyle({fillColor: '#ff6a07', color: '#000000', fillOpacity: 0.4});
    if (e.layer._popup)
        e.layer.openPopup();
}).off('search:collapsed', function (e) {
    areas.eachLayer(function (layer) {	//restore feature color
        areas.resetStyle(layer);
    });
});



let MicroAreasSearch = new L.Control.Search({
    container: 'microareasearch',
    layer: microareas,
    propertyName: 'busca',
    marker: false,
    textCancel: true,
    collapsed: true,
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

MicroAreasSearch.on('search:locationfound', function (e) {
    e.layer.setStyle({fillColor: '#ff6a07', color: '#000000', fillOpacity: 0.4});
    if (e.layer._popup)
        e.layer.openPopup();
}).off('search:collapsed', function (e) {
    microareas.eachLayer(function (layer) {	//restore feature color
        microareas.resetStyle(layer);
    });
});



let QuadraSearch = new L.Control.Search({
    container: 'quadrasearch',
    layer: quadra,
    propertyName: 'nome_quarteirao',
    marker: false,
    textCancel: true,
    collapsed: true,
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        let zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

QuadraSearch.on('search:locationfound', function (e) {
    e.layer.setStyle({fillColor: '#ff6a07', color: '#000000', fillOpacity: 0.4});
    if (e.layer._popup)
        e.layer.openPopup();
}).off('search:collapsed', function (e) {
    quadra.eachLayer(function (layer) {	//restore feature color
        quadra.resetStyle(layer);
    });
});

map.on('overlayadd ', function(e) {
    if (e.layer === distrito) {
        this.addControl(DistritoSearch);
    }
    else if (e.layer === areas) {
        this.addControl(AreasSearch);
    }
    else if (e.layer === territorio) {
        this.addControl(TerritorioSearch);
    }
    else if (e.layer === microareas) {
        this.addControl(MicroAreasSearch);
    }
    else if (e.layer === quadra) {
        this.addControl(QuadraSearch);
    }
});
