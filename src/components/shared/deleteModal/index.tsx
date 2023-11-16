import DeleteIcon from "../../../../src/assets/images/deleteIcon.svg";
import Button from "../../shared/Button";
import { DeleteModalProps } from "./types";

import "./index.css";

export default function DeleteModal({
  title,
  onClick,
  onCancel,
}: DeleteModalProps): JSX.Element {
  return (
    <div className="deleteModal">
      <img className="deleteIcon" src={DeleteIcon} alt="logo" />
      <h1>Are you sure?</h1>
      <p>Do you really want to delete this {title}?</p>
      <p>This process can not be undone</p>
      <div className="buttonSection">
        <Button text="Cancel" handleClick={onCancel} />
        <Button text="Delete" handleClick={onClick} />
      </div>
    </div>
  );
}
