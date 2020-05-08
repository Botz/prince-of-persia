<template>
  <LevelWrapper :width="level.width" :height="level.height">
    <RoomView
      :room="level.currentRoom"
    />
  </LevelWrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import styled from 'vue-styled-components';
import RoomView from './RoomView.vue';
import { Level } from '../models';


const levelProps = {
  width: Number,
  height: Number,
};

const LevelWrapper = styled('div', levelProps)`
  position: relative;
  width: ${(props: { width: number }) => props.width * 348}px;
  height: ${(props: { height: number }) => props.height * 205}px;
  margin: auto;
`;

@Component({
  components: {
    LevelWrapper,
    RoomView,
  },
})
export default class LevelView extends Vue {
  level: Level = Level.createLevel();
}
</script>
