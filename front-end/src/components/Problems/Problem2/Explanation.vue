<template>
  <div class="explanation">
    <div id="title">
      <h3>Explanation</h3>
    </div>
    <div class="explanation-body">
      <p>This is a tricky question because we could solve it pretty easily if were allowed
      to construct a new array. The element at the ith position in the final array is at position
      (i%3)*N + i/3 in the original array. So, the code is simply:<p>

      <img src="/images/problem2-description/3.png" width=50% />

      <p>The getIndex function takes an index from the final array, and returns the index of the
      element in the original array that should appear at that position. However, we aren’t allowed
      use extra space, we should instead modify the array in-place. We could use a similar approach
      though, at each iteration we can put the ith element to its final location using the getIndex
      function above and swap elements. The algorithm works as follows, at each iteration (currentIndex)
      we get the index of the item that should appear at that location (swapIndex) by calling the getIndex
      function. The element at swapIndex is the final element to appear at currentIndex. So we swap the
      elements at currentIndex and swapIndex, if swapIndex is greater than or equal to currentIndex. But if swapIndex is less than currentIndex then
      it means that the element at swapIndex was replaced with another element at previous iterations. Now
      it’s somewhere else and we should keep looking for that element. We again call getIndex with swapIndex
       as new input to find the element it was replaced with. If the new swapIndex>=currentIndex, we swap the
       elements as before. Otherwise, we repeat this procedure until swapIndex>=currentIndex, which is we find
       he final element that’s supposed to appear at currentIndex. The code will make everything clear:</p>

      <img src="/images/problem2-description/4.png" width=50% />

      <p>The algorithm is pretty simple and in-place without using extra space. Let’s work through an example to
      clarify, here is the program flow for an array of size 15. Swap index is calculated multiple times for some
      elements until swapIndex>=currentIndex as explained above.</p>

      <img src="/images/problem2-description/5.png" width=50% />

      <p>The time complexity of this algorithm depends on the number of times getIndex function is called.
      It’s not linear because for some indexes the getIndex function is called multiple times, it’s not quadratic
      as well because not for every element the getIndex is called repetitively. We can see both of the cases above.
      So, the complexity is between linear and quadratic, which is sometimes called as super-linear. To be precise,
      the complexity is approximately O(N^1.3) as we can see from the figure below:</p>

      <img src="/images/problem2-description/6.png" width=50% />

      <p>Here is the code to generate the plot, assuming that we changed the function convertArray to also count
      and return the number of calls made to getIndex function:</p>

      <img src="/images/problem2-description/7.png" width=50% />
    </div>
  </div>
</template>

<script>
export default {
  name: "Explanation",
}
</script>

<style scoped>

*{
  box-sizing: box;
}

.explanation {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#title{
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  margin: 20px;
}

.explanation-body {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-right: 40px;
  padding-left: 40px;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
}
</style>
