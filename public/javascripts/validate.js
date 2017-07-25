// app.js
// create angular app
//var signup = angular.module('signup', []);

// create angular controller
//signup.controller('regController', function($scope) {

  // function to submit the form after all validation has occurred            
  //$scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    //if (isValid) {
    //  alert('Registered Successfully...');
    //}

  //};

//});


/**
 * Created by sasidhar on 21/07/17.
 */
(function () {

    // create an app instance and then add it to HTML tag

    var app = angular.module('signup', []);


    // create a controller and then add it to DIV tag inside BODY

    app.controller("regController", function ($scope, $http) {

        // $scope holds the current context. It's just like a creating a self variable and storing this value in self
        // you can still use this keyword in place of $scope.

        // an empty user object
        $scope.user = {
            gender: 'Male'
        };

        // holds AJAX call status.
        $scope.status = "";
        $scope.statusContext = "";

        // bind addUser function to onAddUser button click

        $scope.addUser = function () {

            // make an AJAX (POST) request to server and send user data as POST body.

            $scope.statusContext = "making request";
            $scope.status = "Saving contact details...";

            $http.post("/api/users", $scope.user).then(function (res) {

                //    executes this callback function when server responded with success code.

                // reset user back to initial state
                $scope.user = {
                    gender: 'Male'
                };

                // reset form data
                $scope.userForm.$setPristine();
                $scope.userForm.$setUntouched();

                $scope.statusContext = "success";
                $scope.status = "Contact details saved successfully.";

            }, function (errRes) {

                //    executes this callback function when server responded with error code.
                console.error(errRes);
                $scope.statusContext = "error";
                $scope.status = errRes.data.err;

            });

        };

    });


})();