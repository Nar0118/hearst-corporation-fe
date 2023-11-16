import React, { useMemo, useRef, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {
  Checkbox,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterPopup from '../../../assets/images/filter-popup.svg';
import { HeaderProps } from './type';
import { MachineTypes } from '../../../pages/Main/types';
import { IFormInput } from '../../shared/ContractForm/types';

import './index.css';

function Header({
  value,
  setValue,
  machineTypes,
  allContracts,
  setFilter
}: HeaderProps): JSX.Element {
  const [contract, setContract] = useState<string[]>([]);
  const [contractSaved, setContractSaved] = useState<string[]>([]);
  const [machineSaved, setMachineSaved] = useState<string[]>([]);
  const [machine, setMachine] = useState<string[]>([]);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isOpenMachine, setIsOpenMachine] = useState(false);
  const [isOpenContract, setIsOpenContract] = useState(false);
  const contractRef = useRef<HTMLSelectElement>(null);
  const machineRef = useRef<HTMLSelectElement>(null);

  const [machineTypesArr, contractIdsArr] = useMemo(() => {
    const machineTypesArr = machineTypes && machineTypes.length
      ? machineTypes.map((elem: MachineTypes) => elem.machineType)
      : [];

    const contractIdsArr = allContracts && allContracts.length
      ? allContracts.map((elem: IFormInput) => elem.subAccountUserId).sort()
      : [];

    return [machineTypesArr, contractIdsArr];
  }, [machineTypes, allContracts]);

  const handleChangeContract = (event: SelectChangeEvent<typeof contract>) => {
    const {
      target: { value }
    } = event;
    setContract(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeMachine = (event: SelectChangeEvent<typeof machine>) => {
    const {
      target: { value }
    } = event;
    setMachine(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  const handleContractClick = () => {
    setIsOpenContract(true);
    contractRef?.current?.focus();
  };

  const handleContractClose = () => {
    if (JSON.stringify(contract) != JSON.stringify(contractSaved)) {
      setFilter(contract, machine);
      setContractSaved(contract);
    }
    setIsOpenContract(false);
  };

  const handleMachineClick = () => {
    setIsOpenMachine(true);
    machineRef?.current?.focus();
  };

  const handleMachineClose = () => {
    if (JSON.stringify(machine) != JSON.stringify(machineSaved)) {
      setFilter(contract, machine);
      setMachineSaved(contract);
    }
    setIsOpenMachine(false);
  };

  return (
    <div className="wrapperContainer">
      <div className="containerHeader">
        <h1 className="dashboard">Dashboard</h1>
        <div
          style={{ flexGrow: 0, marginLeft: 'auto' }}
          className="filtersMobile"
        >
          <Tooltip title="">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <img src={FilterPopup} alt="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: '45px',
              width: '350px',
              // boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
              borderRadius: '4px'
            }}
            id=""
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem className="dateMb">
              <DateRangePicker
                onChange={(val: Date[]) => {
                  setValue(val);
                  setFilter(contract, machine, val);
                }}
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
            </MenuItem>
            <MenuItem className="contractsFilterMbLi">
              <div className="contractsFilterMb">
                {!contract?.length && (
                  <div className="dashboard-label" onClick={handleContractClick}>All
                    Contracts</div>
                )}
                <Select
                  ref={contractRef}
                  open={isOpenContract}
                  value={contract}
                  multiple
                  onChange={handleChangeContract}
                  IconComponent={KeyboardArrowDownIcon}
                  renderValue={(selected: any) => {
                    const selectedContracts = selected.map(
                      (contractId: string) => {
                        return `${contractId}`;
                      }
                    );
                    return selectedContracts.join(', ');
                  }}
                  onClose={handleContractClose}
                >
                  {contractIdsArr.map((name: string) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        sx={{
                          color: 'rgba(29, 29, 31, 0.14)',
                          '&.Mui-checked': {
                            color: 'green'
                          }
                        }}
                        checked={contract.indexOf(name) > -1}
                      />
                      <p>{name}</p>
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </MenuItem>
            <MenuItem className="machinesFilterMbLi">
              <div className="">
                {!machine.length && (
                  <div className="dashboard-label" onClick={handleMachineClick}>All Machines</div>
                )}
                <Select
                  ref={machineRef}
                  open={isOpenMachine}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={machine}
                  IconComponent={KeyboardArrowDownIcon}
                  onChange={handleChangeMachine}
                  renderValue={(selected: any) => selected.join(', ')}
                  onClose={handleMachineClose}
                >
                  {machineTypesArr.map((name: string) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        sx={{
                          color: 'rgba(29, 29, 31, 0.14)',
                          '&.Mui-checked': {
                            color: 'green'
                          }
                        }}
                        checked={machine.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </MenuItem>
          </Menu>
        </div>
        <DateRangePicker
          className="date"
          onChange={(val: Date[]) => {
            setValue(val);
            setFilter(contract, machine, val);
          }}
          monthAriaLabel={false}
          value={value}
          format={'dd-MM-y'}
          maxDate={new Date()}
          calendarIcon={open ? <KeyboardArrowUpIcon style={{ color: '#757575' }} /> :
            <KeyboardArrowDownIcon style={{ color: '#757575' }} />}
          clearIcon={null}
        />
        <div className="dashboard-div">
          <Select
            className="dashboard-input"
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            displayEmpty
            value={contract}
            multiple
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChangeContract}
            IconComponent={KeyboardArrowDownIcon}
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <em>All Contracts</em>;
              }
              const selectedContracts = selected.map((contractId: string) => {
                return `${contractId}`;
              });
              return selectedContracts.join(', ');
            }}
            onClose={() => {
              if (JSON.stringify(contract) != JSON.stringify(contractSaved)) {
                setFilter(contract, machine);
                setContractSaved(contract);
              }
            }}
          >
            <MenuItem disabled value="" >
              <em>All Contracts</em>
            </MenuItem>
            {contractIdsArr.map((name: string) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  sx={{
                    color: 'rgba(29, 29, 31, 0.14)',
                    '&.Mui-checked': {
                      color: 'green'
                    }
                  }}
                  checked={contract.indexOf(name) > -1}
                />
                <p>{name}</p>
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="dashboard-div">
          <Select
            className="dashboard-input"
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            displayEmpty
            value={machine}
            IconComponent={KeyboardArrowDownIcon}
            onChange={handleChangeMachine}
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <em>All Machines</em>;
              }
              return selected.join(', ')
            }
            }
            onClose={() => {
              if (JSON.stringify(machine) != JSON.stringify(machineSaved)) {
                setFilter(contract, machine);
                setMachineSaved(machine);
              }
            }}
          >
            <MenuItem disabled value="" >
              <em>All Machines</em>
            </MenuItem>
            {machineTypesArr.map((name: string) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  sx={{
                    color: 'rgba(29, 29, 31, 0.14)',
                    '&.Mui-checked': {
                      color: 'green'
                    }
                  }}
                  checked={machine.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Header;
