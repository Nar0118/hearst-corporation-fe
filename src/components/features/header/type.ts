import { MachineTypes } from '../../../pages/Main/types';
import { IFormInput } from '../../shared/ContractForm/types';

export interface HeaderProps {
  value: Date[],
  setValue: (val: Date[]) => void
  machineTypes: MachineTypes[],
  allContracts: IFormInput[],
  setFilter: (contract: string[], machine: string[], val?: Date[]) => Promise<void | null>
}