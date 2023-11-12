import { useNavigate } from "react-router-dom";
import React from "react";
import { Card, CardImg } from "reactstrap";

export default function Home() {
  const Logo = "https://wallpapers.com/images/featured/9pvmdtvz4cb0xl37.jpg";
  const navigate = useNavigate();

  const Search = (title, year) => {
    title = title.replace(/ /g, "%20");
    let searchURL = "";
    if (title && year) {
      searchURL = `/search?title=${title}&year=${year}&`;
    } else if (title) {
      searchURL = `/search?title=${title}`;
    } else if (year && year !== "0") {
      searchURL = `/search?year=${year}`;
    } else {
      searchURL = `/search/?title=${title}`;
    }
    return searchURL;
  };
  return (
    <div className="Home">
      <header>
        <Card inverse>
          <CardImg
            alt="Movie Header"
            src={Logo}
            style={{ objectFit: "cover", height: "30vh" }}
          />
        </Card>
      </header>
      <body>
        <h1>Find The Best Movies!</h1>
        <div className="movies">
          <div className="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              style={{ marginBottom: 50 }}
            >
              <div className="row">
                <div class="d-flex justify-content-center">
                  <input
                    type="text"
                    placeholder="Movie..."
                    name="search"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div class="d-flex justify-content-center">
                  <select>
                    <option value={0}>Any Year</option>
                    {Array.from(
                      { length: 2024 - 1990 },
                      (_, i) => i + 1990
                    ).map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div class="d-flex justify-content-center">
                  <button
                    style={{ width: 90 }}
                    onClick={() => {
                      let searchURL = Search(
                        document.getElementsByName("search")[0].value,
                        document.getElementsByTagName("select")[0].value
                      );
                      navigate(`${searchURL}`);
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}
