<template>
  <div>
    <v-stage ref="stage" :config="stageSize">
      <v-layer :config="{
        width: 400,
        height: 400
      }">
        
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const width = window.innerWidth;
const height = window.innerHeight;
const stageSize = reactive({
  width: width,
  height: height
})

let vm = {};

</script>