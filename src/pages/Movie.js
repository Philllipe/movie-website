import "../styles.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function Movie() {
  const [searchParams] = useSearchParams();
  const ID = searchParams.get("id");
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      headerName: "Name",
      field: "name",
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
  ];

  const refresh = async (row) => {
    if (!localStorage.getItem("token")) {
      navigate(`/login?redirect=false`);
      return;
    }
    const refreshToken = localStorage.getItem("tokenRefresh");
    const response = await fetch(`https://localhost:8000/user/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    }).catch((error) => alert("Error:", error));

    const data = await response.json();
    if (data.error) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenRefresh");
      localStorage.removeItem("email");
      navigate(`/login?redirect=true`);
    } else {
      localStorage.setItem("token", data.bearerToken.token);
      localStorage.setItem("tokenRefresh", data.refreshToken.token);
      navigate(`/person?id=${row.data.id}`);
    }
  };

  useEffect(() => {
    if (!ID) {
      navigate("/");
      return;
    }

    fetch(`https://localhost:8000/movies/data/${ID}`)
      .then((response) => response.json())
      .then((movie) => {
        setMovie(movie);
        setRowData(movie.principals);
      })
      .catch((error) => alert("Error:", error));
  }, [ID, navigate]);

  if (movie.boxoffice && (movie.boxoffice !== "0" || movie.boxoffice !== 0)) {
    movie.boxoffice = movie.boxoffice.toLocaleString();
  }

  if (movie.title === undefined) {
    return (
      <div style={{ marginBottom: 870 }}>
        <h1>Movie Not Found!</h1>
      </div>
    );
  }

  return (
    <div class="container-xxl d-flex justify-content-center">
      <div className="movie">
        <div class="row ">
          <div class="col-8">
            <div class="row ">
              <h1>{movie.title}</h1>
              <h2>
                {movie.year}, {movie.runtime} minutes
              </h2>
              {movie.genres && (
                <h3>
                  {movie.genres.map((genre) => (
                    <span class="badge bg-primary me-2">{genre}</span>
                  ))}
                </h3>
              )}
              <h3>
                {movie.country && (
                  <span class="badge bg-danger me-2">{movie.country}</span>
                )}
                {movie.boxoffice !== 0 && (
                  <span class="badge bg-success me-2">${movie.boxoffice}</span>
                )}
              </h3>
              <p>{movie.plot}</p>
            </div>
            <div class="row">
              <div
                className="ag-theme-balham"
                style={{ height: 330, width: 630 }}
              >
                <AgGridReact
                  columnDefs={columns}
                  rowData={rowData}
                  onRowClicked={(row) => refresh(row)}
                />
              </div>
            </div>
          </div>
          <div class="col">
            <img src={movie.poster} alt={movie.title} />
            <div className="ratings" class="row">
              <div class="col">
                {movie.ratings &&
                  movie.ratings.map((rating) => (
                    <div class="row">
                      <div class="col mt-2">
                        <h>
                          {/* do not display source if rating is null usnig normal text */}
                          {rating.value != null && (
                            <span>{rating.source}:</span>
                          )}
                          <span class="badge bg-success ms-2">
                            {rating.value}
                          </span>
                        </h>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
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
