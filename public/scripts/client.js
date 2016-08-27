console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller

myApp.controller('videoController', [ '$scope', '$http', '$window', function( $scope, $http, $window ){
  $scope.videoArray = [];
  $scope.votingOpen = 'true';
  $scope.votingMessage = "Voting is Open";
  $scope.addInMessage = "Add a Video";
  $scope.inputMessage = "";
  $scope.voteToday = "true";

  //open voting and new video input m-f

$scope.toggleVoting = function(){
  $scope.d = new Date();
  $scope.n = $scope.d.getDay();
  // console.log($scope.n, "is the day");
  if($scope.n == "0" || $scope.n == "6"){
    $scope.votingOpen = 'false';
    $scope.votingMessage = "voting is closed";
    $scope.addInMessage= "Please come back Monday - Friday to add a Video";
  }else {
    $scope.votingOpen = 'true';
    $scope.votingMessage = "voting is open";
    $scope.addInMessage ="Add a Video";
  }
  console.log($scope.addInOpen, "addInOpen()");
  console.log($scope.addInMessage);

};

//function to populate table with all of the videos in the API
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
$scope.toggleVoting();

}; // end getAllVideos

$scope.titleCheck = function(){
  for (i = 0; i < $scope.videoArray.length; i++){
  if($scope.videoURLIn == $scope.videoArray[i].attributes.url){
  $scope.inputMessage = "This video has already been added. Please add a new video.";
  }else{ console.log("this is a new video.");
  console.log($scope.videoArray[i].attributes.url, "url");
  // $scope.addVideo();
  }
}
};

$scope.addVideo = function(){
    $scope.videoTitleIn = "";
    $scope.videoURLIn = "";
    $scope.videoSlugIn = "";
    $scope.getAllVideos();
    $route.reload();
    console.log($scope.inputMessage, "inputMessage");


  // var videoToAdd = {
  //   title: $scope.videoTitleIn,
  //   url: $scope.videoURLIn,
  //   slug: $scope.videoSlugIn
  // };
  // $http({
  //             method: 'POST',
  //             url: 'https://proofapi.herokuapp.com/videos',
  //             data: videoToAdd,
  //             dataType: 'jsonp',
  //             headers: { 'Content-Type':'application/json', 'X-Auth-Token':'QmDi1cmmxgWSrpqqQmfj4UwJ' }
  //           }).then( function( response ){
  //            console.log(videoToAdd.title, "Added Video");
  //           }); // end object
  //

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

            $scope.voteToday = "false";
};  //end voteUp

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

            $scope.voteToday = "false";
}; //end voteDown

$scope.predicate = 'title';
      $scope.reverse = true;
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

}]);
