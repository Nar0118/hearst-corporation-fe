import { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomModal from "../../shared/CustomModal";
import { API } from "../../../services/axios";
import DeleteModal from "../../shared/deleteModal";
import RevenueForm from "../RevenueForm";
import TableComponent from "../../TableComponentUserDashboard";
import { columns } from "./columns";
import SearchInput from "../../shared/searchInput";

export default function RevenueTable(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [revenueData, setRevenueData] = useState<Record<string, any>>();
  const [deleteRevenue, setDeleteRevenue] = useState<string>("");
  const [revenues, setRevenues] = useState(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchRevenues = async () => {
    setRevenues(null)
    try {
      const response = await API.get("/revenue", {
        params: { pageNumber: currentPage, limit: rowsPerPage },
      });
      const { revenues, totalPages } = response.data;
      setTotalPages(totalPages);
      setRevenues(revenues);
    } catch (err) { }
  };

  useEffect(() => {
    fetchRevenues();
  }, [currentPage, rowsPerPage]);

  const handelEdit = (user: any): void => {
    setShowEditModal(true);
    setRevenueData(user);
  };

  const handleCountItems = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  }

  const handleDeleteRevenue = useCallback(async () => {
    if (deleteRevenue) {
      await API.delete(`/revenue/${deleteRevenue}`, {
        data: { id: deleteRevenue },
      });
      fetchRevenues()
      setDeleteRevenue("");
      
    }
  }, [deleteRevenue]);

  return (
    <>
      <Grid m="0 0 30px 50px">
        {/* <SearchInput value={value} setValue={onSearchChange} /> */}
      </Grid>
      <CustomModal open={showModal} onClose={() => setShowModal(false)}>
        <RevenueForm
          setShowModal={setShowModal}
          onFinish={fetchRevenues}
        />
      </CustomModal>
      <TableComponent
        tableName="Revenue"
        items={revenues}
        columns={columns}
        rowsNumber={10}
        setShowModal={setShowModal}
        handelEdit={handelEdit}
        setDelUserEmail={setDeleteRevenue}
        show={true}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={handleCountItems}
      />
      {
        <CustomModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <RevenueForm
            setShowModal={setShowEditModal}
            editData={revenueData}
            onFinish={fetchRevenues}
          />
        </CustomModal>
      }
      {
        <CustomModal
          open={!!deleteRevenue}
          onClose={() => setDeleteRevenue("")}
        >
          <Box className="container">
            <DeleteModal
              title="revenue"
              onClick={handleDeleteRevenue}
              onCancel={() => setDeleteRevenue("")}
            />
          </Box>
        </CustomModal>
      }
    </>
  );
}
