import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useNavigate } from "react-router-dom";

import "../styles.css";

const columns = [
  {
    headerName: "Title",
    field: "title",
    maxWidth: 500,
    suppressMovable: true,
    resizable: true,
  },
  { headerName: "Year", field: "year", maxWidth: 50, suppressMovable: true },
  {
    headerName: "IMDB Rating",
    field: "imdbRating",
    maxWidth: 95,
    suppressMovable: true,
  },
  {
    headerName: "RottenTomatoes Rating",
    field: "rottenTomatoesRating",
    maxWidth: 155,
    suppressMovable: true,
  },
  {
    headerName: "Metacritic Rating",
    field: "metacriticRating",
    maxWidth: 120,
    suppressMovable: true,
  },
  {
    headerName: "Rating",
    field: "classification",
    maxWidth: 80,
    suppressMovable: true,
  },
];

export function Table(onGridReady, gridRef) {
  const navigate = useNavigate();

  return (
    <div>
      <div class="row">
        <div class="d-flex justify-content-center">
          <div className="ag-theme-balham" style={{ height: 907, width: 710 }}>
            <AgGridReact
              ref={gridRef}
              columnDefs={columns}
              rowModelType="infinite"
              rowSelection={"multiple"}
              rowBuffer={0}
              infiniteInitialRowCount={100}
              pagination={true}
              paginationPageSize={30}
              cacheBlockSize={100}
              cacheOverflowSize={2}
              maxConcurrentDatasourceRequests={1}
              maxBlocksInCache={10}
              onGridReady={onGridReady}
              enableCellChangeFlash={true}
              onRowClicked={(row) => {
                navigate(`/movie?id=${row.data.imdbID}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
