import React from "react";
import { useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table } from "../components/Table";
import "../styles.css";
import { Button } from "reactstrap";

export default function Search() {
  const [searchParams] = useSearchParams();
  let title = searchParams.get("title");
  const year = searchParams.get("year");
  const gridRef = useRef();
  const navigate = useNavigate();

  const setURL = (title, year) => {
    let searchURL = "";
    if (title && title !== "" && year && year !== "0") {
      title = title.replace(/ /g, "%20");
      searchURL = `/search?title=${title}&year=${year}&`;
    } else if (title && title !== "") {
      title = title.replace(/ /g, "%20");
      searchURL = `/search?title=${title}&`;
    } else if (year && year !== "0") {
      searchURL = `/search?year=${year}&`;
    } else {
      searchURL = `/search/?`;
    }
    return searchURL;
  };

  const URL = `https://localhost:8000/movies${setURL(title, year)}`;

  if (!title) {
    title = "";
  }

  const onGridReady = useCallback(
    (params) => {
      try {
        const dataSource = {
          rowCount: null,
          getRows: async (params) => {
            const response = await fetch(
              `${URL}page=${params.startRow / 100 + 1}`
            )
              .then((response) => response.json())
              .then((movies) => movies.data)
              .then((data) =>
                data.map((movie) => ({
                  title: movie.title,
                  year: movie.year,
                  imdbID: movie.imdbID,
                  imdbRating: movie.imdbRating,
                  rottenTomatoesRating: movie.rottenTomatoesRating,
                  metacriticRating: movie.metacriticRating,
                  classification: movie.classification,
                }))
              );
            const lastRow =
              response.length < 100 ? params.startRow + response.length : null;
            params.successCallback(response, lastRow);
          },
        };
        gridRef.current.api.setDatasource(dataSource);
      } catch (error) {
        alert(error);
      }
    },
    [URL]
  );

  return (
    <div className="search">
      <h1>Showing Results For: </h1>
      {(!title || title === "") && (!year || year === 0) ? (
        <h2>Any Title & Year</h2>
      ) : null}
      {title && title !== "" ? <h2>Title: {title}</h2> : null}
      {year && year !== "0" ? <h2>Year: {year}</h2> : null}
      {Table(onGridReady, gridRef)}
      <div className="container">
        <div className="row">
          <div class="d-flex justify-content-center">
            <Button
              color="info"
              size="lg"
              className="mt-3"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
