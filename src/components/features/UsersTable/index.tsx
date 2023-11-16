import { useCallback, useEffect, useState } from 'react';
import UserForm from '../../shared/UserForm';
import CustomModal from '../../shared/CustomModal';
import { API } from '../../../services/axios';
import { Box } from '@mui/material';
import DeleteModal from '../../shared/deleteModal';
import TableComponent from '../../TableComponentUserDashboard';
import { columns } from './columns';
import { UsersTableProps } from './type';
import { UserType } from '../AdminDashboard/types';
import { useDebounce } from '../../../hooks/useDebounce';

import './index.css';

export default function UsersTable({ searchWithKeyPress, search }: UsersTableProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [userData, setUserData] = useState<any[]>([]);
  const [delUserEmail, setDelUserEmail] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const debouncedQuery = useDebounce(search, 500);
  
  const fetchUsers = async (query?: string) => {
    setUsers(null);
    try {
      const response = await API.get('/users', {
        params: {
          pageNumber: currentPage,
          limit: rowsPerPage,
          q: query
        }
      });
      const { users, totalPages } = response.data;
      setTotalPages(totalPages);
      setUsers(users);
    } catch (err: any) {
      console.error(err);
    }
  };
  
  const handelEdit = (user: any): void => {
    setShowEditModal(true);
    setUserData(user);
  };
  
  const handleDeleteUser = useCallback(async () => {
    if (delUserEmail) {
      await API.delete(`/users/${delUserEmail}`, {
        data: { id: delUserEmail }
      });
      fetchUsers();
      setDelUserEmail('');
    }
  }, [delUserEmail]);
  
  const handleCountItems = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  };
  
  useEffect(() => {
    if (debouncedQuery !== searchWithKeyPress || !debouncedQuery) fetchUsers(debouncedQuery);
  }, [currentPage, debouncedQuery, rowsPerPage]);
  
  useEffect(() => {
    if (searchWithKeyPress) fetchUsers(searchWithKeyPress);
  }, [searchWithKeyPress]);
  
  return (
     <>
       <CustomModal open={showModal} onClose={() => setShowModal(false)}>
         <UserForm setShowModal={setShowModal}
                   onFinish={fetchUsers}
         />
       </CustomModal>
       <TableComponent
          tableName="Users"
          items={users}
          columns={columns}
          rowsNumber={10}
          setShowModal={setShowModal}
          handelEdit={handelEdit}
          setDelUserEmail={setDelUserEmail}
          show={true}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleCountItems}
       />
       <CustomModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
       >
         <UserForm
            setShowModal={setShowEditModal}
            editData={userData}
            onFinish={fetchUsers}
         />
       </CustomModal>
       <CustomModal open={!!delUserEmail} onClose={() => setDelUserEmail('')}>
         <Box className="container">
           <DeleteModal
              title="user"
              onClick={handleDeleteUser}
              onCancel={() => setDelUserEmail('')}
           />
         </Box>
       </CustomModal>
     </>
  );
}
