<template>
  <div>
    <ul class="p-list" v-for="n in 5">
      <li class="p-cell">
        <div class="logo">
          <img src="../../assets/images/shoppingCart-01.jpg"/>
        </div>
        <div class="info">
          <h5>名字</h5>
          <span>123112</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .p-list {
    display: block;
    background-color: #fff;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
  }
  .logo {
    flex: 1;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
  }
  .info h5 {
    margin: 0.1rem 0;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
</style>
