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
        }];

        // 过滤条件选择
        $scope.seleByStatusOption = {
            selectId: 1,
            options: [{
                    name: "包含下列选项",
                    id: 1
                }, {
                    name: "不包含下列选项",
                    id: 2
                }
            ],
            change: function (data) {
                console.log(data);
                $scope.sendData.condition.state = data;
                $scope.init();
                // $scope.loading = !$scope.loading;
            }
        };

        $scope.person = {
            sex: "male"
        }

        $scope.addStrOpts = function (item, $event) {
            for (var i = 0; i < $scope.ulList.length; i++) {
                if ($scope.ulList[i].name == item.name) {
                    // $scope.ulList.splice(i, 1);
                    $scope.rightList.push(item);
                    console.log($scope.rightList);
                }
            }
        }

        $scope.removeStrOpts = function (item, $event) {
            for (var i = 0; i < $scope.rightList.length; i++) {
                if ($scope.rightList[i].name == item.name) {
                    $scope.rightList.splice(i, 1);
                    $scope.ulList.push(item);
                    console.log($scope.ulList);
                }
            }
        }

        $scope.addAll = function () {
            $scope.rightList = [];
            $scope.rightList = angular.copy($scope.ulList);
        }

        $scope.removeAll = function () {
            $scope.rightList = [];
        }

        $scope.ulList = [{
            name: 1
        }, {
            name: 2
        }, {
            name: 3
        }, {
            name: 4
        }, {
            name: 5
        }, {
            name: 6
        }, {
            name: 7
        }, {
            name: 8
        }];
        $scope.rightList = []

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
        }];

        /*
        与页面绑定的相关参数
        */
        $scope.config = {
            advanceSearch: '', // 搜索过滤的绑定数据
            textShow: "输入搜索内容", // 提示信息
            tabChosen: "", // 当前选择的页签
            clickChose: function (data) { // 页签选择的函数
                $scope.config.tabChosen = data.typeName;
                $scope.getTabContent();
            }
        };

        $scope.sendData = angular.copy(sendData);
        $scope.tabContent = angular.copy(tabContent);

        /*
        页面初始化函数
        获取后台数据以及页签选择的状态
        */
        $scope.init = function () {
            // 给$scope.config.tabChosen给定数值

            // 执行函数,用于初始化选择的页签，获取localStroage中的也签选择
            $scope.getTabContent();

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
        };

        $scope.init();

    }

    return homeCtrl;
});