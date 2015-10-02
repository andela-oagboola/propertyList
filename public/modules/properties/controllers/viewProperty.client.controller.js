'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['Authentication', '$scope', '$location', '$stateParams', 'backendService', 'uiGmapGoogleMapApi', function(Authentication, $scope, $location, $stateParams, backendService, uiGmapGoogleMapApi) {
  $scope.user = Authentication.user;
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property;
    $scope.owner = $scope.property.posted_by._id;


    //Google maps integration
    
    //get user location
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(function success(pos){
      console.log('user position', pos);
    }, function error(err) {
      console.log('error', err)
    }, options);

    //use google geolocator to find property on google maps
    var geocoder = new google.maps.Geocoder();
    var address_to_geocode = $scope.property.city + ", " + $scope.property.state;
    geocoder.geocode( { "address": address_to_geocode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        $scope.location = results[0].geometry.location;
        // $scope.myMap.panTo(location);
       }
    });
    
  });
  
  //use marker to point out property on google map
  $scope.marker = {
    id: 0,
    coords: {
      latitude: 6.4531,
      longitude: 3.3958
    }
  }

  // find distance with distance matrix service
  // 1 mile = 1.60934 km
  // 1 km  = 0.621371 mile
  var origin = "mokola, ibadan";
  var destination = "ikeja, lagos";

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function (response, status) {
      console.log(response);
    });

  // resizing map to make it show behind the property card
  // uiGmapGoogleMapApi.then(function(maps) {
  //   $scope.map = {
  //     center: {
  //       latitude: 6.4531,
  //       longitude: 3.3958
  //     },
  //     zoom: 14
  //     events: {
  //       tilesloaded: function (map) {
  //         $scope.$apply(function () {
  //           console.log('stuff');
  //           google.maps.event.trigger(map, "resize");
  //         });
  //       }
  //     }
  //   };

  //   setTimeout(function () {
  //     google.maps.event.trigger($scope.map, "resize");
  //     google.maps.event.trigger($scope.map.control.getGMap(), "resize");
  //     console.log("laskdjlks");
  //   }, 5000);
  // });

  $scope.deleteProperty = function () {
    var response = confirm('are you sure you want to delete this property?');
    if (response === true) {
      backendService.deleteProperty($stateParams.propertyId).success(function (result) {
        alert('property has been deleted');
        $location.path('/properties');
      }).error(function (err) {
        alert('err');
      });
    }
  };
}]);
