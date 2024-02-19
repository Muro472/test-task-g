<template>
  <div class="create_order_layout">
    <div class="create_order_layout-main">
      <div class="create_order_layout-left">
        <div class="create_order_layout-header_text">
          <slot name="header" />
        </div>
        <slot name="cityTo" />
        <slot name="cityFrom" />
        <slot name="type" />
        <slot name="desc" />
        <div class="create_order_layout-date">
          <slot name="date" />
        </div>
        <div>
          <slot name="submit" />
        </div>
      </div>
      <div class="create_order_layout-right">
        <div class="create_order_layout-header_text">{{ $t('matches') }}</div>
        <div class="create_order_layout-right-table">
          <slot name="matches" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/layouts/create-order-layout.scss';
</style>
