/******* Table1*********/

// Select the first data table
const table1 = document.querySelector("#table1");

// Create a canvas element for the graph
const canvas1 = document.createElement("canvas");
canvas1.width = 3000;
canvas1.height = 3000;

// Insert the canvas element before the table
table1.parentNode.insertBefore(canvas1, table1);

// Initialize arrays to store data
let countries = [];
let years = Array.from(table1.rows[1].cells)
  .slice(2)
  .map((cell) => cell.textContent.trim());
let da = [];

// Iterate through table rows (skipping the first row with headers)
for (let i = 1; i < table1.rows.length; i++) {
  let cells = table1.rows[i].cells;
  countries.push(cells[1].textContent); // Country names

  // Extract data for each year
  var rowData = [];
  for (var j = 2; j < cells.length; j++) {
    rowData.push(parseFloat(cells[j].textContent.replace(",", "."))); // Convert string to float
  }
  da.push(rowData);
}

// Use Chart.js library to create bar chart
let ctx = canvas1.getContext("2d");

// Create the chart
new Chart(ctx, {
  type: "bar",
  data: {
    labels: years, // X-axis labels (years)
    datasets: countries.map(function (country, index) {
      return {
        label: country,
        data: da[index], // Y-axis data for each country

        borderColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",1)", // Border color
        borderWidth: 5,
      };
    }),
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/***** TABLE 2 *******/

const table2 = document.querySelector("#table2");

// Create a canvas element for the graph
const canvas = document.createElement("canvas");
canvas.width = 3000;
canvas.height = 2000;

// Insert the canvas element before the table
table2.parentNode.insertBefore(canvas, table2);

const table = document.getElementById("table2");
const rows = table.getElementsByTagName("tr");
const data2 = [];

for (let i = 1; i < rows.length; i++) {
  const cell = rows[i].getElementsByTagName("td");
  const country = cell[0].textContent;
  const value2007_09 = parseInt(cell[1].textContent);
  const value2010_12 = parseInt(cell[2].textContent);

  data2.push({
    country: country,
    value2007_09: value2007_09,
    value2010_12: value2010_12,
  });
}

// Organiser les données dans des tableaux séparés pour Chart.js
const countries2 = data2.map((item) => item.country);
const values2007_09 = data2.map((item) => item.value2007_09);
const values2010_12 = data2.map((item) => item.value2010_12);

// Créer un contexte pour le graphique
const ctx2 = canvas.getContext("2d");

// Créer le graphique en utilisant Chart.js
new Chart(ctx2, {
  type: "line",
  data: {
    labels: countries2,
    datasets: [
      {
        label: "2007-09",
        data: values2007_09,
        backgroundColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",0.2)",
        borderColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",1)", // Border color
        borderWidth: 5,
      },
      {
        label: "2010-12",
        data: values2010_12,
        backgroundColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",0.2)",
        borderColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",1)", // Border color
        borderWidth: 5,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/**** Graphe Interactif ******/

const heading = document.querySelector("#firstHeading");

// Create a canvas element for the graph
const canvas3 = document.createElement("canvas");
canvas3.width = 500;
canvas3.height = 500;

// Insert the canvas element before the table
heading.parentNode.insertBefore(canvas3, heading);

// Initialize Chart instance
const ctx3 = canvas3.getContext("2d");
const myChart = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Data",
        data: [],

        backgroundColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",0.2)",
        borderColor:
          "rgba(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ",1)", // Border color
        borderWidth: 5,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  },
});

// Step 3: Retrieve the data from the URL using fetch
function getData() {
  const cachebuster = new Date().getTime();
  const dataUrl = `https://canvasjs.com/services/data/datapoints.php?cb=${cachebuster}`;
  // Fetch data from the URL using AJAX

  fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      // Step 4: Parse the data and update the chart data
      const parsedData = parseData(data);
      updateChartData(myChart, parsedData);
    })
    .catch((error) => console.error(error));
}

function parseData(data) {
  const parsedData = {
    labels: [],
    data: [],
  };

  data.forEach(function (point) {
    parsedData.labels.push(point[0]);
    parsedData.data.push(point[1]);
  });

  return parsedData;
}

function updateChartData(chart, data) {
  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.data;
  chart.update(); // Update the chart to reflect the new data
}

// Step 6: Use setInterval to refresh the data and update the chart every second
setInterval(() => {
  getData();
}, 1000);
