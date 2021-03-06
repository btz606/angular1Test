define(['angular', 'routeManager', 'laydate'],
    function (angular, RouteManager, laydate) {
        var myApp = angular.module('starter', ['ui.router', "door3.css"]);
        myApp.config(
                ['$controllerProvider', function ($controllerProvider) {
                    myApp.controller = $controllerProvider.register;
                }])
            .config(RouteManager)
            .run(['$rootScope', '$state', '$window', function ($rootScope, $state, $window) {
                $rootScope.go = function (path, param) {
                    $state.go(path, param);
                }

            }])
            .directive('defLaydate', function () {
                return {
                    require: '?ngModel',
                    restrict: 'A',
                    scope: {
                        ngModel: '='
                    },
                    link: function (laydate, scope, element, attr, ngModel) {
                        var _date = null,
                            _config = {};

                        // 初始化参数 
                        _config = {
                            elem: '#' + attr.id,
                            format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                            max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '',
                            min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
                            choose: function (data) {
                                scope.$apply(setViewValue);

                            },
                            clear: function () {
                                ngModel.$setViewValue(null);
                            }
                        };
                        // 初始化
                        _date = laydate(_config);



                        // 模型值同步到视图上
                        ngModel.$render = function () {
                            element.val(ngModel.$viewValue || '');
                        };

                        // 监听元素上的事件
                        element.on('blur keyup change', function () {
                            scope.$apply(setViewValue);
                        });

                        setViewValue();

                        // 更新模型上的视图值
                        function setViewValue() {
                            var val = element.val();
                            ngModel.$setViewValue(val);
                        }
                    }
                }
            })

            /* 遮罩层指令 */
            .directive('loading', function loading() {
                return {
                    restrict: 'E',
                    transclude: true,
                    template: '<div ng-show="loading" class="loading" id="allDiv"  style="position:fixed; top:0px; left:0px; width:100%; height:100%; display:none; background-color:#000; opacity: 0.5; z-index:99999;">' +
                        '<span style="vertical-align: middle;width:300px; height:100px; position: absolute; top:50%;font-size:30px;color：black; left:50%; margin-top: -50px; margin-left:-50px;">数据加载中</span></div>',
                    link: function (scope, element, attr) {
                        scope.$watch('loading', function (val) {
                            if (val) {
                                document.getElementById("allDiv").style.display = "block";
                            } else {
                                document.getElementById("allDiv").style.display = 'none';
                            }
                        });
                    }
                }
            })
            /* 滚动加载指令 判断是否执行加载函数 */
            .directive('whenScrolled', function () {
                return function (scope, elm, attr) {
                    // 内层DIV的滚动加载  
                    var raw = elm[0];
                    elm.bind('scroll', function () {
                        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                            scope.$apply(attr.whenScrolled);
                        }
                    });
                };
            })

            /* 页面展示格式化json */
            .directive('jsonShow', function () {
                return {
                    restrict: 'ECMA',
                    transclude: false,
                    template: '<pre></pre>',
                    scope: {
                        data: '='
                    },
                    link: function (scope, elm, attr) {
                        if (scope.data) {
                            elm.children().html(getJsonShow(scope.data));
                        }
                    }
                }

                function getJsonShow(json) {
                    if (typeof json != 'string') {
                        json = JSON.stringify(json, undefined, 2);
                    }
                    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            } else {
                                cls = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        } else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    });
                };
            })
            /* 弹出框服务 */
            .service('commonModal', function () {
                this.openMoadl = function (data) {
                    var modalInstance = $modal.open({
                        windowClass: '',
                        templateUrl: './views/common/modal.html',
                        controller: 'js/controllers/common/ModalInstanceCtrl',
                        resolve: {}
                    });
                    modalInstance.opened.then(function () { // 模态窗口打开之后执行的函数
                        console.log('modal is opened');
                    });
                    modalInstance.result.then(function (ret) { //模态窗口关闭之后回传参数
                        $modalInstance.close($scope.selected);
                        console.log(ret);
                    }, function (reason) {
                        console.log(reason);
                    });
                };
            });

        window.app = myApp;
        return myApp;
    });