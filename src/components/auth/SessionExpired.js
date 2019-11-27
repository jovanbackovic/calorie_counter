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
  history.push("/log_in");
};

const SessionExpired = () => {
  return (
    <Modal
      title="Session expired"
      content="Your session has expired, please log in again"
      onDismiss={dissmiss}
      actions={renderActions()}
    />
  );
};

export default SessionExpired;
