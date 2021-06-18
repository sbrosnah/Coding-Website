<template>
<div class="page">
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        <li v-if="itemOneSelected" class="pure-menu-item pure-menu-selected" @click.prevent="toggleItemOne">
            <div class="pure-menu-link"><p>Show Description</p></div>
        </li>
        <li v-else class="pure-menu-item" @click.prevent="toggleItemOne">
            <div class="pure-menu-link"><p>Show Description</p></div>
        </li>

        <li v-if="itemTwoSelected" class="pure-menu-item pure-menu-selected" @click.prevent="toggleItemTwo">
            <div class="pure-menu-link"><p>Show All Submissions</p></div>
        </li>
        <li v-else class="pure-menu-item" @click.prevent="toggleItemTwo">
            <div class="pure-menu-link"><p>Show All Submissions</p></div>
        </li>
        <li v-if="itemThreeSelected" class="pure-menu-item pure-menu-selected" @click.prevent="toggleItemThree">
            <div class="pure-menu-link"><p>Show Your Submissions</p></div>
        </li>
        <li v-else class="pure-menu-item" @click.prevent="toggleItemThree">
            <div class="pure-menu-link"><p>Show Your Submissions</p></div>
        </li>
        <li v-if="itemFourSelected" class="pure-menu-item pure-menu-selected" @click.prevent="toggleItemFour">
            <div class="pure-menu-link"><p>Show Explanation</p></div>
        </li>
        <li v-else class="pure-menu-item" @click.prevent="toggleItemFour">
            <div class="pure-menu-link"><p>Show Explanation</p></div>
        </li>
    </ul>
  </div>
  <div class="problem-name">
    <h2>Convert Array</h2>
  </div>
  <Description v-if="itemOneSelected" />
  <Explanation v-if="itemFourSelected" />
  <AllSubmissions v-if="itemTwoSelected" />
  <YourSubmissions v-if="itemThreeSelected" />
</div>
</template>

<script>
import Description from '@/components/Problems/Problem2/Description.vue';
import Explanation from '@/components/Problems/Problem2/Explanation.vue';
import AllSubmissions from '@/components/Problems/Problem2/AllSubmissions.vue';
import YourSubmissions from '@/components/Problems/Problem2/YourSubmissions.vue';

export default {
  name: 'Problem2',
  components: {
    Description,
    Explanation,
    AllSubmissions,
    YourSubmissions,
  },
  data() {
    return {
      itemOneSelected: true,
      itemTwoSelected: false,
      itemThreeSelected: false,
      itemFourSelected: false,
    }
  },
  methods: {
    toggleItemOne() {
      if(this.itemOneSelected == false) {
        this.itemTwoSelected = false;
        this.itemThreeSelected = false;
        this.itemFourSelected = false;
      }
      this.itemOneSelected = !this.itemOneSelected;
    },
    toggleItemTwo() {
      if(this.itemTwoSelected == false) {
        this.itemOneSelected = false;
        this.itemThreeSelected = false;
        this.itemFourSelected = false;
      }
      this.itemTwoSelected = !this.itemTwoSelected;
    },
    toggleItemThree() {
      if(this.itemThreeSelected == false) {
        this.itemOneSelected = false;
        this.itemTwoSelected = false;
        this.itemFourSelected = false;
      }
      this.itemThreeSelected = !this.itemThreeSelected;
    },
    toggleItemFour() {
      if(this.itemFourSelected == false) {
        this.itemOneSelected = false;
        this.itemTwoSelected = false;
        this.itemThreeSelected = false;
      }
      this.itemFourSelected = !this.itemFourSelected;
    },
  }
}

</script>

<style scoped>

.problem-name {
  display: flex;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
}

.pure-menu-list {
  display: flex;
  background-color: #f8f8f8;
  justify-content: space-around;
  align-items: center;
}

.pure-menu-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 767px) and (min-width: 300px) {
  p {
    font-size: .4em;
  }
}

</style>
