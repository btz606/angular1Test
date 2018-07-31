define([], function () {
    function homeCtrl($rootScope, $scope, commonModal, $http) {

        $scope.loading = false;

        var pageConfigDefault = {
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 20,
            pagesLength: 20,
            perPageOptions: [10, 20, 30, 40, 50],
            rememberPerPage: 'perPageItems',
            onChange: function (item) {
                console.log(item);
            }
        };

        $scope.startTime = '';

        $scope.sendData = {
            condition: {
                dataIndex: 0,
                condition: {
                    'state': 3
                    // 表示全部的数据
                }
            }
        };

        // 过滤条件选择
        $scope.seleByStatusOption = {
            selectId: 3,
            options: [{
                    name: "全部状态",
                    id: 3
                }, {
                    name: "同步完成",
                    id: 2
                },
                {
                    name: "正在同步",
                    id: 1
                },
                {
                    name: "队列中",
                    id: 0
                }
            ],
            change: function (data) {
                console.log(data);
                $scope.sendData.condition.state = data;
                $scope.init();
                // $scope.loading = !$scope.loading;
            }
        };

        // 分页页码设置
        $scope.selecrOption = {
            selectData: 20,
            selectId: "20",
            options: [{
                    //必须写ID  
                    name: "每页20条",
                    id: "20"
                },
                {
                    name: "每页50条",
                    id: "50"
                },
                {
                    name: "每页100条",
                    id: "100"
                }
            ],
            change: function (data) {
                // 切换每页条数时将分页恢复默认状态
                // $scope.paginationConf ={};
                // $scope.paginationConf = angular.copy(pageConfigDefault);

                // $scope.paginationConf.totalItems = 0;
                // $scope.paginationConf.pagesLength = 20;
                // $scope.paginationConf.currentPage = 1;
                // $scope.apply();
                // 清空数据
                $scope.tableData = [];
                $scope.init();
                // alert(data);
            }
        };

        var houtai = [{
            "id": "12456",
            "jobName": "282330643629604864",
            "organizationId": "LZDatePlatform_15215138234_53305584107157536",
            "jobDescription": "10w+10w",
            "jobDetail": '{"name":"Mike","sex":"女","age":"29"}',
            "jobMessage": {
                "tableIdList": [
                    "277956925667147776"
                ]
            },
            "state": 0,
            "starter": "局座",
            "timeSync": 0,
            "jobClass": "com.leading.dataplatform.job.unionTable.UnionTableJob",
            "syncTimeList": [{
                    "hours": 8,
                    "minutes": 40
                },
                {
                    "hours": 8,
                    "minutes": 41
                }
            ],
            "beginTime": "2012.2.12",
            "startTime": "2012.2.12",
            "duration": "3min"

        }, {
            "id": "89856",
            "jobName": "282330644321341231",
            "organizationId": "LZDatePlatform_15215138234_53305584107157536",
            "jobDescription": "10w+10w",
            "jobDetail": '{"name":"Mike","sex":"女","age":"29"}',
            "jobMessage": {
                "tableIdList": [
                    "277956925667147776"
                ]
            },
            "state": 1,
            "starter": "船长",
            "timeSync": 0,
            "jobClass": "com.leading.dataplatform.job.unionTable.UnionTableJob",
            "syncTimeList": [{
                    "hours": 8,
                    "minutes": 40
                },
                {
                    "hours": 8,
                    "minutes": 41
                }
            ],
            "beginTime": "2019.2.12", //任务开始执行时间
            "startTime": "3212.2.12",
            "duration": "877min"
        }, {
            "id": "78552",
            "jobName": "44444444444444444",
            "organizationId": "LZDatePlatform_15215138234_53305584107157536",
            "jobDescription": "1w+999w",
            "jobDetail": '{"a": 1, "b": "string", "c": [1, "11"]}',
            "jobMessage": {
                "tableIdList": [
                    "277956925667147776"
                ]
            },
            "state": 2,
            "status": 'done',
            "starter": "猴哥",
            "timeSync": 0,
            "jobClass": "com.leading.dataplatform.job.unionTable.UnionTableJob",
            "syncTimeList": [{
                    "hours": 8,
                    "minutes": 40
                },
                {
                    "hours": 8,
                    "minutes": 41
                }
            ],
            "beginTime": "5623.2.12",
            "startTime": "4512.2.12",
            "duration": "5min"
        }, {
            "id": "34123412",
            "jobName": "777777777777777777",
            "organizationId": "LZDatePlatform_15215138234_53305584107157536",
            "jobDescription": "17w+10w",
            "jobDetail": '[{"CityId":18,"CityName":"西安","ProvinceId":27,"CityOrder":1},{"CityId":53,"CityName":"广州","ProvinceId":27,"CityOrder":1}]',
            "jobMessage": {
                "tableIdList": [
                    "277956925667147776"
                ]
            },
            "state": 2,
            "starter": "厨子",
            "timeSync": 0,
            "jobClass": "com.leading.dataplatform.job.unionTable.UnionTableJob",
            "syncTimeList": [{
                    "hours": 8,
                    "minutes": 40
                },
                {
                    "hours": 8,
                    "minutes": 41
                }
            ],
            "beginTime": "2587.2.12",
            "startTime": "3652.2.12",
            "duration": "9min"
        }];

        /*分页配置信息,使用插件tm.pagination.js
         *currentPage当前页;totalItems总数；itemsPerPage每页数量;perPageOptions每页选项;pagesLength下拉框中的条数
         *onChange点击之后的触发事件
         */
        $scope.paginationConf = angular.copy(pageConfigDefault);


        /*表头信息
         *分别为id,任务名，状态，排队数，组织机构，开始时间，执行总时长，人物来源，定时同步详情，执行参数，强制结束，重启
         *sort排序的升降序，orderBy排序依据，show是否隐藏，width宽度
         */
        $scope.columns = [{
            name: "序号",
            width: "5%",
            sort: "asc",
            show: true
        }, {
            name: "id",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "任务来源",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "任务名称",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "状态",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "组织机构/用户",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "任务触发时间",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "任务开始时间",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "执行总时长",
            width: "20%",
            sort: "asc",
            show: true
        }, {
            name: "执行参数",
            width: "13%",
            sort: "asc",
            show: true
        }, {
            name: "暂停",
            width: "10%",
            sort: "asc",
            show: true
        }, {
            name: "重启",
            width: "10%",
            sort: "asc",
            show: true
        }, {
            name: "删除",
            width: "10%",
            sort: "asc",
            show: true
        }]

        /* 页面绑定的表格数据 */
        $scope.tableData = [];

        // 初始化页面，获取后台数据
        $scope.init = function () {
            $http({
                method: 'POST',
                url: '/getRecords',
                data: $scope.sendData
            }).then(function successCallback(response) {
                console.log(response);
                $scope.doData();
                // 请求成功执行代码
            }, function errorCallback(response) {
                console.log("获取请求数据失败");
                // 请求失败执行代码
            });
            $scope.doData(houtai);
        };

        // 对数据做处理点击事件，按钮禁用状态，任务执行状态
        $scope.doData = function (houtai) {
            var index;

            ////后期删除，临时模拟用
            // 将得到的数据加在$scope.tableData后面
            for (var i = 0; i < 40; i++) {
                index = _.random(0, 3);
                $scope.tableData.push(houtai[index]);
            }
            ////后期删除，临时模拟用


            $scope.paginationConf.totalItems = $scope.tableData.length;
            $scope.paginationConf.currentPage = 1;
            // 维护此数据，用于滚动加载
            $scope.sendData.condition.dataIndex = $scope.paginationConf.totalItems + $scope.sendData.condition.dataIndex;
            _.each($scope.tableData, function (item) {
                item.jsonShow = JSON.stringify(JSON.parse(item.jobDetail), null, 2);
                item.stateShow = item.state == 0 ? "队列中" : (item.state == 1 ? "正在同步" : "同步完成")
                // item.timeDetail = function (row) {
                // // commonModal.openMoadl(row.data + "定时同步详情");
                // var modalInstance = $modal.open({
                //     windowClass: '',
                //     templateUrl: './views/common/modal.html',
                //     controller: 'js/controllers/common/ModalInstanceCtrl',
                //     resolve: {}
                // });
                // modalInstance.opened.then(function () { // 模态窗口打开之后执行的函数
                //     console.log('modal is opened');
                // });
                // modalInstance.result.then(function (ret) { //模态窗口关闭之后回传参数
                //     $modalInstance.close($scope.selected);
                //     console.log(ret);
                // }, function (reason) {
                //     console.log(reason);
                // });
                // };
                item.forceEnd = function (row) {
                    // post请求
                    commonModal.openMoadl(row.data + "暂停");
                }
            })

            // $scope.apply();
        };

        $scope.loadMore = function () {
            // 后期删除
            $scope.init();
            // 此时发送$scope.sendData.condition.dataIndex
            for (var i = 0; i < 10; i++) {
                index = _.random(0, 3);
                $scope.tableData.push(houtai[index]);
            }
            // 为新加入的数据加上数据处理，事件绑定

            // if ($scope.currentPage < $scope.totalPages) {
            //     $scope.currentPage++;
            //     if ($scope.busy) {
            //         return false;
            //     }
            //     $scope.busy = true;
            //     // 请求后台服务器  
            //     $http.get('http://127.0.0.1/Test/scroll/Test.php?page=' + $scope.currentPage)
            //         .success(function (data) {
            //             $scope.busy = false;
            //             //组织数据  
            //             for (var i in data.data) {
            //                 $scope.items.push(data.data[i]);
            //             }
            //             $scope.totalPages = data.countPage;
            //         });
            // }
        }

        $scope.init();

    }

    return homeCtrl;
});