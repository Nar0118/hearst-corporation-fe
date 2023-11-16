import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import ContractForm from '../../shared/ContractForm';
import CustomModal from '../../shared/CustomModal';
import { API } from '../../../services/axios';
import DeleteModal from '../../shared/deleteModal';
import TableComponent from '../../TableComponentUserDashboard';
import { columns } from './columns';
import SearchInput from '../../shared/searchInput';
import { IFormInput } from '../../shared/ContractForm/types';
import CustomSnackbar from '../../shared/CustomSnackbar';
import { useDebounce } from '../../../hooks/useDebounce';

import './index.css';

export default function ContractsTable() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contracts, setContracts] = useState<IFormInput[] | null>(null);
  const [fetchContractCount, setFetchContractCount] = useState<number>(0);
  const [delContract, setDelContract] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [contractData, setContractData] = useState<IFormInput | null>(null);
  const [error, setError] = useState<string>('');
  const [isContractUpdated, setIsContractUpdated] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [value, setValue] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const debouncedQuery = useDebounce(value, 500);
  
  const handleFetchContract = React.useCallback(() => {
    setFetchContractCount((ctr) => ++ctr);
  }, []);
  
  const handleDeleteContract = useCallback(async () => {
    if (delContract) {
      try {
        await API.delete(`/contract/${delContract}`);
        setDelContract('');
        setFetchContractCount((ftch) => ftch + 1);
        setIsContractUpdated(true);
        fetchContracts();
      } catch (err: any) {
        setError(err?.response?.data);
      }
    }
  }, [delContract]);
  
  const handelEdit = (contract: IFormInput) => {
    setShowEditModal(true);
    setContractData(contract);
  };
  
  const handleClose = () => {
    setError('');
  };
  
  const onSearchChange = async (value: string) => {
    setValue(value);
  };
  
  const handleCountItems = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  };
  
  const fetchContracts = async (search = '') => {
    setContracts(null);
    try {
      const response = await API.get('/contract', {
        params: { pageNumber: currentPage, limit: rowsPerPage, search }
      });
      const { contracts, totalPages } = response.data;
      setContracts(contracts);
      setTotalPages(totalPages);
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = (event.target as HTMLInputElement).value.trim();
      setSearch(inputValue);
    }
  };
  
  useEffect(() => {
    if (search) fetchContracts(search);
  }, [search]);
  
  useEffect(() => {
    if (debouncedQuery !== search || !debouncedQuery) fetchContracts(debouncedQuery);
  }, [
    debouncedQuery, fetchContractCount, showEditModal,
    isContractUpdated, currentPage, rowsPerPage
  ]);
  
  useEffect(() => {
    setIsContractUpdated(false);
  }, [contracts]);
  
  return (
     <>
       <Grid m="0 0 30px 50px" className="contractSearch">
         <SearchInput
            value={value}
            setValue={onSearchChange}
            onKeyDown={handleKeyPress}
         />
       </Grid>
       <CustomModal open={showModal} onClose={() => setShowModal(false)}>
         <ContractForm
            handleFetchContract={handleFetchContract}
            setShowModal={setShowModal}
            onFinish={fetchContracts}
         />
       </CustomModal>
       <TableComponent
          tableName="Contracts"
          items={contracts}
          columns={columns}
          setShowModal={setShowModal}
          handelEdit={handelEdit}
          setDelUserEmail={setDelContract}
          show={true}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleCountItems}
       />
       <CustomModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
       >
         <ContractForm
            setShowModal={setShowEditModal}
            setFetcher={setFetchContractCount}
            editData={contractData}
            setIsContractUpdated={setIsContractUpdated}
            setError={setError}
            onFinish={fetchContracts}
         />
       </CustomModal>
       <CustomModal open={!!delContract} onClose={() => setDelContract('')}>
         <Box className="container">
           <DeleteModal
              title="contract"
              onClick={handleDeleteContract}
              onCancel={() => setDelContract('')}
           />
         </Box>
       </CustomModal>
       <CustomSnackbar error={error} handleClose={handleClose} />
     </>
  );
}
