let plot = (data) => {
  const ctx = document.getElementById('myChart');
  const dataset = {
    labels: data.hourly.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]

};
  const config = {
    type: 'line',
    data: dataset,
  };

  const chart = new Chart(ctx, config)

  /* Plot 2 UV Index */
  /* const labels = Utils.months({count: 7});
  const data2 = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config2 = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const chart2 = new Chart(data2, config2) */
  
}

let load = (data) => {
  console.log(data);      
  document.getElementById("timezone").innerHTML=data["timezone"]
  document.getElementById("GMT").innerHTML=data["timezone_abbreviation"]
  document.getElementById("tunit").innerHTML=data["hourly_units"]["temperature_2m"]
  plot(data)
}

let loadInocar = () => {
  let URL = "https://cors-anywhere.herokuapp.com/" + "https://www.inocar.mil.ec/mareas/consultan.php"
  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");

      let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
      let contenedorHTML = document.getElementById('table-container');
      contenedorHTML.innerHTML = contenedorMareas.innerHTML;
      console.log(xml)
    })
    .catch(console.error);
}

(
  function () { 
    let meteo = localStorage.getItem('meteo');
    
    if(meteo == null) { 
      
    let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=uv_index_max&start_date=2023-06-14&end_date=2023-06-21&timezone=auto";
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        load(data)
        /* GUARDAR DATA EN MEMORIA */
        localStorage.setItem("meteo", JSON.stringify(data))

      })
      .catch(console.error); 
    }else{
      /* CARGAR DATA DESDE LA MEMORIA */
      load(JSON.parse(meteo))
    } 
    
    loadInocar();
  }
)()