angular.module('MyIonic.controllers', [])

.controller('ListviewCtrl', function($scope, $http, SERVER) {

  $scope.topics = [];
  function loadTopics(params, callback){
      $http.get(SERVER.url+'/listtopic', {params: params})
      .success(function(response){
        var topics = [];
        angular.forEach(response, function(result){
          topics.push(result);
        });
        callback(topics);
      });
    };

    $scope.loadMore = function(){
      var params = {};
      if($scope.topics.length > 0){ 
        params['before'] = $scope.topics[$scope.topics.length - 1].id;
        console.log(params);
      }
      loadTopics(params, function(olderTopics){
          $scope.topics = $scope.topics.concat(olderTopics);
          $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.doRefresh = function(){
      var params = {'after': $scope.topics[0].id};
      loadTopics(params, function(newerTopics){
          $scope.topics = newerTopics.concat($scope.topics);
          $scope.$broadcast('scroll.refreshComplete');
      });
    };
})

.controller('DetailCtrl', function($scope, $http, $stateParams, SERVER){
  $http.post(SERVER.url+'/detail', {id: $stateParams.id})
    .success(function(response){
      $scope.topic = response[0];
    });
})

.controller('NewtopicCtrl', function($scope, $state, $http, $cordovaCamera, SERVER){

  $scope.post = function(topic)
  {
    topic['picture'] = $scope.imgURI;
    $http.post(SERVER.url+'/newtopic', {params: topic})
    .success(function(response){
      if(response=='success'){
        $state.go('tab.listview');
      }else{
        alert(response);
      }
    });
  }

  $scope.takePicture = function(source)
    {
        var options = { 
            quality : 85, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : source,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 180,
            targetHeight: 180,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
});
