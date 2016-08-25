console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller

myApp.controller('videoController', [ '$scope', '$http', '$window', function( $scope, $http, $window ){
  // global list of movie searches
  $scope.videoArray = [];
  $scope.votingOpen = 'true';


$scope.getAllVideos = function(){

      

       $http({
            method: 'GET',
            url: 'https://proofapi.herokuapp.com/videos?page&per_page?page=1&per_page=10',
            dataType: 'jsonp',
            headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
          }).then( function( response ){
            // log the response from the http call
            console.log( 'retrieved info for ', response.data.data);
            $scope.videoArray = response.data.data;
   });


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

            $scope.videoTitleIn = "";
            $scope.videoURLIn = "";
            $scope.videoSlugIn = "";
            $scope.getAllVideos();
            $route.reload();

     }; //end addVideo

  $scope.sortName     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order

$scope.viewTallyUp = function( $index ){
  var url = $scope.videoArray[$index].attributes.url;

    var viewUpdate = {
       video_id: $scope.videoArray[$index].id
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/views',
              data: viewUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
            }).then( function( response ){
             console.log(response, "back from POST");
            }); // end object

    $window.open( url );
};

$scope.voteUp = function( $index ){
  console.log($scope.videoArray[$index].id, "id");
  $scope.videoIndex = $scope.videoArray[$index].id;
  console.log($scope.videoIndex, "video index");
    var voteUpdate = {
      // votes: $scope.plusOne
      opinion: 1
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/videos/'+$scope.videoIndex+'/votes',
              data: voteUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
            }).then( function( response ){
             console.log(response, "back from POST");
            }); // end object
};

$scope.voteDown = function( $index ){
  console.log($index, "vote down clicked");
  $scope.videoIndex = $scope.videoArray[$index].id;
  console.log($scope.videoIndex, "video index");
    var voteUpdate = {
      opinion: -1
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/videos/'+$scope.videoIndex+'/votes',
              data: voteUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
            }).then( function( response ){
             console.log(response, "back from POST");
            }); // end object
};



}]);
