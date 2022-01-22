<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increase">+1</button>
  <h1>x:{{ x }},y:{{ y }}</h1>
</template>

<script lang="ts">
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTracked,
  onUnmounted,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

export default {
  name: "App",
  setup() {
    // const count  = ref(0)
    // const double = computed(() => {
    //   return count.value * 2;
    // })
    // const increase = () => {
    //   count.value++
    // }

    onUpdated(() => {
      console.log("updated");
    });
    onRenderTracked((event) => {
      console.log(event);
    });

    const {x,y} = useMousePosition()

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
    });

    const refData = toRefs(data);
    return {
      ...refData,
      x,
      y,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
