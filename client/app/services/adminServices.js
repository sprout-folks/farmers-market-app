angular.module('farmer.adminServices', [])

.factory('httpAdminFactory', function ($http) {

    var getOne = function(marketId){
        return $http({
        method: 'POST',
        url: '/api/getOne',
        data: { marketId : marketId}
      })
        .catch(()=>{console.log("not working");})
    };

    var update = function(updatedObj){
      return $http({
        method: 'PUT',
        url: '/api/update',
        data: { updatedObj : updatedObj }
      });

    };

    var deleteMarket = function(market){
      return $http({
        method: 'PUT',
        url: '/api/delete',
        data: { market: market}
      });
    };

    var addMarket = function(market){
      return $http({
        method: 'PUT',
        url: '/api/add',
        data: { market: market}
      });
    }

    return {
      getOne : getOne,
      update: update,
      deleteMarket: deleteMarket,
      addMarket: addMarket
    };


})
.factory('Auth', function($http, $window, $location) {
  var login = function(credentials) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    .then(function(response) {
      return response.data.token;
    });
  }

  var isAuth = function() {
    return !!$window.localStorage.getItem('token');
  }

  var signout = function() {
    $window.localStorage.removeItem('token');
    $location.path('/search');
  }

  return {
    login: login,
    isAuth: isAuth,
    signout: signout
  }
});
