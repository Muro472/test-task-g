<script setup lang="ts">
import { useRouter } from 'vue-router';
import { RouterNames } from 'src/utils/enums/RouterNames';
const router = useRouter();

const createDelivery = () => {
  router.push({ name: RouterNames.CREATE_DELIVERY_PAGE });
};

const createOrder = () => {
  router.push({ name: RouterNames.CREATE_ORDER_PAGE });
};
</script>

<template>
  <div class="select_order_style">
    <div class="select_order_style-main">
      <div class="select_order_style-main-head">
        {{ $t('choseWhatToCreate') }}
      </div>
      <div class="select_order_style-main-body">
        <q-btn
          color="primary"
          size="lg"
          class="select_order_style-button"
          :label="$t('createOrder')"
          @click="createOrder"
        />
        <q-btn
          color="primary"
          size="lg"
          class="select_order_style-button"
          :label="$t('createDelivery')"
          @click="createDelivery"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/css/layouts/select-order-style.scss';
</style>
