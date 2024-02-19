<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { LocalStorageFields } from 'src/utils/enums/LocalStorageFields';
import { localStorageGetValue } from 'src/utils/funcs/localStorageProxy';
import { IRequestType } from 'src/utils/types/IRequestType';
import { capitalize } from 'src/utils/funcs/capitalize';
import { ITableColumn } from 'src/utils/types/ITableColumn';
import { useI18n } from 'vue-i18n';
import { parcelVariants } from 'src/utils/const/ParcelVariants';
import { timestamp } from 'src/utils/funcs/Timestamp';
import EditOrderDialogLayout from 'src/layouts/EditOrderDialogLayout.vue';
const { t } = useI18n();

const columns: ITableColumn[] = [
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
  {
    name: 'actions',
    label: t('actions'),
    align: 'left',
    field: '',
  },
];

const editRow = (row: IRequestType, index: number) => {
  state.editableRow = row;
  state.editableRowIndex = index;
  state.prompt = true;
};

const submit = () => {
  state.rows[state.editableRowIndex] = state.editableRow;
  localStorage.setItem(LocalStorageFields.REQUESTS, JSON.stringify(state.rows));
  state.prompt = false;
  state.promptSubmit = false;
  state.editableRow = {} as IRequestType;
  state.editableRowIndex = -1;
};

const deleteOrder = () => {
  state.rows.splice(state.editableRowIndex, 1);
  localStorage.setItem(LocalStorageFields.REQUESTS, JSON.stringify(state.rows));
  state.prompt = false;
  state.promptSubmit = false;
  state.editableRow = {} as IRequestType;
  state.editableRowIndex = -1;
};

const state = reactive({
  rows: [] as IRequestType[],

  editableRow: {} as IRequestType,
  editableRowIndex: -1,
  prompt: false,
  promptSubmit: false,
});

const getData = () => {
  const result = localStorageGetValue(LocalStorageFields.REQUESTS) || [];

  state.rows = result;
};

onMounted(() => {
  getData();
});
</script>

<template>
  <q-table
    :rows="state.rows"
    :columns="columns"
    hide-bottom
    hide-pagination
    row-key="name"
    :rows-per-page-options="[0]"
    :flat="$q.screen.xl || $q.screen.lg || $q.screen.md"
    :grid="!($q.screen.xl || $q.screen.lg || $q.screen.md)"
  >
    <template v-slot:body-cell-actions="props">
      <td>
        <q-icon
          @click="editRow(props.row, props.rowIndex)"
          name="settings"
          size="sm"
        />
      </td>
    </template>
    <template v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card bordered flat>
          <q-separator />
          <q-list dense>
            <q-item v-for="col in props.cols" :key="col.name">
              <q-item-section>
                <q-item-label>{{ col.label }}:</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="state.prompt" persistent>
    <EditOrderDialogLayout>
      <template #main>
        <q-input
          v-model="state.editableRow.cityTo"
          :label="$t('cityTo')"
          :rules="[(val) => val !== '' || $t('shouldNotBeEmpty')]"
          @update:model-value="state.promptSubmit = true"
        />
        <q-input
          v-model="state.editableRow.cityFrom"
          :label="$t('cityFrom')"
          :rules="[(val) => val !== '' || $t('shouldNotBeEmpty')]"
          @update:model-value="state.promptSubmit = true"
        />
        <q-select
          v-model="state.editableRow.type"
          :label="$t('parcelType')"
          :options="parcelVariants"
          @update:model-value="state.promptSubmit = true"
        />
        <q-input
          v-model="state.editableRow.description"
          :label="$t('desc')"
          :rules="[(val) => val !== '' || $t('shouldNotBeEmpty')]"
          @update:model-value="state.promptSubmit = true"
        />
      </template>
      <template #actions>
        <q-btn flat :label="$t('delete')" @click="deleteOrder" />
        <q-btn flat :label="$t('cancel')" v-close-popup />
        <q-btn
          flat
          :label="$t('submit')"
          @click="submit"
          :disabled="!state.promptSubmit"
        />
      </template>
    </EditOrderDialogLayout>
  </q-dialog>
</template>
