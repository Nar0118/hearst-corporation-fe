import { FC, useState } from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API } from "../../../services/axios";
import { IFormInput, IProps } from "./types";

import './index.css'

const RevenueForm: FC<IProps> = ({
  setShowModal,
  editData,
  onFinish,
}): JSX.Element => {
  const [error, setError] = useState<string>("");
  const schema = yup.object().shape({
    weeklyAverage: yup.string().required('Weekly average is a required field'),
    dailyAverage: yup.string().required('Daily average is a required field'),
    date: yup.string().required('Date is a required field'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IFormInput> = async (
    revenueData
  ) => {
    try {
      const newRevenue = {
        ...revenueData,
        date: moment(revenueData.date).format('YYYY-MM-DD')
      };
      if (editData) {
        await API.put(`revenue/${editData.id}`, newRevenue);
      } else {
        await API.post("revenue/", newRevenue);
      }
      setShowModal(false);
      onFinish();
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };

  const handleClose = (): void => {
    setError("");
  };


  return (
    <>
      <Box className="container">
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <form className="user-content" onSubmit={handleSubmit(onSubmit)} id="nameform">
          <Typography className="contract-from-title">
            {editData ? "Edit" : "Add"} Revenue
          </Typography>
          <div className="wrapInput">
            <p className="label">Weekly average <span className='asterisk'>*</span></p>
            <Controller
              name="weeklyAverage"
              control={control}
              defaultValue={editData?.weeklyAverage ?? ""}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  type="number"
                  placeholder="0"
                  variant="outlined"
                  helperText={errors.weeklyAverage ? errors.weeklyAverage.message : ''}
                  error={!!errors.weeklyAverage}
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>
          <div className="wrapInput">
            <p className="label">Daily average <span className='asterisk'>*</span></p>
            <Controller
              name="dailyAverage"
              control={control}
              defaultValue={editData?.dailyAverage ?? ""}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  placeholder="0"
                  type="number"
                  variant="outlined"
                  helperText={errors.dailyAverage ? errors.dailyAverage.message : ''}
                  error={!!errors.dailyAverage}
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>
          <div className="wrapInput">
            <p className="label">Date <span className='asterisk'>*</span></p>
            <Controller
              name="date"
              control={control}
              defaultValue={editData?.date ? moment(editData?.date).format('MM/DD/yyyy') : ''}
              render={({ field }) => (
                <>
                  <DatePicker
                    {...field}
                    autoComplete="off"
                    showPopperArrow={true}
                    placeholderText='mm/dd/yyyy'
                    selected={field.value ? new Date(field.value) : null}
                    className={!errors.date ? "inputField dateInput" : 'inputField  errorBorder'}
                    onChange={(date) => field.onChange(moment(date).format('MM/DD/yyyy'))}
                  />
                  <span className='errorMassage'>{!!errors.date ? errors.date?.message : ''}</span>
                </>)
              }
            />
          </div>
          <Box className="buttons">
            <Button className="submitButton" type="submit">
              {editData ? "Save Changes" : "Add Revenue"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default RevenueForm;
