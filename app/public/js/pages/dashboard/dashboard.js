//-------------------------------------------------------------------------
// Document Ready Section:
//-------------------------------------------------------------------------
$(function () {

    //---------------------------------------------------------------------
    // Material Design
    //---------------------------------------------------------------------
    $.material.init();

    //---------------------------------------------------------------------
    // Animate CSS
    //---------------------------------------------------------------------
    $.fn.extend({
        animateCss: function (animationName, cb) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (cb) { cb(); }
            });
        }
    });

    //---------------------------------------------------------------------
    // Chartist
    //---------------------------------------------------------------------
    function createCharts() {
        var data1 = {

            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            series  : [
                [5, 2, 4, 2, 0]
            ]
        };

        var data2 = {
            series: [{
                value: 20,
                name: 'Series 1',
                meta: 'Meta One'
            }, {
                value: 10,
                name: 'Series 2',
                meta: 'Meta Two'
            }, {
                value: 70,
                name: 'Series 3',
                meta: 'Meta Three'
            }]
        };

        var data3 = {
            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            series  : [2, 1, 3, 6, 1]
        };

        var options1 = {
            width: 300,
            height: 200
        };


        var options2 = {
            // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
            width: undefined,
            // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
            height: undefined,
            // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
            chartPadding: 5,
            // Override the class names that are used to generate the SVG structure of the chart
            classNames: {
                chartPie: 'ct-chart-pie',
                chartDonut: 'ct-chart-donut',
                series: 'ct-series',
                slicePie: 'ct-slice-pie',
                sliceDonut: 'ct-slice-donut',
                label: 'ct-label'
            },
            // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
            startAngle: 0,
            // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
            total: undefined,
            // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
            donut: false,
            // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
            // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
            donutWidth: 60,
            // If a label should be shown or not
            showLabel: true,
            // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
            labelOffset: 0,
            // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
            labelPosition: 'inside',
            // An interpolation function for the label value
            labelInterpolationFnc: Chartist.noop,
            // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
            labelDirection: 'neutral',
            // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            reverseData: false,
            // If true empty values will be ignored to avoid drawing unncessary slices and labels
            ignoreEmptyValues: false
        };

        var options3 = {
            donut: true
        };


        //-----------------------------------------------------------------
        // Chart 1
        //-----------------------------------------------------------------
        var chart = new Chartist.Line('#ct-chart1', {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            series: [
                [1, 5, 2, 5, 4, 3],
                [2, 3, 4, 8, 1, 2],
                [5, 4, 3, 2, 1, 0.5]
            ]
            }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
            });

            chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                }
                });
            }
        });

        //-----------------------------------------------------------------
        // Chart 2
        //-----------------------------------------------------------------
        new Chartist.Bar('#ct-chart2', {
                labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                series: [20, 60, 120, 200, 180, 20, 10]
                }, {
                distributeSeries: true
            });

        //-----------------------------------------------------------------
        // Chart 3
        //-----------------------------------------------------------------
        var chart = new Chartist.Pie('#ct-chart3', {
            series: [10, 20, 50, 20, 5, 50, 15],
            labels: [1, 2, 3, 4, 5, 6, 7]
            }, {
            donut: true,
            showLabel: false
            });

            chart.on('draw', function(data) {
            if(data.type === 'slice') {
                // Get the total path length in order to use for dash array animation
                var pathLength = data.element._node.getTotalLength();

                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                });

                // Create animation definition while also assigning an ID to the animation for later sync usage
                var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1000,
                    from: -pathLength + 'px',
                    to:  '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                    fill: 'freeze'
                }
                };

                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                if(data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                }

                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
                });

                // We can't use guided mode as the animations need to rely on setting begin manually
                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                data.element.animate(animationDefinition, false);
            }
            });

            // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
            chart.on('created', function() {
            if(window.__anim21278907124) {
                clearTimeout(window.__anim21278907124);
                window.__anim21278907124 = null;
            }
            window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
            });


        //-----------------------------------------------------------------
        // Chart 4
        //-----------------------------------------------------------------
        new Chartist.Line('#ct-chart4', data1);


        //-----------------------------------------------------------------
        // Chart 5
        //-----------------------------------------------------------------
        new Chartist.Bar('#ct-chart5', {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [
                [800000, 1200000, 1400000, 1300000],
                [200000, 400000, 500000, 300000],
                [100000, 200000, 400000, 600000]
            ]
            }, {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                return (value / 1000) + 'k';
                }
            }
            }).on('draw', function(data) {
            if(data.type === 'bar') {
                data.element.attr({
                style: 'stroke-width: 30px'
                });
            }
        });


        //-----------------------------------------------------------------
        // Chart 6
        //-----------------------------------------------------------------
        new Chartist.Pie('#ct-chart6', data2, options2);

    }

    //---------------------------------------------------------------------
    // Startup
    //---------------------------------------------------------------------
    $("#jumbo").animateCss('fadeInUpBig', createCharts);

});

