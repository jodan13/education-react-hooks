import React from "react";

export const Repose = ({ repose }) => (
  <React.Fragment>
    {repose.map(repo => (
      <div className="card nb-3" key={repo.id}>
        <div className="card-body">
          <h5>
            <a href={repo.html_url} rel="noopener noreferrer" target="_blank">
              {repo.name}
            </a>
          </h5>
        </div>
      </div>
    ))}
  </React.Fragment>
);
