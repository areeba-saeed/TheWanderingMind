import React, { memo } from "react";

function FilterHeader({ personal }) {
  return (
    <div className="filter">
      <div className="btn-group btn-group-lg text-center w-100 p-4">
        <button type="button" className="btn btn-primary">
          Name
        </button>
        <button type="button" className="btn btn-primary">
          Posted date
        </button>
        <button type="button" className="btn btn-primary">
          Number of comments
        </button>
        {personal ? (
          <button type="button" className="btn btn-primary">
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(FilterHeader);
