angular.module('MyIonic', 
  ['ionic', 
   'MyIonic.controllers',
   'angularMoment',
   'ngCordova',
   'ngIOS9UIWebViewPatch'
   ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('SERVER', {
    //url: 'http://smilefriday.com/ionic/topic'
    url: 'api'
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.listview', {
    url: '/listview',
    views: {
      'tab-listview': {
        templateUrl: 'templates/listview.html',
        controller: 'ListviewCtrl'
      }
    }
  })

  .state('tab.newtopic', {
    url: '/newtopic',
    views: {
      'tab-listview': {
        templateUrl: 'templates/newtopic.html',
        controller: 'NewtopicCtrl'
      }
    }
  })

.state('tab.detail', {
    url: '/detail/:id',
    views: {
      'tab-listview': {
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

.state('tab.information', {
    url: '/information',
    views: {
      'tab-information': {
        templateUrl: 'templates/information.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/listview');

});
