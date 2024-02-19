<script setup lang="ts">
import { RouterNames } from 'src/utils/enums/RouterNames';
import { useRouter } from 'vue-router';
import { reactive, watchEffect } from 'vue';
const router = useRouter();

const state = reactive({
  createRequest: true,
});

const createRequest = () => {
  router.push({ name: RouterNames.CREATE_PAGE });
};

watchEffect(() => {
  state.createRequest =
    router.currentRoute.value.name === RouterNames.USER_REQUESTS_PAGE;
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="state.createRequest" @click="createRequest">
          {{ $t('createRequest') }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <slot name="page" />

        <!-- place QPageScroller at end of page -->
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
