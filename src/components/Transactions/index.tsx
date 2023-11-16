import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import TableComponent from '../TableComponentUserDashboard';
import { columns } from './columns';
import { API } from '../../services/axios';
import Progress from '../shared/Progress';

import './index.css';

type ButtonType = {
  value: number;
  isActive: boolean;
};

function TransactionTable({ contracts }: any) {
  const [paymentData, setPaymentDAta] = useState<any>(null);
  const [paymentFilteredData, setPaymentFilteredData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState<boolean>(false);
  const [activeContract, setActiveContract] = useState(contracts?.length ? contracts[0] : null);
  const [buttons, setButtons] = useState<ButtonType[]>([
    { value: 7, isActive: false },
    { value: 30, isActive: false },
    { value: 90, isActive: false }
  ]);
  const [value, setValue] = useState<Date[]>([new Date(), new Date()]);
  const [dateActive, setDateActive] = useState<boolean>(false);
  const [contract, setContract] = useState<string>(
    contracts?.length ? contracts[0].subAccountUserId : null
  );
  
  const filterLatestData = (date: number): void => {
    setValue([new Date(), new Date()]);
    setDateActive(false);
    const selectedButton = buttons?.filter((button: ButtonType) => {
      button.isActive = date === button.value;
      return button;
    });
    
    setButtons(selectedButton);
    setPaymentFilteredData([]);
    const currentDate = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - date);
    
    const filteredData = paymentData.filter(
       (entry: { timestamp: string | number | Date }) => {
         const entryDate = new Date(entry.timestamp);
         return entryDate >= ninetyDaysAgo && entryDate <= currentDate;
       }
    );
    
    setPaymentFilteredData(filteredData);
    setCurrentPage(1);
  };
  
  function filterDataByDateRange(startDate: Date, endDate: Date): void {
    setDateActive(true);
    setButtons((buttons: ButtonType[]) =>
       buttons.map((button: ButtonType) => ({ ...button, isActive: false }))
    );
    
    setPaymentFilteredData([]);
    const filteredData = paymentData.filter((entry: { timestamp: Date }) => {
      const entryDate = new Date(entry.timestamp);
      
      return entryDate >= startDate && entryDate <= endDate;
    });
    
    setPaymentFilteredData(filteredData);
    if (!filteredData?.length) {
      setPaymentFilteredData(null);
    }
    setCurrentPage(1);
  }
  
  const handleChange = (event: SelectChangeEvent) => {
    contracts.map((item: { subAccountUserId: string }) => {
      if (item.subAccountUserId === event.target.value) {
        setActiveContract(item);
        setContract(event.target.value);
        return item;
      }
    });
    setCurrentPage(1);
  };
  
  const change = (name: string, val: number) => {
    if ('setCurrentPage' == name) {
      setCurrentPage(val);
    } else {
      setRowsPerPage(val);
      setCurrentPage(1);
    }
  };
  
  useEffect(() => {
    if(activeContract){
      setPaymentFilteredData(null);
      API.get('/dashboard/paymentAll', {
        params: {
          subAccountApiKey: activeContract.subAccountApiKey,
          subAccountApiSecret: activeContract.subAccountApiSecret,
          subAccountUserId: activeContract.subAccountUserId
        }
      }).then((res) => {
        setPaymentDAta(res?.data);
        setPaymentFilteredData(res?.data);
      });
    }
  }, [activeContract]);
  
  return (
     <div className="wrapperTransactionTable">
       <div className="dashboard-div wrapperTransactionTableText">
         <p>Time:</p>
         <div className="dates">
           {buttons.map((button: ButtonType) => (
              <button
                 style={
                   button?.isActive
                      ? { border: '1px solid #008000' }
                      : { border: '1px solid #E7E7E7' }
                 }
                 onClick={() => filterLatestData(button.value)}
                 key={button.value}
              >
                {button.value} Days
              </button>
           ))}
         </div>
         <DateRangePicker
            onChange={(val: Date[]) => {
              filterDataByDateRange(val[0], val[1]);
              setValue(val);
            }}
            className={`date ${dateActive && 'dateActive'}`}
            monthAriaLabel={false}
            value={value}
            format={'dd-MM-y'}
            maxDate={new Date()}
            onCalendarClose={() => setOpen(false)}
            onCalendarOpen={() => setOpen(true)}
            calendarIcon={open ? <KeyboardArrowUpIcon style={{ color: '#757575' }} /> :
               <KeyboardArrowDownIcon style={{ color: '#757575' }} />}
            clearIcon={null}
         />
         <Box sx={{ minWidth: 120, textAlign: 'center' }}>
           <FormControl fullWidth>
             <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={contract}
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiSelect-icon': {
                    marginLeft: 'auto'
                  }
                }}
             >
               {contracts.map((contract: any) => (
                  <MenuItem
                     value={contract.subAccountUserId}
                     key={contract.subAccountUserId}
                  >
                    {contract.subAccountUserId}
                  </MenuItem>
               ))}
             </Select>
           </FormControl>
         </Box>
       </div>
       {!paymentFilteredData
          ? <Progress className="paymentProgress" size={24} />
          : !paymentFilteredData?.length
             ? <p className="no_payment_hostory">
               There is no payment history {`${activeContract ? ('for ' + activeContract.subAccountUserId +' contract') : ''}`}.
             </p>
             : <TableComponent
                items={paymentFilteredData?.slice(
                   (currentPage - 1) * rowsPerPage,
                   (currentPage - 1) * rowsPerPage + rowsPerPage
                )}
                columns={columns}
                rowsNumber={5}
                show={false}
                totalPages={Math.ceil(paymentFilteredData?.length / rowsPerPage)}
                setCurrentPage={(val) => change('setCurrentPage', val)}
                setRowsPerPage={(val) => change('setRowsPerPage', val)}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
             />
       }
     </div>
  );
}

export default TransactionTable;
