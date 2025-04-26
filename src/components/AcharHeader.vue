<template>
  <header>
    <div class="menu">
      <router-link to="/history">
        {{$t('header.show_addresses')}}
      </router-link>
      <router-link to="/">
        {{$t('header.submit_address')}}
      </router-link>
    </div>
    <div>
      <img src="/public/images/logo.svg"/>
    </div>
  </header>
</template>

<script>
export default {
  name: "AcharHeader"
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/acharHeader.scss";
</style>