"use strict"
const app = angular.module('birdsApp', []);
const serverURI = 'http://localhost:3000';
app.controller('BirdsController', function($http) {
    console.log('I m in');
    const self = this;
    self.model = {};
    self.allBirds = [];
    self.addBird = (birdsObj) => {
        console.log('In birds add');
        console.log(birdsObj);
        $http({
            method: 'POST',
            url: serverURI + '/birds',
            data: birdsObj
        }).then((response) => {
            self.allBirds.push(birdsObj);
            self.model = {};
        }, (err) => {
            console.log(err);
        });
    }
    self.getAllBirds = () => {
        $http({
            method: 'GET',
            url: serverURI + '/birds'
        }).then((response) => {
          console.log(response.data);
            self.allBirds = response.data;
        }, (err) => {
            console.log(err);
        });
    }
})