import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import moment from 'moment';
import { Box, Button, TextField, Typography, FormControl, Select, MenuItem } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CountryDropdown } from 'react-country-region-selector';
import { API } from '../../../services/axios';
import { IFormInput } from './types';

import './index.css';
import SvgComponent from '../../../assets/images/Arrow';

const schema = yup.object().shape({
   id: yup.string(),
   customerEmail: yup.string().email().required('Customer email is a required field'),
   machineType: yup.string().required('Machine type is a required field'),
   machineWatt: yup.number().required(),
   machineTH: yup.number().required(),
   electricityCost: yup.number().required(),
   minersCost: yup.number().required(),
   hostingCost: yup.number().required(),
   location: yup.string().required('Contract Country is a required field'),
   hostingCompany: yup.string().required('Hosting Company is a required field'),
   machineSupplier: yup.string().required('Machine Supplier is a required field'),
   totalInvestment: yup.number().required(),
   hearstUpfront: yup.number().required(),
   yearToCapitalConstitution: yup.number().required(),
   subAccountUserId: yup.string().required('Sub Account User ID is a required field'),
   subAccountApiKey: yup.string().required('Sub Account API Key is a required field'),
   subAccountApiSecret: yup.string().required('Sub Account API Secret is a required field'),
   contractStartingDate: yup.string(),
   timeToPlug: yup.string(),
   plugDate: yup.string(),
   numberOfMachines: yup.number().required(),
   lastMonthMined: yup.number().required(),
   lastMonthRevenue: yup.number().required(),
   lastMonthApy: yup.number().required(),
   lastMonthMinedPercent: yup.number(),
   lastMonthRevenuePercent: yup.number(),
   lastMonthApyPercent: yup.number().required(),
   hashRate: yup.number().required().required(),
   hashRatePercent: yup.number().required(),
   contractStatus: yup.string().required('Contract Status s a required field'),
   monthlyElectricityCost: yup.string().required()
});

const ContractForm = ({
   handleFetchContract,
   setShowModal,
   editData,
   setIsContractUpdated,
   setError,
   onFinish,
}: any): JSX.Element => {
   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<IFormInput>({ resolver: yupResolver(schema) });

   const handleChangeContractStartingDate = (
      date: any
   ) => {
      const value = date;
      const startingDate = new Date(value).getTime();
      const monthDuration = 2592000000;
      const time = moment(startingDate + monthDuration).format('MM/DD/yyyy');

      return time
   };

   const [timeToPlug, setTimeToPlug] = useState<any>();
   const onSubmit: SubmitHandler<IFormInput> = async (contractData) => {
      try {
         const contract = {
            ...contractData,
            plugDate: moment(contractData.plugDate).format('YYYY-MM-DD'),
            timeToPlug: moment(contractData.timeToPlug || timeToPlug).format('YYYY-MM-DD'),
            contractStartingDate: moment(contractData.contractStartingDate).format('YYYY-MM-DD')
         };
         if (editData.id) {
            await API.put(`/contract/${editData.id}`, contract);
            setShowModal(false);
         } else {
            await API.post('/contract', contract);
            setShowModal(false);
         }
         onFinish();
         setIsContractUpdated(true);
         handleFetchContract();
      } catch (err: any) {
         setError(err?.response?.data.error);
      }
   };



   const handleOnWheel = () => {
      (document?.activeElement as any).blur();
   };

   return (
      <>
         <Box className="containerContract">
            <Typography className="contract-from-title-c">
               {editData?.id ? 'Edit' : 'Add'} Contract
            </Typography>
            <form className="contract-form-c" onSubmit={handleSubmit(onSubmit)} id="nameform">
               <div className='wrapInput'>
                  <p className="label">Customer Email <span className='asterisk'>*</span></p>
                  <Controller
                     name="customerEmail"
                     control={control}
                     defaultValue={editData?.customerEmail ?? ''}
                     render={({ field }) => (
                        <TextField
                           className="inputContainer"
                           {...field}
                           placeholder="Customer email"
                           type="text"
                           variant="outlined"
                           error={!!errors.customerEmail}
                           fullWidth
                           margin="dense"
                           disabled={!!editData?.id}
                           helperText={errors.customerEmail?.message ?? ''}
                        />
                     )}
                  />
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Machine Type <span className='asterisk'>*</span></p>
                     <Controller
                        name="machineType"
                        control={control}
                        defaultValue={editData?.machineType ?? ''}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Machine type"
                              type="text"
                              variant="outlined"
                              error={!!errors.machineType}
                              fullWidth
                              margin="dense"
                              helperText={errors.machineType?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Number Of Machines</p>
                     <Controller
                        name="numberOfMachines"
                        control={control}
                        defaultValue={editData?.numberOfMachines ?? 0}
                        render={({ field }) => (
                           <TextField
                              onWheel={handleOnWheel}
                              className="inputContract"
                              {...field}
                              placeholder="Number Of Machines"
                              type="number"
                              variant="outlined"
                              error={!!errors.numberOfMachines}
                              fullWidth
                              margin="dense"
                              helperText={errors.numberOfMachines?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Machine Power Consumption (Watt)</p>
                     <Controller
                        name="machineWatt"
                        control={control}
                        defaultValue={editData?.machineWatt ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Machine Power Consumption (Watt)"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.machineWatt}
                              fullWidth
                              margin="dense"
                              helperText={errors.machineWatt?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Machine Computation Power (TH)</p>
                     <Controller
                        name="machineTH"
                        control={control}
                        defaultValue={editData?.machineTH ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Machine Computation Power (TH)"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.machineTH}
                              fullWidth
                              margin="dense"
                              helperText={errors.machineTH?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Cost Of Electricity & Hosting ($/KwH)</p>
                     <Controller
                        name="electricityCost"
                        control={control}
                        defaultValue={editData?.electricityCost ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Cost Of Electricity & Hosting ($/KwH)"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.electricityCost}
                              fullWidth
                              margin="dense"
                              helperText={errors.electricityCost?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Cost Of Miners Installed($)</p>
                     <Controller
                        name="minersCost"
                        control={control}
                        defaultValue={editData?.minersCost ?? 0}
                        render={({ field }) => (
                           <TextField
                              {...field}
                              className="inputContract"
                              placeholder="Cost Of Miners Installed"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.minersCost}
                              fullWidth
                              margin="dense"
                              helperText={errors.minersCost?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Cost Of Upfront($)</p>
                     <Controller
                        name="hostingCost"
                        control={control}
                        defaultValue={editData?.hostingCost ?? 0}
                        render={({ field }) => (
                           <TextField
                              {...field}
                              className="inputContract"
                              placeholder="Cost Of Hosting Upfront"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hostingCost}
                              fullWidth
                              margin="dense"
                              helperText={errors.hostingCost?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Contract Country <span className='asterisk'>*</span></p>
                     <Controller
                        name="location"
                        control={control}
                        defaultValue={editData?.location ?? ''}
                        render={({ field }) => (
                           <div className="wrapInput">
                              <CountryDropdown
                                 name="location"
                                 onChange={field.onChange}
                                 value={field.value}
                                 classes={`countries ${errors.location ? 'country-error' : 'country-regular'
                                    }`}
                                 defaultOptionLabel="Contract Country"
                              />
                              {errors.location && (
                                 <p
                                    style={{
                                       color: 'red',
                                       alignSelf: 'flex-start',
                                       fontWeight: 400,
                                       fontSize: '0.75rem',
                                       margin: '3px 14px 0 14px'
                                    }}
                                 >
                                    {errors.location.message}
                                 </p>
                              )}
                           </div>
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Hosting Company <span className='asterisk'>*</span></p>
                     <Controller
                        name="hostingCompany"
                        control={control}
                        defaultValue={editData?.hostingCompany ?? ''}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Hosting Company"
                              type="text"
                              variant="outlined"
                              error={!!errors.hostingCompany}
                              fullWidth
                              margin="dense"
                              helperText={errors.hostingCompany?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Machine Supplier <span className='asterisk'>*</span></p>
                     <Controller
                        name="machineSupplier"
                        control={control}
                        defaultValue={editData?.machineSupplier ?? ''}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Machine Supplier"
                              type="text"
                              variant="outlined"
                              error={!!errors.machineSupplier}
                              fullWidth
                              margin="dense"
                              helperText={errors.machineSupplier?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Total Investment($)</p>
                     <Controller
                        name="totalInvestment"
                        control={control}
                        defaultValue={editData?.totalInvestment ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Total Investment"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.totalInvestment}
                              fullWidth
                              margin="dense"
                              helperText={errors.totalInvestment?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Hearst Upfront($)</p>
                     <Controller
                        name="hearstUpfront"
                        control={control}
                        defaultValue={editData?.hearstUpfront ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Hearst Upfront"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Last Month Mined</p>
                     <Controller
                        name="lastMonthMined"
                        control={control}
                        defaultValue={editData?.lastMonthMined ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Mined"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Last Month Revenue</p>
                     <Controller
                        name="lastMonthRevenue"
                        control={control}
                        defaultValue={editData?.lastMonthRevenue ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Revenue"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Last Month Apy</p>
                     <Controller
                        name="lastMonthApy"
                        control={control}
                        defaultValue={editData?.lastMonthApy ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Apy"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Last Month Mined Percent</p>
                     <Controller
                        name="lastMonthMinedPercent"
                        control={control}
                        defaultValue={editData?.lastMonthMinedPercent ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Mined Percent"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Last Month Revenue Percent</p>
                     <Controller
                        name="lastMonthRevenuePercent"
                        control={control}
                        defaultValue={editData?.lastMonthRevenuePercent ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Revenue Percent"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Last Month Apy Percent</p>
                     <Controller
                        name="lastMonthApyPercent"
                        control={control}
                        defaultValue={editData?.lastMonthApyPercent ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Last Month Apy Percent"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSection">
                  <div className='wrapInput'>
                     <p className="label">Hash Rate</p>
                     <Controller
                        name="hashRate"
                        control={control}
                        defaultValue={editData?.hashRate ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Hash Rate"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput'>
                     <p className="label">Hash Rate Percent</p>
                     <Controller
                        name="hashRatePercent"
                        control={control}
                        defaultValue={editData?.hashRatePercent ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Hash Rate Percent"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.hearstUpfront}
                              fullWidth
                              margin="dense"
                              helperText={errors.hearstUpfront?.message ?? ''}
                           />
                        )}
                     />
                  </div>
               </div>
               <div className="contractSectionLastElement">
                  <div className='wrapInput'>
                     <p className="label">Year To Capital Constitution</p>
                     <Controller
                        name="yearToCapitalConstitution"
                        control={control}
                        defaultValue={editData?.yearToCapitalConstitution ?? 0}
                        render={({ field }) => (
                           <TextField
                              className="inputContract"
                              {...field}
                              placeholder="Year To Capital Constitution"
                              type="number"
                              onWheel={handleOnWheel}
                              variant="outlined"
                              error={!!errors.yearToCapitalConstitution}
                              fullWidth
                              margin="dense"
                              helperText={errors.yearToCapitalConstitution?.message ?? ''}
                           />
                        )}
                     />
                  </div>
                  <div className='wrapInput '>
                     <p className="label">Contract Status <span className='asterisk'>*</span></p>
                     <Controller
                        name="contractStatus"
                        control={control}
                        defaultValue={editData?.contractStatus ?? ''}
                        render={({ field }) => (
                           <FormControl fullWidth>
                              <Select
                                 IconComponent={SvgComponent}
                                 className="inputField"
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 label="Contract Status"
                                 {...field}
                              >
                                 <MenuItem value="Signed">Signed</MenuItem>
                                 <MenuItem value="Deployed">Deployed</MenuItem>
                                 <MenuItem value="Deploying">Deploying</MenuItem>
                              </Select>
                              <span className='errorMassageContract'>{!!errors.contractStatus ? errors.contractStatus?.message : ''}</span>
                           </FormControl>
                        )}
                     />
                  </div>
               </div>
               <div className='wrapInput '>
                  <p className="label">Sub Account User Id <span className='asterisk'>*</span></p>
                  <Controller
                     name="subAccountUserId"
                     control={control}
                     defaultValue={editData?.subAccountUserId ?? ''}
                     render={({ field }) => (
                        <TextField
                           className="inputField"
                           {...field}
                           placeholder="Sub Account User Id"
                           type="text"
                           variant="outlined"
                           error={!!errors.subAccountUserId}
                           fullWidth
                           margin="dense"
                           helperText={errors.subAccountUserId?.message ?? ''}
                        />
                     )}
                  />
               </div>
               <div className='wrapInput '>
                  <p className="label">Sub Account API Key <span className='asterisk'>*</span></p>
                  <Controller
                     name="subAccountApiKey"
                     control={control}
                     defaultValue={editData?.subAccountApiKey ?? ''}
                     render={({ field }) => (
                        <TextField
                           className="inputField"
                           {...field}
                           placeholder="Sub Account API Key"
                           type="text"
                           variant="outlined"
                           error={!!errors.subAccountApiKey}
                           fullWidth
                           margin="dense"
                           helperText={errors.subAccountApiKey?.message ?? ''}
                        />
                     )}
                  />
               </div>
               <div className='wrapInput '>
                  <p className="label">Sub Account API Secret <span className='asterisk'>*</span></p>
                  <Controller
                     name="subAccountApiSecret"
                     control={control}
                     defaultValue={editData?.subAccountApiSecret ?? ''}
                     render={({ field }) => (
                        <TextField
                           className="inputField"
                           {...field}
                           placeholder="Sub Account Api Secret"
                           type="text"
                           variant="outlined"
                           error={!!errors.subAccountApiSecret}
                           fullWidth
                           margin="dense"
                           helperText={errors.subAccountApiSecret?.message ?? ''}
                        />
                     )}
                  />
               </div>
               <div className='wrapInput '>
                  <p className="label">Contract Starting Date</p>
                  <Controller
                     name="contractStartingDate"
                     control={control}
                     defaultValue={editData?.contractStartingDate ? moment(editData?.contractStartingDate).format('MM/DD/yyyy') : ''}
                     render={({ field }) => (
                        <>
                           <DatePicker
                              {...field}
                              autoComplete="off"
                              showPopperArrow={true}
                              placeholderText='mm/dd/yyyy'
                              selected={field.value ? new Date(field.value) : null}
                              className="inputField dateInput"
                              onChange={(date) => {
                                 field.onChange(moment(date).format('MM/DD/yyyy'))
                                 setTimeToPlug(handleChangeContractStartingDate(date))
                              }} />
                           <span className='errorMassage'>{!!errors.contractStartingDate ? errors.contractStartingDate?.message : ''}</span>
                        </>
                     )
                     }
                  />
               </div>
               <div className='wrapInput '>
                  <p className="label">Time to Plug </p>
                  <Controller
                     name="timeToPlug"
                     control={control}
                     defaultValue={editData?.timeToPlug ? moment(editData?.timeToPlug).format('MM/DD/yyyy') : ''}
                     render={({ field }) => {
                        return <>
                           <DatePicker
                              {...field}
                              autoComplete="off"
                              showPopperArrow={true}
                              placeholderText='mm/dd/yyyy'
                              selected={field.value ? new Date(field.value) : null}
                              className="inputField dateInput "
                              {...(timeToPlug ? { value: timeToPlug } : {})}
                              onChange={(date) => {
                                 setTimeToPlug(moment(date).format('MM/DD/yyyy'))
                                 field.onChange(moment(date).format('MM/DD/yyyy'))
                              }}
                           />
                           <span className='errorMassage'>{!!errors.timeToPlug ? errors.timeToPlug?.message : ''}</span>
                        </>
                     }}
                  />
               </div>
               <div className='wrapInput '>
                  <p className="label">Plug Date </p>
                  <Controller
                     name="plugDate"
                     control={control}
                     defaultValue={editData?.plugDate ? moment(editData?.plugDate).format('MM/DD/yyyy') : ''}
                     render={({ field }) => (
                        <>
                           <DatePicker
                              {...field}
                              autoComplete="off"
                              showPopperArrow={true}
                              placeholderText='mm/dd/yyyy'
                              selected={field.value ? new Date(field.value) : null}
                              className="inputField dateInput"
                              onChange={(date) => field.onChange(moment(date).format('MM/DD/yyyy'))} />
                           <span className='errorMassage'>{!!errors.plugDate ? errors.plugDate?.message : ''}</span>
                        </>

                     )}
                  />
               </div>
               <div className='wrapInput'>
                  <p className="label">Monthly electricity cost (+/- 5%)</p>
                  <Controller
                     name="monthlyElectricityCost"
                     control={control}
                     defaultValue={editData?.monthlyElectricityCost ?? 0}
                     render={({ field }) => (
                        <TextField
                           className="inputContract"
                           {...field}
                           placeholder="Monthly electricity cost (+/- 5%)"
                           type="number"
                           onWheel={handleOnWheel}
                           variant="outlined"
                           error={!!errors.monthlyElectricityCost}
                           fullWidth
                           margin="dense"
                           helperText={errors.monthlyElectricityCost?.message ?? ''}
                        />
                     )}
                  />
               </div>
            </form>
            <Button className="app-button" form="nameform" type="submit">
               {!editData.id ? 'Add Contract' : 'Save'}
            </Button>
         </Box>
      </>
   );
};

export default ContractForm;
