import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';
import UsersTable from '../UsersTable';
import ContractsTable from '../ContractTable';
import RevenueTable from '../RevenueTable';
import SearchInput from '../../shared/searchInput';

import './index.css';

export default function AdminDashboard() {
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  
  const onSearchChange = (value: string) => {
    setValue(value);
  };
  
  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = (event.target as HTMLInputElement).value.trim();
      setSearch(inputValue);
    }
  };
  
  return (
     <div className="adminDashboard">
       <div className="headSection">
         <h1 className="title">Admin Dashboard</h1>
         <SearchInput value={value} setValue={onSearchChange} onKeyDown={handleKeyPress} />
       </div>
       <div className="table">
         <Container maxWidth="xl">
           <UsersTable searchWithKeyPress={search} search={value} />
           <ContractsTable />
           <RevenueTable />
         </Container>
       </div>
       <Outlet />
     </div>
  );
}
