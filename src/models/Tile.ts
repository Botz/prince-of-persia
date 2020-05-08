import dungeon from '../../public/gfx/dungeon.json';
import {
  TileJson,
  DungeonJson,
  Position,
  TileDefinition,
} from './types';

export default class Tile {
  static WIDTH = 30;

  static HEIGHT = 63;

  x: number;

  y: number;

  element: number;

  modifier: number;

  src: string;

  size: {
    width: number;
    height: number;
  };

  tile: TileDefinition;

  tileFG: TileDefinition;

  modifiedTile: TileDefinition

  position: Position;

  constructor(tileJson: TileJson, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.element = tileJson.element;
    this.modifier = tileJson.modifier;
    this.src = './gfx/dungeon.png';
    const framesJson: DungeonJson = dungeon.frames;
    this.tile = framesJson[`dungeon_${this.element}`];
    this.modifiedTile = framesJson[`dungeon_${this.element}_${this.modifier}`];
    this.tileFG = framesJson[`dungeon_${this.element}_fg`];

    this.size = {
      width: this.tile.frame.w,
      height: this.tile.frame.h,
    };

    this.position = {
      x: x * Tile.WIDTH,
      y: y * Tile.HEIGHT,
    };
  }

  setFgSprite(frameName: string, roomId: number) {
    const tileNumber = this.y * 10 + this.x + roomId;
    const framesJson: DungeonJson = dungeon.frames;
    this.tileFG = framesJson[`${frameName}_${tileNumber}`];

    if (frameName.charAt(2) === 'S') {
      this.tile = framesJson[`dungeon_wall_${this.modifier}`];
    }
  }

  get fgSpritePosition(): Position {
    return {
      x: this.tileFG.frame.x,
      y: this.tileFG.frame.y,
    };
  }

  get spritePosition(): Position {
    return {
      x: this.tile.frame.x,
      y: this.tile.frame.y,
    };
  }

  get modifiedSpritePosition(): Position {
    return {
      x: this.modifiedTile.frame.x,
      y: this.modifiedTile.frame.y,
    };
  }

  get hasModifiedTile(): boolean {
    return !!this.modifiedTile;
  }

  get hasFgTile(): boolean {
    return !!this.tileFG;
  }
}
