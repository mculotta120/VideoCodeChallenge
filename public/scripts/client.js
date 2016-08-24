console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller

myApp.controller('videoController', [ '$scope', '$http', function( $scope, $http ){
  // global list of movie searches
  $scope.videoArray = [];


//   $scope.videoGet = function(){
//     console.log("in videoGet");
//
//   var request = new XMLHttpRequest();
//
// request.open('POST', 'https://proofapi.herokuapp.com/sessions');
//
// request.setRequestHeader('Content-Type', 'application/json');
//
// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//     $scope.body = this.responseText;
//   }
// };
//
// var body = {
//   'email': 'margaret.culotta@gmail.com',
//   'password': 'capitalness,orchialgia,podical'
// };
//
// request.send(JSON.stringify(body));
// $scope.user = request;
// console.log($scope.user, "user");
// console.log($scope.userTwo, "user2");
// };

$scope.getAllVideos = function(){
       $http({
            method: 'GET',
            url: 'https://proofapi.herokuapp.com/videos?page&per_page?page=1&per_page=10',
            dataType: 'jsonp',
            headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
          }).then( function( response ){
            // log the response from the http call
            console.log( 'retrieved info for ', response.data.data);
   });
  //  $scope.videoArray = response.data;
   console.log($scope.videoArray, "videoArray");

  // var request = new XMLHttpRequest();
  //
  // request.open('GET', 'https://proofapi.herokuapp.com/videos?page&per_page?page=1&per_page=10');
  //
  // request.setRequestHeader('Content-Type', 'application/json');
  // request.setRequestHeader('X-Auth-Token', 'QmDi1cmmxgWSrpqqQmfj4UwJ');
  //
  // request.onreadystatechange = function () {
  //   if (this.readyState === 4) {
  //     console.log('Status:', this.status);
  //     console.log('Headers:', this.getAllResponseHeaders());
  //     console.log('Body:', this.responseText);
  //     $scope.videoArray = this.responseText;
  //   }
  // };

}; // end getAllVideos

$scope.addVideo = function(){
  var videoToAdd = {
    title: $scope.videoTitleIn,
    url: $scope.videoURLIn,
    slug: $scope.videoSlugIn
  };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/videos',
              data: videoToAdd,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
            }).then( function( response ){
             console.log(videoToAdd.title, "Added Video");
            }); // end object
     }; //end addVideo


// var request = new XMLHttpRequest();
//
// request.open('POST', 'https://proofapi.herokuapp.com/videos');
//
// request.setRequestHeader('Content-Type', 'application/json');
// request.setRequestHeader('X-Auth-Token', 'QmDi1cmmxgWSrpqqQmfj4UwJ');
//
// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };
//
// var body = {
//   'title': 'The Highest Mountain',
//   'url': 'http://vimeo.com/22439234',
//   'slug': 'the-highest-mountain'
// };
//
// request.send(JSON.stringify(body));


}]);
