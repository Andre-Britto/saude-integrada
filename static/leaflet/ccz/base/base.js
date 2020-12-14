var vazio = new L.tileLayer("", {active: true});
let bing = new L.tileLayer.bing('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L', {type: 'AerialWithLabels'});
let osm = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
});
let osmBw = L.tileLayer(
    'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    {attribution: '© OpenStreetMap contributors'}
);


let customPopup =
    {
        'maxHeight': '500',
        'autoPan': true,
        'maxWidth': '250',
        'minWidth': '200'
    };

const urlareas = "http://172.27.1.40:8080/geoserver/smsa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=smsa%3Aareas&maxFeatures=500&outputFormat=application%2Fjson";
const urlquadra = "http://172.27.1.40:8080/geoserver/smsa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=smsa%3Aquarteirao&maxFeatures=5000&outputFormat=application%2Fjson";
const urlcidade = "http://saudeintegrada.pmfi.pr.gov.br:8080/geoserver/SMSA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SMSA%3Amunicipios&maxFeatures=500&outputFormat=application%2Fjson";
const urldistrito = "http://172.27.1.40:8080/geoserver/smsa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=smsa%3Adistrito_sanitario&maxFeatures=50&outputFormat=application%2Fjson";
const urlterritorio = "http://172.27.1.40:8080/geoserver/smsa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=smsa%3Aterritorios&maxFeatures=500&outputFormat=application%2Fjson";
const urlmicroareas = "http://172.27.1.40:8080/geoserver/smsa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=smsa%3Amicroareas&maxFeatures=5000&outputFormat=application%2Fjson";




const microareas = new L.GeoJSON.AJAX(urlmicroareas, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nome_microarea) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Distrito Sanitário:</th>\n' +
                '      <td>' + feature.properties.nome_distrito + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Território:</th>\n' +
                '      <td>' + feature.properties.nome_territorio + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Equipe:</th>\n' +
                '      <td>' + feature.properties.nome_area + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Micro Área:</th>\n' +
                '      <td>' + feature.properties.nome_microarea + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>ACS:</th>\n' +
                '      <td>' + feature.properties.nome_acs + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Famílias:</th>\n' +
                '      <td>XXXXX</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Homens:</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Mulheres:</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>\n' +
                '  </table> ' +
                '<p><br>Fonte: SMSA-DIAB</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_microarea + '-' + feature.properties.nome_acs, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassQuadra'
            });
        }
    },
    style: function (feature) {
        if (feature.properties.nome_distrito === 'NORTE') {
            return {
                width: 2,
                color: "#38710d",
                fillColor: '#a6ff6f',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'NORDESTE') {
            return {
                width: 2,
                color: "#b49a12",
                fillColor: '#f4ffa0',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'OESTE') {
            return {
                width: 2,
                color: "#111ba1",
                fillColor: '#6ccfff',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'LESTE') {
            return {
                width: 2,
                color: "#a64a7c",
                fillColor: '#ff9df2',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'SUL') {
            return {
                width: 2,
                color: "#a60800",
                fillColor: '#f06870',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else {
            return {
                width: 2,
                color: "#000000",
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        }
    }

});

const areas = new L.GeoJSON.AJAX(urlareas, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nome_area) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Distrito Sanitário:</th>\n' +
                '      <td>' + feature.properties.nome_distrito + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Território:</th>\n' +
                '      <td>' + feature.properties.nome_territorio + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Equipe:</th>\n' +
                '      <td>' + feature.properties.nome_area + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Médico(a):</th>\n' +
                '      <td>nome do médico(a)</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Enfermeira(o):</th>\n' +
                '      <td>nome da enfermeira(o)</td>\n' +
                '    </tr>\n' +
                '  </table> ' +
                '<p><br>Fonte: SMSA-DIAB</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_area, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassArea'
            });
        }
    },
    style: function (feature) {
        if (feature.properties.nome_distrito === 'NORTE') {
            return {
                width: 2,
                color: "#38710d",
                fillColor: '#a6ff6f',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'NORDESTE') {
            return {
                width: 2,
                color: "#b49a12",
                fillColor: '#f4ffa0',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'OESTE') {
            return {
                width: 2,
                color: "#111ba1",
                fillColor: '#6ccfff',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'LESTE') {
            return {
                width: 2,
                color: "#a64a7c",
                fillColor: '#ff9df2',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'SUL') {
            return {
                width: 2,
                color: "#a60800",
                fillColor: '#f06870',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else {
            return {
                width: 2,
                color: "#000000",
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        }
    }

});

const quadra = new L.GeoJSON.AJAX(urlquadra, {
    width: 0.5,
    color: "#000000",
    fillColor: '#fbfcd8',
    weight: 2,
    opacity: 0.2,
    lineCap: 'square',
    lineJoin: "bevel",
    fillOpacity: 0.0,

    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nome_quarteirao) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Número:</th>\n' +
                '      <td>' + feature.properties.nome_quarteirao + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Residências:</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Comércios:</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>' +
                '      <th>Terrenos Baldios</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>' +
                '      <th>Outros:</th>\n' +
                '      <td>XXXXXX</td>\n' +
                '    </tr>' +
                '  </table> ' +
                '<p><br>Fonte: CCZ</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_quarteirao, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassQuadra'
            });
        }
    },

});


const territorio = new L.GeoJSON.AJAX(urlterritorio, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nome_territorio) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Distrito Sanitário:</th>\n' +
                '      <td>' + feature.properties.nome_distrito + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Território:</th>\n' +
                '      <td>' + feature.properties.nome_territorio + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Gerente:</th>\n' +
                '      <td>nome do gerente</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Endereço:</th>\n' +
                '      <td>Rua , número - bairro</td>\n' +
                '    </tr>\n' +
                '  </table> ' +
                '<p><br>Fonte: SMSA-DIAB</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_territorio, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassQuadra'
            });
        }
    },
    style: function (feature) {
        if (feature.properties.nome_distrito === 'NORTE') {
            return {
                width: 2,
                color: "#38710d",
                fillColor: '#a6ff6f',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'NORDESTE') {
            return {
                width: 2,
                color: "#b49a12",
                fillColor: '#f4ffa0',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'OESTE') {
            return {
                width: 2,
                color: "#111ba1",
                fillColor: '#6ccfff',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'LESTE') {
            return {
                width: 2,
                color: "#a64a7c",
                fillColor: '#ff9df2',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'SUL') {
            return {
                width: 2,
                color: "#a60800",
                fillColor: '#f06870',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else {
            return {
                width: 2,
                color: "#000000",
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        }
    }

});


const distrito = new L.GeoJSON.AJAX(urldistrito, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nome_distrito) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Distrito Sanitário:</th>\n' +
                '      <td>' + feature.properties.nome_distrito + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Supervisor:</th>\n' +
                '      <td>nome do supervisor</td>\n' +
                '    </tr>\n' +
                '  </table> ' +
                '<p><br>Fonte: SMSA-DIAB</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_distrito, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassQuadra'
            });
        }
    },
    style: function (feature) {
        if (feature.properties.nome_distrito === 'NORTE') {
            return {
                width: 2,
                color: "#38710d",
                fillColor: '#a6ff6f',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'NORDESTE') {
            return {
                width: 2,
                color: "#b49a12",
                fillColor: '#f4ffa0',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'OESTE') {
            return {
                width: 2,
                color: "#111ba1",
                fillColor: '#6ccfff',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'LESTE') {
            return {
                width: 2,
                color: "#a64a7c",
                fillColor: '#ff9df2',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else if (feature.properties.nome_distrito === 'SUL') {
            return {
                width: 2,
                color: "#a60800",
                fillColor: '#f06870',
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        } else {
            return {
                width: 2,
                color: "#000000",
                weight: 1,
                opacity: 1,
                lineCap: 'square',
                lineJoin: "bevel",
                fillOpacity: 0.1
            }
        }
    }
});

const cidade = new L.GeoJSON.AJAX(urlcidade, {
    filter: function (feature, layer) {
        return feature.properties.nome_municipio === 'FOZ DO IGUACU';
    },
    width: 1.5,
    color: "#000000",
    weight: 1,
    opacity: 50,
    lineCap: 'square',
    lineJoin: "bevel",
    fillOpacity: 0.2,
    fillColor: '#43ad8d',
    onEachFeature: function (feature, layer) {

        if (feature.properties && feature.properties.nome_municipio) {
            layer.bindPopup(' <div class="ibox-content">' +
                '<form id="popup-form">\n' +
                '  <div class="form-group"><label for="input-speed" style="color: darkred; font-size: 20px">Detalhes</label> </div>\n' +
                '  <table class="table">\n' +
                '    <tr>\n' +
                '      <th>Código:</th>\n' +
                '      <td>' + feature.properties.id + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Município:</th>\n' +
                '      <td>' + feature.properties.nome_municipio + '</td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <th>Área Territorial:</th>\n' +
                '      <td>618,353 km² [2018]</td>\n' +
                '    </tr>' +
                '      <th>População Estimada:</th>\n' +
                '      <td>258.532 pessoas  [2019]</td>\n' +
                '    </tr>' +
                '      <th>Densidade Demográfica:</th>\n' +
                '      <td>414,58 hab/km²  [2010]</td>\n' +
                '    </tr>' +
                '  </table> ' +
                '<p><br>Fonte: IBGE</p>\n' +
                '</form> ' +
                '</div>',
                customPopup);
            layer.bindTooltip(feature.properties.nome_municipio, {
                permanent: false,
                interactive: true,
                direction: 'center',
                className: 'ClassQuadra'
            });
        }
    }

});
