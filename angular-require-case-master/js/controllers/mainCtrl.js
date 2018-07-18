define([], function () {
    function homeCtrl($rootScope, $scope) {
        $scope.name = "欢迎使用健康评估服务终端系统";
        $("#login").click(function () {
            $rootScope.go("home")
        })

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

        // 过滤条件选择
        $scope.seleByStatusOption = {
            selectId: "",
            options: [{
                    name: "全部状态",
                    id: ""
                }, {
                    name: "已完成",
                    id: "done"
                },
                {
                    name: "同步中",
                    id: "progress"
                },
                {
                    name: "未同步",
                    id: "todo"
                },
                {
                    name: "同步失败",
                    id: "fail"
                }
            ],
            change: function (data) {
                // alert("发往后台" + data);
                $scope.loading = !$scope.loading;
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
            Name: "dasdasdsadasdasdsa",
            Country: "USAUSAUSAUSAUSAUSAUSAUSAUSA",
            width: "20%",
            status: "progress"
        }, {
            Name: "bbb",
            Country: "China",
            width: "20%",
            status: "todo"
        }, {
            Name: "ccc",
            Country: "Cananda",
            width: "20%",
            status: "done"
        }, {
            Name: "ddd",
            Country: "Jap",
            width: "20%",
            status: "fail"
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
            name: "强制结束",
            width: "10%",
            sort: "asc",
            show: true
        }, {
            name: "重启",
            width: "10%",
            sort: "asc",
            show: true
        }]

        /* 页面绑定的表格数据 */
        $scope.tableData = [];

        // 初始化页面，获取后台数据
        $scope.init = function () {
            // $http({
            //     method: 'GET',
            //     url: '/someUrl'
            // }).then(function successCallback(response) {
            //     // 请求成功执行代码
            // }, function errorCallback(response) {
            //     // 请求失败执行代码
            // });
            $scope.doData(houtai);
        };

        // 对数据做处理点击事件，按钮禁用状态，任务执行状态
        $scope.doData = function (houtai) {
            var index;
            for (var i = 0; i < 50; i++) {
                index = _.random(0, 3);
                $scope.tableData.push(houtai[index]);
            }
            $scope.paginationConf.totalItems = $scope.tableData.length;
            console.log($scope.tableData.length);
            $scope.paginationConf.totalItems = _.random(100, 10000);
            $scope.paginationConf.currentPage = 1;
            _.each($scope.tableData, function (item) {
                item.timeDetail = function (row) {
                    commonModal.openMoadl(row.data + "定时同步详情");
                };
                item.forceEnd = function (row) {
                    // post请求
                    commonModal.openMoadl(row.data + "强制结束");
                }
            })
        };

        $scope.init();

    }

    return homeCtrl;
});