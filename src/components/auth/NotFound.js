import React from "react";

import history from "../../history";
import Modal from "../layout/Modal";

const renderActions = () => {
  return (
    <React.Fragment>
      <button onClick={dissmiss} className="ui button">
        OK
      </button>
    </React.Fragment>
  );
};

const dissmiss = () => {
  history.push("/");
};

const SessionExpired = () => {
  return (
    <Modal
      title="404 - Not found"
      content="Data not found."
      onDismiss={dissmiss}
      actions={renderActions()}
    />
  );
};

export default SessionExpired;
