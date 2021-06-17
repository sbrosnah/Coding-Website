<template>
  <div class="description">
    <div id="title">
      <h3>Description</h3>
    </div>
    <div class="description-body">
      <p> Given an array:</p>
      <img src="/images/problem2-description/1.png" width=50% />
      <p>convert it to:</p>
      <img src="/images/problem2-description/2.png" width=50% />
      <p>in-place using constant extra space.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description",
}
</script>

<style scoped>

*{
  box-sizing: box;
}

.description {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#title{
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  margin: 20px;
}

.description-body {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-right: 40px;
  padding-left: 40px;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
}
</style>
