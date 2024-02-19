<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouterNames } from 'src/utils/enums/RouterNames';
import {
  localStorageSetValue,
  localStorageGetValue,
} from 'src/utils/funcs/localStorageProxy';
import CreateOrderLayout from 'src/layouts/CreateOrderLayout.vue';
import { LocalStorageFields } from 'src/utils/enums/LocalStorageFields';
import { requestTypes } from 'src/utils/const/RequestTypes';
import { ParcelVariantsType } from 'src/utils/types/ParcelVariantsType';
import { parcelVariants } from 'src/utils/const/ParcelVariants';
import { IRequestType } from 'src/utils/types/IRequestType';
import { capitalize } from 'src/utils/funcs/capitalize';
import { ITableColumn } from 'src/utils/types/ITableColumn';
import { useI18n } from 'vue-i18n';
import { timestamp } from 'src/utils/funcs/Timestamp';

const { t } = useI18n();
const router = useRouter();

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
];

const state = reactive({
  page: null as RouterNames | null,
  cityTo: '',
  cityFrom: '',
  type: '' as ParcelVariantsType,
  date: '',
  desc: '',
  header: '',
  user: '',

  alert: false,
  alertText: '',

  requests: [] as IRequestType[],
  requestsLoaded: false,

  matches: [] as IRequestType[],
});

const submit = () => {
  const allRequests = localStorageGetValue(LocalStorageFields.REQUESTS) || [];
  const requestType =
    state.page === RouterNames.CREATE_DELIVERY_PAGE
      ? requestTypes[0]
      : requestTypes[1];

  const dateOfCreation = new Date().getTime();

  allRequests.unshift({
    cityTo: state.cityTo,
    cityFrom: state.cityFrom,
    type: requestType,
    dateOfDispatch: state.date,
    description: state.desc,
    parcelVariant: state.type,
    dateOfCreation: dateOfCreation,
    user: state.user,
  });

  localStorageSetValue(LocalStorageFields.REQUESTS, allRequests);
  state.alert = true;
  state.alertText =
    state.page === RouterNames.CREATE_DELIVERY_PAGE
      ? t('deliverySuccess')
      : t('orderSuccess');
};

const findMatches = () => {
  if (!state.requestsLoaded) {
    state.requests = localStorageGetValue(LocalStorageFields.REQUESTS) || [];
    state.requestsLoaded = true;
  }
  console.log(state.requests);

  state.matches = state.requests.filter((el: IRequestType) => {
    if (state.cityFrom && el.cityFrom === state.cityFrom) return true;
    if (state.cityTo && el.cityTo === state.cityTo) return true;

    //the delivery date of the delivery request no later than that stated in the order request
    if (state.page === RouterNames.CREATE_ORDER_PAGE) {
      if (state.date && new Date(el.dateOfDispatch) < new Date(state.date))
        return true;
    }
    return false;
  });
  console.log(state.matches);
};

const getData = () => {
  state.page = router.currentRoute.value.name as RouterNames;
  state.user = router.currentRoute.value.params.user as string;
  state.header =
    state.page === RouterNames.CREATE_DELIVERY_PAGE
      ? t('createDelivery')
      : t('createOrder');
};

onMounted(() => {
  getData();
});
</script>

<template>
  <CreateOrderLayout>
    <template #header>
      {{ state.header }}
    </template>

    <template #cityTo>
      <q-input
        v-model="state.cityTo"
        debounce="500"
        :label="$t('cityTo')"
        @update:modelValue="findMatches"
      />
    </template>

    <template #cityFrom>
      <q-input
        v-model="state.cityFrom"
        debounce="500"
        :label="$t('cityFrom')"
        @update:modelValue="findMatches"
      />
    </template>

    <template #type>
      <q-select
        v-model="state.type"
        :label="$t('parcelType')"
        :options="parcelVariants"
        @update:modelValue="findMatches"
      />
    </template>

    <template #date>
      <q-date
        debounce="500"
        :title="state.date ? undefined : $t('dateOfDispatch')"
        v-model="state.date"
        @update:modelValue="findMatches"
      />
    </template>

    <template #desc>
      <q-input v-model="state.desc" :label="$t('desc')" />
    </template>

    <template #submit>
      <q-btn
        style="width: 100%"
        @click="submit"
        :label="$t('submit')"
        color="primary"
        class="q-mt-md"
      />
    </template>
    <template #matches>
      <q-table
        :rows="state.matches"
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
  </CreateOrderLayout>

  <q-dialog v-model="state.alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('success') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ state.alertText }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
