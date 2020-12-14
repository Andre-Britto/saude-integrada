let maps = new L.Map('maps', {
    dragging: true,
    center: [-25.48, -54.32],
    zoom: 10,
    layers: [
        osmBw, cidade
    ],
    fullscreenControl: true,
    fullscreenControlOptions: { // optional
        title: "Entrar modo fullscreen !",
        titleCancel: "Sair modo fullscreen"
    }
});

let homes = {
    lat: -25.48,
    lng: -54.32,
    zoom: 10
};



L.easyButton('<i class="fa fa-home" style="font-size:15px;"></i>', function () {
    maps.setView([homes.lat, homes.lng], homes.zoom);
}, 'Zoom To Home').addTo(maps);
maps.on('enterFullscreen', function () {
    if (window.console) window.console.log('enterFullscreen');
});
maps.on('exitFullscreen', function () {
    if (window.console) window.console.log('exitFullscreen');
});




let baseTrees = {
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

let hasAllUnSelecteds = function () {
    return function (ev, domNode, treeNode, maps) {
        var anySelected = false;

        function iterate(node) {
            if (node.layer && !node.radioGroup) {
                anySelected = anySelected || maps.hasLayer(node.layer);
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

let bases_foz = {
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
    ]
};

let ctls = L.control.layers.tree(baseTrees, null,
    {
        namedToggle: true,
        selectorBack: false,
        collapseAll: 'Recolher todos',
        expandAll: 'Expandir todos',
        collapsed: false,
    });
ctls.addTo(maps).collapseTree().expandSelected();
ctls.setOverlayTree(bases_foz).collapseTree(true).expandSelected(true);


//map.addControl(searchControl);
//map.addControl(AreasSearch);
