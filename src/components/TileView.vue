<template>
  <TileWrapper :position="tile.position">
    <TileImage
      :src="tile.src"
      :index="index"
      :spritePosition="tile.spritePosition"
    />
    <TileImage
      v-if="tile.hasModifiedTile"
      :src="tile.src"
      :index="index"
      :spritePosition="tile.modifiedSpritePosition"
    />
    <TileImage
      v-if="tile.hasFgTile"
      :src="tile.src"
      :index="index"
      :spritePosition="tile.fgSpritePosition"
    />
  </TileWrapper>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import styled from 'vue-styled-components';
import { Tile } from '../models';
import { Position } from '../models/types';


const tileWrapperProps = {
  position: Object,
};

const TileWrapper = styled('div', tileWrapperProps)`
  position: absolute;
  width: 60px;
  height: 79px;
  left: ${(props: { position: Position }) => props.position.x}px;
  top: ${(props: { position: Position }) => props.position.y}px;
`;

const tileProps = {
  spritePosition: Object,
  src: String,
  index: Number,
};

const TileImage = styled('div', tileProps)`
  position: absolute;
  background: url(${(props: { src: string }) => props.src}) -${(props: { spritePosition: Position }) => props.spritePosition.x}px -${(props: { spritePosition: Position }) => props.spritePosition.y}px;
  width: 60px;
  height: 79px;
  z-index: ${(props: { index: number }) => 4 - Math.floor(props.index / 10)}
`;

const TileViewProps = Vue.extend({
  props: {
    tile: Tile,
    index: Number,
  },
});

@Component({
  components: {
    TileWrapper,
    TileImage,
  },
})
export default class TileView extends TileViewProps {}
</script>
