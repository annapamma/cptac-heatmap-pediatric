<template>
  <div class="logo-container">
   <div class="cptac-logo">
        <img src="@/assets/cptac-logo.png">
    </div>
    <div class="mssm-logo">
        <img src="@/assets/MSSMLogo.png">
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'LogoContainer',
};
</script>

<style scoped>
  .logo-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    /*height: 20%;*/
    margin: auto;
    padding: 5px;
    /*background-color: purple;*/
    justify-content: space-between;

  }
</style>
