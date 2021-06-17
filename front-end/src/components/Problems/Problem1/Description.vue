<template>
  <div class="description">
    <div id="title">
      <h3>Description</h3>
    </div>
    <div class="description-body">
      <p>  This question can be solved efficiently with a very clever trick. There
      is an array of non-negative integers. A second array is formed by shuffling
      the elements of the first array and deleting a random element. Given these two arrays,
      find which element is missing in the second array. Here is an example input, the first array is
      shuffled and the number 5 is removed to construct the second array.</p>
      <img src="/images/problem1-description/twoArrays.png" width=50% />
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
