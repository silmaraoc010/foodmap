// Add your JavaScript

var map, infoWindow;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      latitud:-23.2794319,
      longitud: -46.7448066
    },
    zoom: 10
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });


  for (var i = 0; i < restaurantes.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(restaurantes[i].latitude, restaurantes[i].longitude),
      title: restaurantes[i].name,
      map: map,
      icon: 'assets/icon.png',

    });

    var infowindow = new google.maps.InfoWindow(), marker;
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
      }
    })(marker))
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Olá, você está aqui!.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
   'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
//Splash screen
$(document).ready(function () {
  $('.screen-splash').delay('4000').fadeOut('slow');
  $('.screen-main').delay('4000').fadeIn('slow'); 

// Chamando os restaurantes
     function insert(restaurantes) {
    restaurantes.forEach((restaurante, index) => {
      $('.result-rest').append('<div id="' + index + '" class="" data-toggle="modal" data-target="#modal' + index + '">  <div class="item"><img src="' + restaurante.image + '"> <h5 class="nameRestaurant" style="align-items: center">' + restaurante.name + '</h5></div></div>');
      $('#' + index).click(function() {
        $('.screen-main').append('<div class="modal" id="modal' + index + '" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">'+ restaurante.name +'</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"><img src="' + restaurante.image + '" width="150px" height="150px"><p>' + restaurante.description + '</p> <strong>' + restaurante.type +'</strong> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> </div> </div> </div> </div>');
      });
    });
  }
  insert(restaurantes);
   
  $('.type').each(function () {
    $(this).on('click', function () {
      searchByType($(this).val());
    });
  })

  function searchByType(el) {
    $('h5').each(function () {
      if ($(this).text() !== el) {
        $(this).parent().fadeOut('slow');
      } if ($(this).text() === el) {
        $(this).parent().fadeIn('slow');
      }
    })
  }

  $('.search').on('click', function () {
    $('.nameRestaurant').each(search);
  })
  function search() {
    if ($(this).text().toLowerCase() !== $('.input').val().toLowerCase()){
      $(this).parent().fadeOut('slow');
    } if ($(this).text() === $('.input').val()) {
      $(this).parent().fadeIn('slow');
    }
  }
  $('.input').on('input', function () {
    if ($(this).val() === "") {
      $('h5').each(function () {
        $(this).parent().fadeIn('slow');
      });
    }
  })
})

