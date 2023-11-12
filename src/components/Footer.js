import React from "react";

export function Footer() {
  const imbd = "https://download.logo.wine/logo/IMDb/IMDb-Logo.wine.png";
  const Metacritic =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png";
  const RottenTomatoes =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/757px-Rotten_Tomatoes.svg.png";
  const qut =
    "https://www.qut.edu.au/__data/assets/image/0007/909781/qut-logo-og-1200.jpg";

  return (
    <div className="footer">
      <p>All data taken from IMBD, Metacritic & RottenTomatoes</p>
      <img alt="IMDB" src={imbd} style={{ width: 100 }}></img>
      <img alt="Metacritic" src={Metacritic} style={{ width: 50 }}></img>
      <img
        alt="RottenTomatoes"
        src={RottenTomatoes}
        style={{ width: 60, paddingLeft: 10 }}
      ></img>

      <p>© 2023 Phillipe Sebastiao </p>
      <img alt="logo" src={qut} style={{ width: 70 }}></img>
    </div>
  );
}
