// chart t1
const ctxT1 = document.getElementById('chartT1').getContext('2d');
const dataT1 = {
    labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ],
    datasets: [{
        label: 'Moyenne élève',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'Moyenne classe',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
};
const chartT1 = new Chart(ctxT1, {
    type: 'radar',
    data: dataT1,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Representation graphique des notes du 1er trimestre',
            },
            legend: {
                display: true,
                align: 'middle',
                labels: {
                    padding: 10
                }
            }
        }
    },
});
