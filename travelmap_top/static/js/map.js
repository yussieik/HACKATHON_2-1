var map = L.map('map').setView([40, 15], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 2,
    minZoom: 2,
    boxZoom: false,
    zoomControl: false,
    dragging: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
//     maxZoom: 2,
//     minZoom: 2,
//     boxZoom: false,
//     zoomControl: false,
//     dragging: false,
// 	ext: 'png'
// }).addTo(map);


// var countriesData = L.geoJSON(countriesJSON,{
//     onEachFeature: function(feature,layer){
//         layer.bindPopup('<b>This is a </b>' + feature.properties.ADMIN)
//     },
//     style:{
//         fillColor: '#0B6EFD',
//         fillOpacity:0.9,
//         color: 'lightblue'
//     }
// }).addTo(map);


// Fetch the GeoJSON data for the countries
fetch('../../static/js/countries.geojson')
  .then(response => response.json())
  .then(data => {
    // Call the createMap function with the fetched GeoJSON data
    createMap(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function createMap(geojsonData) {

  var countriesLayer = L.geoJSON(geojsonData, {
    style: function(feature) {
      return { fillOpacity: 0.4 };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.ADMIN);
    }
  }).addTo(map);

  var checkboxes = document.querySelectorAll('input[name="country"]');
  var addButton = document.getElementById('button-add');

  var selectedCountries = [];

  addButton.addEventListener('click', function() {
    // var selectedCountries = [];
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        var countryName = checkbox.parentNode.querySelector('label').innerText;
        selectedCountries.push(checkbox.value);
        console.log("list of selected countries", selectedCountries);
      }
    });
    highlightSelectedCountries(countriesLayer, selectedCountries);
  });


//   function highlightCountries(countries) {
//     // Reset the style of all countries
//     countriesLayer.eachLayer(function(layer) {
//       layer.setStyle({ fillOpacity: 0.4 });
//     });

//     // Highlight the selected countries
//     countriesLayer.eachLayer(function(layer) {
//       var countryName = layer.feature.properties.ADMIN;
//       if (countries.includes(countryName)) {
//         layer.setStyle({ fillOpacity: 0.8, fillColor: 'blue' });
//       }
//     });
//   }
// }


    // var targetCountries = ['Argentina', 'Brazil', 'Russia']; // Specify the countries you want to highlight

    // countriesLayer.eachLayer(function(layer) {
    // var countryName = layer.feature.properties.ADMIN;
    // if (selectedCountries.includes(countryName)) {
    //     layer.setStyle({ fillOpacity: 0.8, fillColor: '#0B6EFD', color: 'lightblue'});
    //     layer.openPopup();
    // } else {
    //     layer.setStyle({ fillOpacity: 0.4, fillColor: 'white'});
    //     layer.closePopup();
    // }
    // });

    function highlightSelectedCountries(countriesLayer, selectedCountries) {
        countriesLayer.eachLayer(function(layer) {
          var countryName = layer.feature.properties.ADMIN;
          if (selectedCountries.includes(countryName)) {
            layer.setStyle({ fillOpacity: 0.8, fillColor: '#0B6EFD', color: 'lightblue' });
            layer.openPopup();
          } else {
            layer.setStyle({ fillOpacity: 0.4, fillColor: 'white' });
            layer.closePopup();
          }
        });
    }
}

