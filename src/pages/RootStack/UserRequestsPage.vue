<script setup lang="ts">
////work pls
import { reactive, onMounted } from 'vue';
import { ITableColumn } from 'src/utils/types/ITableColumn';
import { LocalStorageFields } from 'src/utils/enums/LocalStorageFields';
import { localStorageGetValue } from 'src/utils/funcs/localStorageProxy';
import { IRequestType } from 'src/utils/types/IRequestType';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { capitalize } from 'src/utils/funcs/capitalize';
import { timestamp } from 'src/utils/funcs/Timestamp';

const { t } = useI18n();
const router = useRouter();
const state = reactive({
  rows: [] as IRequestType[],
});

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

const getData = () => {
  const result = localStorageGetValue(LocalStorageFields.REQUESTS);

  if (result) {
    state.rows = result.filter(
      (el: IRequestType) => el.user === router.currentRoute.value.params.user
    );
  }
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
</template>
