import React, { useState } from "react";
import { useLocation } from "react-router";
import ShowsTable from "./ShowTable";
import ShowForm from "./ShowForm";

const Show = () => {
  const location = useLocation();
  const theatreId = location.state?.theatreId;

  const [view, setView] = useState("table");
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "16px" }}>
      {view === "table" && (
        <ShowsTable id={theatreId} setView={setView} refresh={refresh} />
      )}

      {(view === "form" || view === "edit") && (
        <ShowForm
          setView={setView}
          theatreId={theatreId}
          isEdit={view === "edit"}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Show;
