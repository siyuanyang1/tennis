const scroller = scrollama();

// Handle the entering of a step
function handleStepEnter(response) {
    const step = response.element;
    step.classList.add('is-active');

    // Draw the appropriate chart based on the step index
    if (response.index === 1) {
        drawPayGapChart();
    } else if (response.index === 3) {
        drawMediaCoverageChart();
    } else if (response.index === 4) {
        drawLineChart();
    } else if (response.index === 5) {
        drawDonutChart();
    }
}

// Handle the exiting of a step
function handleStepExit(response) {
    const step = response.element;
    step.classList.remove('is-active');
}

// Initialize the scroller and set up the event listeners
function init() {
    scroller
        .setup({
            step: ".step",
            offset: 0.25,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    window.addEventListener("resize", scroller.resize);
}

// Call the init function to start the scroller
init();

// Function to draw the pay gap chart
function drawPayGapChart() {
    const chart = c3.generate({
        bindto: '#pay-gap-chart',
        data: {
            columns: [
                ['Earnings', 9000000, 12000000, 10000000]
            ],
            types: {
                Earnings: 'bar'
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ['Iga Swiatek', 'Novak Djokovic', 'Carlos Alcaraz']
            },
            y: {
                label: {
                    text: 'Earnings (USD)',
                    position: 'outer-middle'
                }
            }
        },
        tooltip: {
            format: {
                title: function (d) { return 'Player ' + d; },
                value: function (value, ratio, id) {
                    var format = d3.format('$');
                    return format(value);
                }
            }
        }
    });
}

// Function to draw the media coverage chart
function drawMediaCoverageChart() {
    const chart = c3.generate({
        bindto: '#media-coverage-chart',
        data: {
            columns: [
                ['Articles', 100, 80, 90, 85]
            ],
            types: {
                Articles: 'bar'
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ['US Open - Men', 'US Open - Women', 'Wimbledon - Men', 'Wimbledon - Women']
            },
            y: {
                label: {
                    text: 'Number of Articles',
                    position: 'outer-middle'
                }
            }
        },
        tooltip: {
            format: {
                title: function (d) { return 'Event ' + d; },
                value: function (value, ratio, id) {
                    return value + ' articles';
                }
            }
        }
    });
}

// Function to draw the line chart for viewership trends
function drawLineChart() {
    const chart = c3.generate({
        bindto: '#line-chart',
        data: {
            columns: [
                ['Male Players', 30, 200, 100, 400, 150, 250],
                ['Female Players', 50, 20, 10, 40, 15, 25]
            ],
            types: {
                'Male Players': 'line',
                'Female Players': 'line'
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ['2018', '2019', '2020', '2021', '2022', '2023']
            },
            y: {
                label: {
                    text: 'Viewership',
                    position: 'outer-middle'
                }
            }
        }
    });
}

// Function to draw the donut chart for media coverage breakdown
function drawDonutChart() {
    const chart = c3.generate({
        bindto: '#donut-chart',
        data: {
            columns: [
                ['Men', 70],
                ['Women', 30]
            ],
            type: 'donut'
        },
        donut: {
            title: 'Media Coverage'
        }
    });
}