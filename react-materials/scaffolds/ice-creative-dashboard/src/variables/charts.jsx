/* eslint no-shadow:0 */

// Function that converts a hex color number to a RGB color number
function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

const chartColor = '#FFFFFF';

// General configuration for the charts with Line gradientStroke
const gradientChartOptionsConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

const gradientChartOptionsConfigurationWithNumbersAndGrid = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        gridLines: {
          zeroLineColor: 'transparent',
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

//
const dashboardPanelChart = {
  data: (canvas) => {
    const ctx = canvas.getContext('2d');
    const chartColor = '#FFFFFF';
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);
    const gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.14)');

    return {
      labels: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ],
      datasets: [
        {
          label: 'Data',
          borderColor: chartColor,
          pointBorderColor: chartColor,
          pointBackgroundColor: '#2c2c2c',
          pointHoverBackgroundColor: '#2c2c2c',
          pointHoverBorderColor: chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
        },
      ],
    };
  },
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#fff',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
    },
    legend: {
      position: 'bottom',
      fillStyle: '#FFF',
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'rgba(255,255,255,0.4)',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: 'rgba(255,255,255,0.1)',
            zeroLineColor: 'transparent',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            color: 'rgba(255,255,255,0.1)',
          },
          ticks: {
            padding: 10,
            fontColor: 'rgba(255,255,255,0.4)',
            fontStyle: 'bold',
          },
        },
      ],
    },
  },
};

// Dashboard view - Shipped Products - Card

const dashboardShippedProductsChart = {
  data: (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');
    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Active Users',
          borderColor: '#f96332',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#f96332',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630],
        },
      ],
    };
  },
  options: gradientChartOptionsConfiguration,
};

// ##############################
// // // Dashboard view - All Products - Card
// #############################

const dashboardAllProductsChart = {
  data: (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#18ce0f');
    gradientStroke.addColorStop(1, chartColor);
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));
    return {
      labels: ['12pm,', '3pm', '6pm', '9pm', '12am', '3am', '6am', '9am'],
      datasets: [
        {
          label: 'Email Stats',
          borderColor: '#18ce0f',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#18ce0f',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [40, 500, 650, 700, 1200, 1250, 1300, 1900],
        },
      ],
    };
  },
  options: gradientChartOptionsConfigurationWithNumbersAndGrid,
};

// ##############################
// // // Dashboard view - Bar Chart - Card
// #############################

const dashboard24HoursPerformanceChart = {
  data: (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Active Countries',
          backgroundColor: gradientFill,
          borderColor: '#2CA8FF',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#2CA8FF',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
    responsive: 1,
    scales: {
      yAxes: [
        {
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          display: 0,
          ticks: {
            display: false,
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  },
};

module.exports = {
  dashboardPanelChart, // Chart for Dashboard view - Will be rendered in panel
  dashboardShippedProductsChart, // Chart for Dashboard view - Shipped Products Card
  dashboardAllProductsChart, // Chart for Dashboard view - All products Card
  dashboard24HoursPerformanceChart, // Chart for Dashboard view - 24 Hours Performance Card
};
