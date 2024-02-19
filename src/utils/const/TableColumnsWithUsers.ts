import { capitalize } from 'src/utils/funcs/capitalize';
import { ITableColumn } from 'src/utils/types/ITableColumn';
import { useI18n } from 'vue-i18n';
import { timestamp } from 'src/utils/funcs/Timestamp';
const { t } = useI18n();

export const columns: ITableColumn[] = [
  {
    name: 'type',
    label: t('type'),
    align: 'left',
    field: 'type',
    format: (val) => capitalize(val),
  },
  {
    name: 'dateOfCreation',
    label: t('dateOfCreation'),
    align: 'left',
    field: 'dateOfCreation',
    format: (val) => timestamp(val),
  },
  {
    name: 'user',
    label: t('creator'),
    align: 'left',
    field: 'user',
  },
  {
    name: 'cityFrom',
    label: t('cityFrom'),
    align: 'left',
    field: 'cityFrom',
    format: (val) => capitalize(val),
  },
  {
    name: 'cityTo',
    label: t('cityTo'),
    align: 'left',
    field: 'cityTo',
    format: (val) => capitalize(val),
  },
  {
    name: 'parcelVariant',
    label: t('parcelType'),
    align: 'left',
    field: 'parcelVariant',
    format: (val) => capitalize(val),
  },
  {
    name: 'dateOfDispatch',
    label: t('dateOfDispatch'),
    align: 'left',
    field: 'dateOfDispatch',
    format: (val) => capitalize(val),
  },
  {
    name: 'description',
    label: t('desc'),
    align: 'left',
    field: 'description',
    format: (val) => capitalize(val),
  },
];
