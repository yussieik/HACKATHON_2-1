var map = L.map('map').setView([40, 15], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 2,
    minZoom: 2,
    boxZoom: false,
    zoomControl: false,
    dragging: false,
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


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
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.ADMIN);
    }
  }).addTo(map);

  var checkboxes = document.querySelectorAll('input[name="country"]');
  var addButton = document.getElementById('button-add');
  var hasVisitedDiv = document.getElementById('has-visited');

  var selectedCountries = [];

  addButton.addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        selectedCountries.push(checkbox.value);
        console.log("list of selected countries", selectedCountries);
      }
    });
    highlightSelectedCountries(countriesLayer, selectedCountries);
    addData(selectedCountries);
    // const countriesString = selectedCountries.join(", ");
    const result = Math.round((selectedCountries.length / 248) * 100);
    hasVisitedDiv.innerHTML = result + '%';
  });

//   coocie function
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



    async function addData(selectedCountries) {
        console.log("in adddata");
        const csrftoken = getCookie('csrftoken'); // HERE: get the token 
        const countriesSelected = {
            selectedCountries: selectedCountries
        }
        const response = await fetch("http://127.0.0.1:8000/api/add-countries/", {
            method : "POST",
            // headers,
            headers : {
                // 'X-CSRFToken': '{{ csrf_token }}',
                "X-CSRFToken": csrftoken , // HERE: add it to the request header
                "Content-Type": 'application/json',
            },
            body : JSON.stringify(countriesSelected),
            credentials: 'include'
        })   
        const result = await response.json();
        console.log("result", result);
    }

    function highlightSelectedCountries(countriesLayer, selectedCountries) {
        countriesLayer.eachLayer(function(layer) {
          var countryName = layer.feature.properties.ADMIN;
          if (selectedCountries.includes(countryName)) {
            layer.setStyle({ fillOpacity: 0.8, fillColor: '#0B6EFD', color: 'lightblue' });
            layer.openPopup();
          } else {
            // layer.setStyle({ fillOpacity: 0.8 });
            layer.closePopup();
          }
        });
    }
}

