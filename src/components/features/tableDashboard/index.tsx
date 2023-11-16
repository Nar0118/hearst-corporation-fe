import { useEffect, useState } from "react";
import { columns } from "./values";
import TableComponent from "../../TableComponentUserDashboard";

import "./index.css";

function TableDashboard({ items }: any) {
  const [selectedPages, setSelectedPages] = useState<number>(1);
  const [countPages, setCountPages] = useState<number>(10);
  const [showItems, setShowItems] = useState(items);

  useEffect(() => {
    const arr = [...items];
    const changedData = arr.slice(
      (selectedPages - 1) * countPages,
      (selectedPages - 1) * countPages + countPages
    );
    setShowItems(changedData);
  }, [countPages, selectedPages]);

  return (
    <TableComponent
      items={showItems}
      columns={columns}
      currentPage={selectedPages}
      totalPages={Math.ceil(items.length / countPages)}
      setCurrentPage={setSelectedPages}
      rowsPerPage={countPages}
      setRowsPerPage={(val) => {
        setSelectedPages(1);
        setCountPages(val);
      }}
      show={false}
    />
  );
}

export default TableDashboard;
