export interface ColumnsType {
  id: string;
  subId?: string;
  label: string;
  minWidth: number;
  align?: string;
  format?: (value: number) => string;
  color?: string;
}

export interface PropsTypes {
  tableName?: string;
  items: Record<string, any> | null;
  columns: ColumnsType[];
  rowsNumber?: number;
  setShowModal?: (value: boolean) => void | any;
  handelEdit?: (value: any) => void;
  setDelUserEmail?: (value: string) => void;
  show: boolean;
  totalPages?: number;
  currentPage?: number;
  setCurrentPage?: (value: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (value: number) => void;
}
