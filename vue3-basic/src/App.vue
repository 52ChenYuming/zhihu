<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increase">+1</button>
  <h1 v-if="loading">loading!...</h1>
  <img v-if="loaded" :src="result.message" />
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
  watch,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult{
  id:string;
  url:string;
  width:number;
  height:number;
}
export default {
  name: "App",
  setup() {
    onUpdated(() => {
      console.log("updated");
    });
    onRenderTracked((event) => {
      console.log(event);
    });

    const { x, y } = useMousePosition();
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://dog.ceo/api/breeds/image/random"
    );
    watch(result, () => {
      console.log(result.value);
      if (result.value) {
        console.log("value", result.value);
      }
    });
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
      result,
      loading,
      loaded,
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
