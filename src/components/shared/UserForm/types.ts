export interface IFormInput {
  email: string;
  username: string;
  password: string;
  newEmail: string;
  companyName: string;
  role: string;
  ownerId: number
}

export interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
  onFinish: () => void
}
