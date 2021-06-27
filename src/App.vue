<template>
  <NavBar ref="navbar" />
  <router-view
    @signinfirst="$refs['navbar'].launchSignInModal()"
    @golive="$refs['navbar'].goLiveButton()"
    @getuserinfo="$refs['navbar'].getUserInfo()"
  />
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar,
  },
}
</script>

<style></style>
