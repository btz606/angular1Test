define(["echart"], function (echart) {
    function homeCtrl($rootScope, $scope) {

        var sendData = [{
            "id": "289732258753679664",
            "parentId": "289732258753679661",
            "parentName": "文件上传",
            "typeName": "Excel",
            "typeOrder": 0,
            "typeImageUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/BigExcel.png",
            "typeThumbnailUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/Excel.png"
        }, {
            "id": "289732258753679665",
            "parentId": "289732258753679662",
            "parentName": "数据库",
            "typeName": "mySql",
            "typeOrder": 1,
            "typeImageUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/BigMySql.png",
            "typeThumbnailUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/Mysql.png"
        }, {
            "id": "289732258753679666",
            "parentId": "289732258753679662",
            "parentName": "数据库",
            "typeName": "sqlServer",
            "typeOrder": 2,
            "typeImageUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/BigSqlServer.png",
            "typeThumbnailUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/SqlServer.png"
        }, {
            "id": "289732258753679667",
            "parentId": "289732258753679662",
            "parentName": "数据库",
            "typeName": "oracle",
            "typeOrder": 3,
            "typeImageUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/BigOracle.png",
            "typeThumbnailUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/Oracle.png"
        }, {
            "id": "289732258753679668",
            "parentId": "289732258753679663",
            "parentName": "ETL",
            "typeName": "ETL",
            "typeOrder": 4,
            "typeImageUrl": "/AppPlus/LZDataPlatform/pc/DataSource/Image/Default/ETL.png",
            "typeThumbnailUrl": ""
        }]

        var tabContent = [{
            "id": "289732258753679660",
            "parentId": "0",
            "parentName": "",
            "typeName": "全部",
            "typeOrder": 0,
            "typeImageUrl": "",
            "typeThumbnailUrl": null
        }, {
            "id": "289732258753679661",
            "parentId": "0",
            "parentName": "",
            "typeName": "文件上传",
            "typeOrder": 1,
            "typeImageUrl": "",
            "typeThumbnailUrl": null
        }, {
            "id": "289732258753679662",
            "parentId": "0",
            "parentName": "",
            "typeName": "数据库",
            "typeOrder": 2,
            "typeImageUrl": "",
            "typeThumbnailUrl": null
        }, {
            "id": "289732258753679663",
            "parentId": "0",
            "parentName": "",
            "typeName": "ETL",
            "typeOrder": 3,
            "typeImageUrl": "",
            "typeThumbnailUrl": null
        }]

        $scope.sendData = angular.copy(sendData);
        $scope.tabContent = angular.copy(tabContent);

        /*
        与页面绑定的相关参数
        */
        $scope.config = {
            advanceSearch: '',  //搜索过滤的绑定数据
            textShow: "输入搜索内容",   //提示信息
            tabChosen: "",  // 当前选择的页签
            clickChose: function (data) { // 页签选择的函数
                $scope.config.tabChosen = data.typeName;
                $scope.getTabContent();
            }
        };

        /*
        根据过滤条件以及页签选择改变页面绑定的选项
        */
        $scope.getTabContent = function () {
            var arrShow = [];
            $scope.sendData = angular.copy(sendData);
            if ($scope.config.advanceSearch == '') {
                for (var i = 0; i < $scope.sendData.length; i++) {
                    if ($scope.config.tabChosen == "全部") {
                        arrShow.push($scope.sendData[i]);
                    } else {
                        if ($scope.sendData[i].parentName == $scope.config.tabChosen) {
                            arrShow.push($scope.sendData[i]);
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.sendData.length; i++) {

                    if ($scope.config.tabChosen == "全部") {
                        if ($scope.sendData[i].typeName.search($scope.config.advanceSearch) !== -1) {
                            arrShow.push($scope.sendData[i]);
                        }
                    } else {
                        if ($scope.sendData[i].parentName == $scope.config.tabChosen && $scope.sendData[i].typeName.search($scope.config.advanceSearch) !== -1) {
                            arrShow.push($scope.sendData[i]);
                        }
                    }
                }
            }

            $scope.sendData = arrShow;
        }

    }

    return homeCtrl;
});