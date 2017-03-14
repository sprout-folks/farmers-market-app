 angular.module('farmer.adminUpdate', [])
    .controller('AdminController', function($scope, httpAdminFactory) {
      $scope.list = [];
      $scope.marketID = ''
      $scope.singleObj;
      $scope.singleObjView = false;
      $scope.alertView = false;
      $scope.successView = false;
      $scope.addView = false;
      $scope.addObject = { geometry : { type: "Point",
      coordinates: [] } };
      $scope.enterInfo = true;

      //helper function
      $scope.flipObjView = function(){
        $scope.singleObjView = !$scope.singleObjView;
      };
      //helper function 
      $scope.flipAlert = function(){
        $scope.alertView = !$scope.alertView;
      };

      $scope.flipAdd =function(){
        $scope.addView = !$scope.addView;
      };

      // $scope.flipEnterInfo = function(){
      //   $scope.enterInfo = !$scope.enterInfo;
      // }

      $scope.submitUpdate = function(){
        httpAdminFactory.update($scope.singleObj)
          .then((resp)=>{
            $scope.successView= true;
          });

      };
      
      $scope.addMarket = function(){
        httpAdminFactory.addMarket($scope.addObject)
          .then((resp)=>{
            $scope.successView = true;
            $scope.addView=false;
          });

      };

      $scope.deleteMarket = function(){
        httpAdminFactory.deleteMarket($scope.singleObj)
          .then((resp)=>{
            $scope.successView= true;
            $scope.addView = false;
          });
      };

      $scope.retrieveMarket = function(){

        if($scope.marketID){
          httpAdminFactory.getOne($scope.marketID)
            .then((obj)=> { 
              if(obj.data === "not found"){
                $scope.alertView = true;
              }else{
                $scope.alertView = false;
                $scope.singleObj= obj; 
                if($scope.singleObjView===false){
                  $scope.singleObjView = true;
                }
                if($scope.successView===true){
                  $scope.successView = false;
                }
                $scope.marketID = "";
             } 
            })
            .catch(()=>{console.log("doing something");});

      }
    };
  });



