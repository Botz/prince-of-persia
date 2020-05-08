import Tile from './Tile';
import { RoomJson, TileJson } from './types';

export default class Room {
  id: number;

  tiles: Tile[];

  x: number;

  y: number;

  left?: Room;

  right?: Room;

  top?: Room;

  bottom?: Room;

  constructor(x: number, y: number, json?: RoomJson) {
    this.id = json?.id ?? -1;
    this.x = x;
    this.y = y;
    this.tiles = json?.tile?.map((tile: TileJson, index: number) => {
      const tileX = index % 10;
      const tileY = Math.floor(index / 10);
      return new Tile(tile, tileX, tileY);
    }) ?? [];
  }

  setNeighbours(left?: Room, right?: Room, top?: Room, bottom?: Room) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  getTileOnPosition(x: number, y: number): number {
    if (x < 0) return this.left?.getTileOnPosition(9, y) ?? 20;
    if (x > 9) return this.right?.getTileOnPosition(0, y) ?? 20;
    return this.tiles.find((tile) => tile.x === x && tile.y === y)?.element ?? 20;
  }

  buildWalls() {
    this.tiles.filter((tile) => tile.element === 20).forEach((tile) => {
      const leftTile = this.getTileOnPosition(tile.x - 1, tile.y);
      const rightTile = this.getTileOnPosition(tile.x + 1, tile.y);
      let wallType = leftTile === 20 ? 'W' : 'S';
      wallType += 'W';
      wallType += rightTile === 20 ? 'W' : 'S';
      tile.setFgSprite(wallType, this.id);
    });
  }

  static empty() {
    return new Room(0, 0);
  }
}
