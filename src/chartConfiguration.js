export const options = {
  responsive: true,
  legend: {
    labels: {
      labelString: 'adjskfhasdjhfsd'
    }
  },
  title: {
    display: true,
    text: 'Closing Stock Prices' ,
    fontSize: 24,
    fontFamily: 'Arial',
    fontStyle: 'bold'
  },
  tooltips: {
    mode: 'label'
  },
  hover: {
    mode: 'dataset'
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        labels: 'afdsdf'
      },
      {
        display: true,
        labelString: 'asdfdfsdf',
        scaleLabel: {
          show: true,
        } ,
        ticks: {
            min: new Date(1472616000000).toLocaleString(),
            max: new Date(1502616000000).toLocaleString()
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          show: true
        }
      }
    ]
  }
}
