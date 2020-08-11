function passvalue(){
    const API_KEY = document.getElementById("API_KEY").value;
    localStorage.setItem("API_KEY", API_KEY);
    console.log("API Key entered: " + API_KEY);
    
}

function initMap() {
    // Map options
    var options = {
        zoom: 11,
        center: { lat: 22.409506, lng: 114.032065 }
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Loop through buildings with confirmed cases
    for (var i = 0; i < casesArray.length; i++) {
        addCases(i);
    }

    // Loop through local atttractions
    for (var i = 0; i < attractionsArray.length; i++) {
        addMarker(attractionsArray[i]);
    }

    // Add Confirmed Cases Function
    function addCases(index) {
        let data; let name = casesArray[index];
        var query = name.split(' ').join('+');
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyD5Ftd85SKpFEYBCJSzuOXK3zPgrCD5UdE')
            .then(response => response.json())
            .then(result => {
                data = result.results[0].geometry.location;
                entry = {
                    coords: data,
                    // iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    content: '<p>Covid Case:</p>' + name
                }
                addMarker(entry);
            });
    }

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon:props.iconImage
        });

        // Check for customicon
        if (props.iconImage) {
            // Set icon image
            marker.setIcon(props.iconImage);
        }

        // Click marker to see the details
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}
