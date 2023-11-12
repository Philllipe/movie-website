import "../styles.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Person() {
  const [searchParams] = useSearchParams();
  const ID = searchParams.get("id");
  const navigate = useNavigate();
  const [person, setPerson] = useState({});
  const [rowData, setRowData] = useState([]);
  const [graphhData, setGraphData] = useState([]);
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const columns = [
    {
      headerName: "Movie",
      field: "movieName",
      supressMoveable: true,
    },
    {
      headerName: "Role",
      field: "category",
      supressMoveable: true,
    },
    {
      headerName: "Characters",
      field: "characters",
      supressMoveable: true,
    },
    {
      headerName: "Rating",
      field: "imdbRating",
      supressMoveable: true,
      sortable: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://localhost:8000/people/${ID}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((person) => {
        setPerson(person);
        setRowData(person.roles);

        setGraphData(
          labels.map((label) => {
            return person.roles.filter(
              (role) => parseInt(role.imdbRating) === label
            ).length;
          })
        );
      })
      .catch((error) => navigate(`/login?redirect=false`));
  };

  return (
    <div class="container-xxl d-flex justify-content-center">
      <div className="movie">
        <h1> {person.name}</h1>
        {person.birthYear && (
          <h2>
            {person.birthYear}-{person.deathYear}
          </h2>
        )}
        <div className="ag-theme-balham" style={{ height: 335, width: 805 }}>
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={9}
            onRowClicked={(row) => navigate(`/movie?id=${row.data.movieId}`)}
          />
        </div>
        <h1>IMDB Ratings</h1>
        <Bar
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },

            scales: {
              y: {
                title: {
                  display: true,
                  text: "Number of Movies",
                  font: {
                    size: 20,
                  },
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "IMDB Rating",
                  font: {
                    size: 20,
                  },
                  color: "white",
                },
                grid: {
                  drawOnChartArea: false,
                },
                ticks: {
                  color: "white",
                },
              },
            },
          }}
          data={{
            labels: labels,

            datasets: [
              {
                label: "IMDB Ratings",
                // count the number of movies in each rating range use a mop fuction
                data: graphhData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(201, 203, 207, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                ],
                borderWidth: 1,

                hoverBackgroundColor: [
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                  "rgba(255, 205, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                  "rgba(201, 203, 207, 0.4)",
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                  "rgba(255, 205, 86, 0.4)",
                ],
                hoverBorderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(201, 203, 207, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                ],
              },
            ],
          }}
        ></Bar>

        <div class="row">
          {/*Back button */}
          <div class="col">
            <Button
              color="primary"
              onClick={() => navigate(-1)}
              className="mt-2"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
