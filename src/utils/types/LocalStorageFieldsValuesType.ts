import { LocalStorageFields } from 'src/utils/enums/LocalStorageFields';

import { IRequestType } from 'src/utils/types/IRequestType';

export interface LocalStorageFieldsValuesType {
  [LocalStorageFields.REQUESTS]: IRequestType[];
}
