(function(global, factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(global.angular);
    }

}(window, function(angular) {
    'use strict';

    var checkMandatory = function(prop, desc) {
        if (!prop) {
            throw new Error(desc);
        }
    };

    var defaults = function(dest, src) {
        for (var key in src) {
            if (typeof dest[key] === 'undefined') {
                // console.log(dest[key])
                dest[key] = src[key];
            }
        }
    };

    var baiduMapDir = function() {

        // Return configured, directive instance

        return {
            restrict: 'E',
            scope: {
                'options': '='
            },
            link: function($scope, element, attrs) {

                var defaultOpts = {
                    navCtrl: true,
                    scaleCtrl: true,
                    overviewCtrl: true,
                    enableScrollWheelZoom: true,
                    zoom: 10
                };

                var opts = $scope.options;

                defaults(opts, defaultOpts);

                checkMandatory(opts.center, 'options.center must be set');
                checkMandatory(opts.center.longitude, 'options.center.longitude must be set');
                checkMandatory(opts.center.latitude, 'options.center.latitude must be set');
                checkMandatory(opts.city, 'options.city must be set');

                // create map instance
                var map = new BMap.Map(element.find('div')[0]);

                // init map, set central location and zoom level
                map.centerAndZoom(new BMap.Point(opts.center.longitude, opts.center.latitude), opts.zoom);
                if (opts.navCtrl) {
                    // add navigation control
                    map.addControl(new BMap.NavigationControl());
                }
                if (opts.scaleCtrl) {
                    // add scale control
                    map.addControl(new BMap.ScaleControl());
                }
                if (opts.overviewCtrl) {
                    //add overview map control
                    map.addControl(new BMap.OverviewMapControl());
                }
                if (opts.enableScrollWheelZoom) {
                    //enable scroll wheel zoom
                    map.enableScrollWheelZoom();
                }
                // set the city name
                map.setCurrentCity(opts.city);


                if (!opts.markers) {
                    return;
                }
                //create markers

                var previousMarkers = [];

                var openInfoWindow = function(infoWin) {
                    return function() {
                        this.openInfoWindow(infoWin);
                    };
                };

                var mark = function() {

                    var i = 0;

                    for (i = 0; i < previousMarkers.length; i++) {
                        previousMarkers[i].removeEventListener('click', openInfoWindow(infoWindow2));
                        map.removeOverlay(previousMarkers[i]);
                    }
                    previousMarkers.length = 0;

                    for (i = 0; i < opts.markers.length; i++) {
                        var marker = opts.markers[i];
                        var pt = new BMap.Point(marker.longitude, marker.latitude);
                        var marker2;
                        if (marker.icon) {
                            var icon = new BMap.Icon(marker.icon, new BMap.Size(marker.width, marker.height));
                            marker2 = new BMap.Marker(pt, {
                                icon: icon
                            });
                        } else {
                            marker2 = new BMap.Marker(pt);
                        }

                        // add marker to the map
                        map.addOverlay(marker2);
                        previousMarkers.push(marker2);

                        if (!marker.title && !marker.content) {
                            return;
                        }
                        var infoWindow2 = new BMap.InfoWindow('<p>' + (marker.title ? marker.title : '') + '</p><p>' + (marker.content ? marker.content : '') + '</p>', {
                            enableMessage: !!marker.enableMessage
                        });
                        marker2.addEventListener('click', openInfoWindow(infoWindow2));
                    }
                };

                mark();

                $scope.$watch('options.center', function(newValue, oldValue) {

                    opts = $scope.options;
                    map.centerAndZoom(new BMap.Point(opts.center.longitude, opts.center.latitude), opts.zoom);
                    mark();

                }, true);

                $scope.$watch('options.markers', function(newValue, oldValue) {
                    mark();
                }, true);

            },
            template: '<div style="width: 100%; height: 100%;"></div>'
        };
    };

    var baiduMap = angular.module('baiduMap', []);
    baiduMap.directive('baiduMap', [baiduMapDir]);
}));