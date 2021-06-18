<template>
  <div id="app">
      <router-view />
      <div class="footer-container">
        <a href='https://github.com/sbrosnah/creativeProject'>Github Link</a>
        <div class="time-spent">
          <p>Time Spent: about 30 hours</p>
        </div>
      </div>
  </div>
</template>

<script>

</script>

<style>
* {
  box-sizing: border-box;
}
.time-spent{
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.edit {
  font-family: 'Roboto', sans-serif;
  background-color: #6495ED;
  color: #fff;
  border: none;
  margin: 5px;
}

.coming-soon {
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
}

.space {
  margin-left: 10px;
}

.page-content {
  display: flex;
  width: 100%;
}

.title-container {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 8em;
  width: 100%;
  color: #fff;
}

.menu {
  width: 100%;
  font-family: 'Roboto', sans-serif !important;
}
.footer-container {
  font-family: 'Roboto', sans-serif;
  display: flex;
  width: 100%;
  background-color: #343a40;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  margin-top: 20px;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}



a:link,
a:visited, footer-container {
  display:block;
  text-decoration: none;
  color: #FFF;
}

a:hover,
a:visited:hover, footer-container{
  color: #0;
}

a:active,
a:visited:active, footer-container{
  color: #0;
}
</style>
