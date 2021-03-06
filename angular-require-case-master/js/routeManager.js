/**
 * Created by penglijiao on 17/5/19.
 */

define(["angularAMD"], function (angularAMD) {
    'use strict';
    var routeManager = function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/main');

        $stateProvider
            // .state('main', angularAMD.route({
            //     url: '/main',
            //     controllerUrl: "js/controllers/mainCtrl.js",
            //     templateUrl: './views/mainTable.html',
            //     css: "css/myTable.css"
            // }))
            .state('main', angularAMD.route({
                url: '/main',
                controllerUrl: "js/controllers/addDataSourceCtrl.js",
                templateUrl: './views/addDataSource.html',
                css: "css/addDataSourceList.css"
            }))


            
            .state('home', angularAMD.route({
                url: '/home',
                cache: 'true',
                templateUrl: './views/home.html',
                controllerUrl: 'js/controllers/homeCtrl.js'
            }))
            .state('home.disease', angularAMD.route({
                url: '/disease',
                templateUrl: '../views/disease.html',
                controllerUrl: 'js/controllers/diseaseCtrl.js',
                css: "css/disease.css"

            }))
            .state('home.sports', angularAMD.route({
                url: '/sports',
                templateUrl: './views/sports.html',
                controllerUrl: 'js/controllers/sportsCtrl.js',
                css: "css/sports.css"
            }))
            .state('home.report', angularAMD.route({
                url: '/report',
                params: {
                    "id": ""
                },
                templateUrl: './views/report.html',
                controllerUrl: 'js/controllers/reportCtrl.js'
            }))
    }

    return routeManager;
});