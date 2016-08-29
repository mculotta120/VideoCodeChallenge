console.log("client.js is sourced");

//create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller

myApp.controller('videoController', [ '$scope', '$http', '$window', function( $scope, $http, $window ){
  $scope.videoArray = [];
  $scope.urlArray=[];
  $scope.votingOpen = 'true';
  $scope.votingMessage = "Voting is Open";
  $scope.addInMessage = "Add a Video";

  //open voting and new video input m-f

$scope.toggleVoting = function(){
  $scope.d = new Date();
  // $scope.n = $scope.d.getDay();
  $scope.n = '5';
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
            url: 'https://proofapi.herokuapp.com/videos',
            dataType: 'jsonp',
            headers: { 'Content-Type':'application/json', 'X-Auth-Token':'3mSSbwByhVHUpqRQSGMTP9Ja' }
          }).then( function( response ){
            // log the response from the http call
            console.log( 'retrieved info for ', response.data.data);
            $scope.videoArray = response.data.data;
            console.log($scope.videoArray, "video array");
   });

   $scope.toggleVoting();
}; // end getAllVideos

//checks input url for duplicates within the API
$scope.titleCheck = function(){
  for (i = 0; i < $scope.videoArray.length; i++){
  $scope.urlArray.push($scope.videoArray[i].attributes.url);}
  if ($scope.urlArray.indexOf( $scope.videoURLIn ) === -1) {
    console.log("this is a new video");
    $scope.addVideo();
}else{
  alert("This Video has already been added. Please add a new video.");
}

};

//add video to API
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
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'3mSSbwByhVHUpqRQSGMTP9Ja' }
            }).then( function( response ){
             console.log(videoToAdd.title, "Added Video");
             $scope.getAllVideos();
            }); // end object

  $scope.videoTitleIn = "";
  $scope.videoURLIn = "";
  $scope.videoSlugIn = "";
  // $scope.getAllVideos();
}; //end addVideo

//increase view count if link is clicked
$scope.viewTallyUp = function( video ){
  var url = video.attributes.url;

    var viewUpdate = {
       video_id: video.id
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/views',
              data: viewUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'3mSSbwByhVHUpqRQSGMTP9Ja' }
            }).then( function( response ){
            //  console.log(response, "back from POST");
            }); // end object

    $window.open( url );
    $scope.getAllVideos();
};

//add vote to vote_tally
$scope.voteUp = function( video ){
  $scope.videoIndex = video.id;
    var voteUpdate = {
      opinion: 1
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/videos/'+$scope.videoIndex+'/votes',
              data: voteUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'3mSSbwByhVHUpqRQSGMTP9Ja' }
            }).then( function( response ){
            //  console.log(response, "back from POST");
            }); // end object
// $scope.votingOpen.video = 'false';
$scope.getAllVideos();
};  //end voteUp

//subract vote from vote tally
$scope.voteDown = function( video ){
  $scope.videoIndex = video.id;
    var voteUpdate = {
      opinion: -1
    };
  $http({
              method: 'POST',
              url: 'https://proofapi.herokuapp.com/videos/'+$scope.videoIndex+'/votes',
              data: voteUpdate,
              dataType: 'jsonp',
              headers: { 'Content-Type':'application/json', 'X-Auth-Token':'3mSSbwByhVHUpqRQSGMTP9Ja' }
            }).then( function( response ){
            //  console.log(response, "back from POST");
            }); // end object
  $scope.getAllVideos();
}; //end voteDown



//sort by table headers
$scope.predicate = 'title';
      $scope.reverse = true;
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

}]);
