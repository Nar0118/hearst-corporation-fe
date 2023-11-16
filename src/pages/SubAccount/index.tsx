import { useCallback, useEffect, useState } from 'react';
import { API } from '../../services/axios';
import TableComponent from '../../components/TableComponentUserDashboard';
import { columns } from './columns';
import CustomModal from '../../components/shared/CustomModal';
import { Box } from '@mui/material';
import DeleteModal from '../../components/shared/deleteModal';
import SubAccountForm from '../../components/shared/SubAccountForm';

import './index.css'

const SubAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState<any[] | null>(null);
  const [subAccountDate, setSubAccountData] = useState<any[] | null>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [delUserID, setDelUserID] = useState<string>('');

  const fetchAccount = async () => {
    setSubAccountData(null)
    try {
      const response = await API.get('/subaccount', {
        params: { pageNumber: currentPage, limit: rowsPerPage }
      })
      const { users, totalPages } = response.data;
      setSubAccountData(users);
      setTotalPages(totalPages);
    } catch (err: any) {
      console.log(err?.response?.data);
    }
  };

  const handelEdit = (user: any): void => {
    setShowEditModal(true);
    setUserData(user);
  };

  const handleCountItems = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAccount();
  }, [showEditModal, currentPage, rowsPerPage]);

  const handleDeleteUser = useCallback(async () => {
    if (delUserID) {
      await API.delete(`/users/${delUserID}/subaccount`, {
        data: { id: delUserID }
      });
      fetchAccount();
      setDelUserID('');
    }
  }, [delUserID]);

  const info = {
    ownerID: subAccountDate && subAccountDate[0]?.ownerId,
    componyName: subAccountDate && subAccountDate[0]?.companyName
  }

  return (
    <div className='mainWrapper'>
      <CustomModal open={showModal} onClose={() => setShowModal(false)}>
        <SubAccountForm setShowModal={setShowModal}
          onFinish={fetchAccount}
        />
      </CustomModal>
      <TableComponent
        tableName="Sub Account"
        items={subAccountDate}
        columns={columns}
        rowsNumber={10}
        setShowModal={setShowModal}
        handelEdit={handelEdit}
        show={true}
        setCurrentPage={setCurrentPage}
        setDelUserEmail={setDelUserID}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={handleCountItems}
      />
      <CustomModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}>
        <SubAccountForm
          setShowModal={setShowEditModal}
          editData={userData}
          onFinish={fetchAccount}
        />
      </CustomModal>
      <CustomModal open={!!delUserID} onClose={() => setDelUserID('')}>
        <Box className="container">
          <DeleteModal
            title="subAccount"
            onClick={handleDeleteUser}
            onCancel={() => setDelUserID('')}
          />
        </Box>
      </CustomModal>
    </div>
  );
};

export default SubAccount;