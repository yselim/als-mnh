import {
  Button,
  Modal,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { findUser, connectNurseAndPatient } from "../../../firestoreMethods";

import "./style.css";

export default ({ open, onClose }) => {
  const [params, setParams] = useState({});

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modalBox">
        <TextField
          variant="outlined"
          value={params.searchText}
          onChange={(t) => {
            setParam("searchText", t.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={async (_) => {
            alert("Henüz değil!");
          }}
        >
          KAYDET
        </Button>
      </div>
    </Modal>
  );
};
