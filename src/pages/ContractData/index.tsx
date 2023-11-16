import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { API } from "../../services/axios";
import CustomModal from "../../components/shared/CustomModal";
import MachineForm from "../../components/shared/MachineForm";
import DeleteModal from "../../components/shared/deleteModal";
import TableComponent from "../../components/TableComponentUserDashboard";
import { columns } from "./machines";

import "./index.css";

const ContractData = (): JSX.Element => {
  const { id } = useParams();
  const [contract, setContract] = useState<Record<string, any>>([]);
  const [machines, setMachines] = useState<Record<string, any> | null>(null);
  const [delMachine, setDelMachine] = useState<boolean>(false);
  const [machineData, setMachineData] = useState<Record<string, any>>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isMachineAdded, setMachineAdded] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const { data } = await API.get(`/contract/${id}`);
        setContract(data);
      } catch (err) {}
    };

    fetchContracts();
  }, [id]);

  const fetchMachines = async () => {
    setMachines(null)
    try {
      const { data } = await API.get(`/machines/${id}`, {
        params: { pageNumber: currentPage, limit: rowsPerPage },
      });
      const { machines, totalPages } = data;
      setMachines(machines);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, [id, rowsPerPage, currentPage]);

  const handleDeleteMachine = async (machineId: string) => {
    setDelMachine(true);
    setMachineData({ machineId });
  };

  const removeMachine = async () => {
    await API.delete(`/machines/${machineData?.machineId}`);
    fetchMachines()
    setDelMachine(false);
  };

  const handelEdit = (machine: any) => {
    setShowEditModal(true);
    setMachineData(machine);
  };

  const handleCountItems = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  }
  const renderField = (label: string, value: string | number): JSX.Element => {
    return (
      <div
        style={{
          display: "flex",
          columnGap: 20,
        }}
      >
        <div
          className="titles"
          style={{
            minWidth: 250,
          }}
        >
          {label}
        </div>
        <div className="values">{value}</div>
      </div>
    );
  };
  const fieldsStyle = {
    display: "flex",
    alignItems: "center",
    columnGap: 300,
    padding: "20px",
  };

  const fieldsStyleGreen = {
    display: "flex",
    columnGap: 300,
    height: 50,
    alignItems: "center",
    background: "#f7faf8",
    padding: "20px",
  };

  return (
    <>
      {
        <CustomModal
          open={isMachineAdded}
          onClose={() => setMachineAdded(false)}
        >
          <MachineForm setShowModal={setMachineAdded}
              onFinish={fetchMachines}
              />
        </CustomModal>
      }
      <Box className="ContractData">
        <div className="contact">
          <div
            className="infoContract"
            style={{
              maxWidth: 1000,
              borderRadius: 10,
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={fieldsStyle}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Customer Email", contract[0]?.customerEmail)}
              </div>
              <div>
                {renderField("Machine Supplier", contract[0]?.machineSupplier)}
              </div>
            </div>
            <div style={fieldsStyleGreen}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Hearst Up Front", contract[0]?.hearstUpfront)}
              </div>
              <div> {renderField("Machine TH", contract[0]?.machineTH)}</div>
            </div>
            <div style={fieldsStyle}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Electricity Cost", contract[0]?.electricityCost)}
              </div>
              <div>
                {renderField("Machine Type", contract[0]?.machineType)}
              </div>
            </div>
            <div style={fieldsStyleGreen}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Hosting Company", contract[0]?.hostingCompany)}
              </div>
              <div>
                {renderField("Machine Watt", contract[0]?.machineWatt)}
              </div>
            </div>
            <div style={fieldsStyle}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Hosting Cost", contract[0]?.hostingCost)}
              </div>
              <div> {renderField("Miners Cost", contract[0]?.minersCost)}</div>
            </div>
            <div style={fieldsStyleGreen}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Location", contract[0]?.location)}
              </div>
              <div>
                {renderField("Total Investment", contract[0]?.totalInvestment)}
              </div>
            </div>
            <div style={fieldsStyle}>
              <div
                style={{
                  maxWidth: 200,
                }}
              >
                {renderField("Machine Number", contract[0]?.machineNumber)}
              </div>
              <div>
                {renderField(
                  "Year To Capital Constitution",
                  contract[0]?.yearToCapitalConstitution
                )}
              </div>
            </div>
          </div>
        </div>
        <TableComponent
          tableName="Machines"
          items={machines}
          columns={columns}
          rowsNumber={10}
          setShowModal={setMachineAdded}
          handelEdit={handelEdit}
          setDelUserEmail={(event) => handleDeleteMachine(event)}
          totalPages={totalPages}
          show={true}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={handleCountItems}
          currentPage={currentPage}
        />
        {
          <CustomModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
          >
            <MachineForm
              setShowModal={setShowEditModal}
              editData={machineData}
              onFinish={fetchMachines}
            />
          </CustomModal>
        }
        {
          <CustomModal open={delMachine} onClose={() => setDelMachine(false)}>
            <Box className="container">
              <DeleteModal
                title="machine"
                onClick={removeMachine}
                onCancel={() => setDelMachine(false)}
              />
            </Box>
          </CustomModal>
        }
      </Box>
    </>
  );
};

export default ContractData;
