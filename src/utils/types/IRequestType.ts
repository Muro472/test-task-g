import { ParcelVariantsType } from 'src/utils/types/ParcelVariantsType';
import { RequestTypesType } from 'src/utils/types/RequestTypesType';

export interface IRequestType {
  cityFrom: string;
  cityTo: string;
  parcelVariant: ParcelVariantsType;
  dateOfDispatch: string;
  description: string;
  type: RequestTypesType;
  dateOfCreation: number;
  user: string;
}
