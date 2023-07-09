<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<header>
  <div class="wrapper">
    <nav>
        <RouterLink to="/">Strona główna</RouterLink>
        <RouterLink to="/dodaj">Dodaj</RouterLink>
    </nav>
  </div>
</header>

<RouterView />
</template>

<style scoped>

header {
  width: 100%;
  height: 5vh;
  display: flex;
  background: rgb(39, 39, 39);
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  height: 100%;
  background: rgb(39, 39, 39);
  gap: 5vw;
  /* padding: 0 200px; */
  
}

a{
  text-decoration: none;
  background: rgb(39, 39, 39);
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  height: 100%;
  padding: 8px 15px;
  border-radius: 5px;
  transition: 0.3s ease;

}

a:hover{
  background: rgb(71, 71, 71);
}



</style>
