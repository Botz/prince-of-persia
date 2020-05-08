<template>
  <app>
    <Level />
  </app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import styled from 'vue-styled-components';
import LevelView from './components/LevelView.vue';

const app = styled.div`
  display: flex;
  height: 100%;
  overflow: scroll;
`;

@Component({
  components: {
    Level: LevelView,
    app,
  },
})
export default class App extends Vue {
}
</script>
