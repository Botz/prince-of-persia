<template>
  <RoomWrapper :room="room">
    <TileView
      v-for="(tile, index) in room.tiles"
      :key="index"
      :tile="tile"
      :index="index"
    />
  </RoomWrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import styled from 'vue-styled-components';
import TileView from './TileView.vue';
import { Room } from '../models';
import { Position } from '../models/types';

const roomProps = {
  room: Object,
};

const RoomWrapper = styled('div', roomProps)`
  position: absolute;
  width: 348px;
  height: 205px;
  background-color: #000;
  left: ${(props: { room: Position }) => props.room.x * 302}px;
  top: ${(props: { room: Position }) => props.room.y * 189}px;
`;

const RoomViewProps = Vue.extend({
  props: {
    room: Room,
  },
});

@Component({
  components: {
    RoomWrapper,
    TileView,
  },
})
export default class RoomView extends RoomViewProps {}
</script>
