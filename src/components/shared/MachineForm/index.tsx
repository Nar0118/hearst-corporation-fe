import { useState } from "react";
import { useParams } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { API } from "../../../services/axios";
import { IFormInput } from "./types";

import "./index.css";

const schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  accepted: yup.string().required(),
  stale: yup.string().required(),
  other: yup.string().required(),
  contractId: yup.string(),
});

interface IEditData {
  contractId?: string;
  other: string;
  stale: string;
  accepted: string;
  name: string;
  id?: string;
}

const MachineForm = ({
  setShowModal,
  editData,
  setMachineAdded,
  onFinish
}: any): JSX.Element => {
  const { id } = useParams();

  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = async (machineData) => {
    try {
      if (editData?.id) {
        const newMachine: IEditData = {
          ...machineData,
          contractId: id
        };
        delete newMachine?.id;
        await API.put(`/machines/${editData.id}`, newMachine);
        setShowModal(false);
      } else {
        await API.post("/machines", {
          ...machineData,
          contractId: id
        });
        setShowModal(false);
      }
      onFinish()
      setMachineAdded(true);
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };

  const handleClose = () => {
    setError("");
  };

  return (
    <>
      <Box className="containerContract">
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <Typography className="contractTitle">
          {editData?.id ? "Edit" : "Add"} Machine
        </Typography>
        <form className="contract-form-c" onSubmit={handleSubmit(onSubmit)}>
          {editData?.id && (
            <div className="wrapInput">
              <p className="label">ID</p>
              <Controller
                name="id"
                control={control}
                defaultValue={editData?.id ?? ""}
                render={({ field }) => (
                  <TextField
                    className="inputField"
                    {...field}
                    type="text"
                    variant="outlined"
                    fullWidth
                    disabled
                    margin="dense"
                  />
                )}
              />
            </div>
          )}
          <div className="wrapInput">
            <p className="label">Name</p>
            <Controller
              name="name"
              control={control}
              defaultValue={editData?.name ?? ""}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  placeholder="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>
          <div className="machineInformation">
            <div className="inputSection">
              <p className="label">Accepted</p>
              <Controller
                name="accepted"
                control={control}
                defaultValue={editData?.accepted ?? ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Accepted"
                    type="text"
                    variant="outlined"
                    error={!!errors.accepted}
                    fullWidth
                    margin="dense"
                    helperText={errors.accepted?.message ?? ""}
                  />
                )}
              />
            </div>
            <div className="inputSection">
              <p className="label">Stale</p>
              <Controller
                name="stale"
                control={control}
                defaultValue={editData?.stale ?? 0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Stale"
                    type="text"
                    variant="outlined"
                    error={!!errors.stale}
                    fullWidth
                    margin="dense"
                    helperText={errors.stale?.message ?? ""}
                  />
                )}
              />
            </div>
          </div>
          <div className="wrapInput">
            <p className="label">Other</p>
            <Controller
              name="other"
              control={control}
              defaultValue={editData?.other ?? ""}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  placeholder="Other"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>
          <div className="wrapInput">
            <p className="label">Contract ID</p>
            <Controller
              name="contractId"
              control={control}
              defaultValue={editData?.contractId ?? id}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  type="text"
                  variant="outlined"
                  fullWidth
                  disabled
                  margin="dense"
                />
              )}
            />
          </div>
          <Button className="submitButton" type="submit">
            {!editData?.id ? "Add Machine" : "Edit Machine"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default MachineForm;
