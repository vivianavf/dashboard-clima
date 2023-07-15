let plot = (data) => { 

  /* SOLO HORAS LABELS */ 
  etiquetas = []
  data.hourly.time.forEach((element, index) => {
    element = element.split("T")
    etiquetas.push(element[1])
  })

  const ctx = document.getElementById('myChart');
  const dataset = {
    labels: etiquetas, /* ETIQUETA DE DATOS */
    datasets: [{
        label: "Temperatura en °C", /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: true,
        lineTension: 0.5,
        borderColor: 'rgb(78, 148, 229)',
        borderWidth: 1,
        backgroundColor: 'rgb(78, 148, 229, .4)',        
    }]
  };

  const config = {
    type: 'line',
    data: dataset,
    options: {
      scales: {
        xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
        }],
        yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0.06)"
            }   
        }]
    }
    }
  };

  const chart = new Chart(ctx, config)

}

let load = (data) => {
  console.log(data);
  plot(data);
}

(function () {
  let meteo = localStorage.getItem('meteo');
  if(meteo == null) {
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,rain,surface_pressure,windspeed_10m&daily=uv_index_max&timezone=auto&start_date=2023-07-25&end_date=2023-07-25';
        
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        load(data)
        /* GUARDAR DATA EN LA MEMORIA */
        localStorage.setItem("meteo", JSON.stringify(data))
    })
    .catch(console.error);

  } else {
      /* CARGAR DATA DESDE LA MEMORIA */
      load(JSON.parse(meteo))
  }
})();
