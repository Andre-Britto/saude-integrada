let map = new L.Map('map_covid', {
    dragging: true,
    center: [-25.51, -54.50],
    zoom: 12,
    layers: [
        osmBw, distrito
    ],
    fullscreenControl: true,
    fullscreenControlOptions: { // optional
        title: "Entrar modo fullscreen !",
        titleCancel: "Sair modo fullscreen"
    }
});

let foz = {
    lat: -25.51,
    lng: -54.50,
    zoom: 10
};


L.easyButton('<i class="fa fa-home" style="font-size:15px;"></i>', function () {
    map.setView([foz.lat, foz.lng], foz.zoom);
}, 'Zoom To Home').addTo(map);
map.on('enterFullscreen', function () {
    if (window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function () {
    if (window.console) window.console.log('exitFullscreen');
});


let geojsonLayer = $.ajax({
    type: 'GET',
    url: urlcovid,
    dataType: 'json',
    jsonpCallback: 'getJson',
    success: console.log("Data successfully loaded!"),
});

let hot = geojsonLayer

    console.log(hot)

let hotcovid = geoJson2heat(hot_covid, '');
let hot_covid19 = new L.heatLayer(hotcovid, {
    attribution: '',
    blur: 39,
    radius: 19,
    maxZoom: 12,
    minOpacity: 1,
    scaleRadius: false,
    // gradient: {1: '#2b83ba', 0.75: '#94dd75', 0.50: '#ffe67a', 0.25: '#fd0008', 0.1: '#d7191c'}
});

function geoJson2heat(geojson, weight) {
    return geojson.features.map(function (feature) {
        return [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
            feature.properties[weight]
        ];
    });
}


let baseTree = {
    label: 'BaseLayers',
    collapsed: false,
    noShow: false,
    children: [
        {
            label: '<b class="mdi mdi-map" style="font-size: 14px; color: blue;"> OPENLAYERS</b>',
            children: [
                {
                    label: ' B&W',
                    layer: osmBw,
                    name: '<b class="mdi mdi-map" style="font-size: 12px; color: black"> - PAINEL DE CAMADAS</b>'
                },
                {
                    label: ' Street',
                    layer: osm,
                    name: '<b class="mdi mdi-map" style="font-size: 12px; color: black"> - PAINEL DE CAMADAS</b>'
                },
                {
                    label: ' Satélite',
                    layer: bing,
                    name: '<b class="mdi mdi-map" style="font-size: 12px; color: black"> - PAINEL DE CAMADAS</b>'
                },
                {
                    label: ' Vazio',
                    layer: vazio,
                    name: '<b class="mdi mdi-map" style="font-size: 12px; color: black"> - PAINEL DE CAMADAS</b>'
                },
            ]
        },
    ]
};

let hasAllUnSelected = function () {
    return function (ev, domNode, treeNode, map) {
        var anySelected = false;

        function iterate(node) {
            if (node.layer && !node.radioGroup) {
                anySelected = anySelected || map.hasLayer(node.layer);
            }
            if (node.children && !anySelected) {
                node.children.forEach(function (element) {
                    iterate(element);
                });
            }
        }

        iterate(treeNode);
        return !anySelected;
    };
};

let base_foz = {
    label: '<b class="mdi mdi-map" style="font-size: 14px; color: #ff000d;"> Foz do Iguaçu</b>',
    selectAllCheckbox: true,
    children: [
        {
            label: '<b class="mdi mdi-map" style="font-size: 14px; color: #008000;"> Base Territorial</b>',
            selectAllCheckbox: true,
            children: [
                {label: '<span style="font-size: 14px; color: #04B404;"> Cidade</span>', layer: cidade},
                {label: '<span style="font-size: 14px; color: #ff9712;"> Distrito Sanitário</span>', layer: distrito},
                {label: '<span style="font-size: 14px; color: #842c36;"> Territórios</span>', layer: territorio},
                {label: '<span style="font-size: 14px; color: #f00001;"> Áreas</span>', layer: areas},
                {label: '<span style="font-size: 14px; color: #111ba1;"> MicroÁreas</span>', layer: microareas},
                {label: '<span style="font-size: 14px; color: #000000;"> Quarteirão</span>', layer: quadra}
            ]
        },
        {
            label: '<b class="mdi mdi-map" style="font-size: 14px; color: #e58341;"> DIVS</b>',
            selectAllCheckbox: true,
            children: [
                {
                    label: '<span style="font-size: 14px; color: #0445b4;"> COVID-19</span>',
                    selectAllCheckbox: true,
                    children: [
                        {
                            label: '<span style="font-size: 14px; color: #f50126;"> Casos Ativos</span>',
                            layer: covid
                        },
                        {
                            label: '<span style="font-size: 14px; color: #15a205;"> Mapa de Calor</span>',
                            layer: hot_covid19
                        },

                    ]
                },
            ]
        },
    ]
};

let ctl = L.control.layers.tree(baseTree, null,
    {
        namedToggle: true,
        selectorBack: false,
        collapseAll: 'Recolher todos',
        expandAll: 'Expandir todos',
        collapsed: false,
    });
ctl.addTo(map).collapseTree().expandSelected();
ctl.setOverlayTree(base_foz).collapseTree(true).expandSelected(true);


//map.addControl(searchControl);
//map.addControl(AreasSearch);
