export type IFormInput = {
  id?: string;
  weeklyAverage: number;
  dailyAverage: number;
  date: string;
};

export type IProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
  onFinish: () => void;
};
