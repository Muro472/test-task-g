<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">{{ $t('edit') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <slot name="main" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>
