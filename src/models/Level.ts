import level from '@/assets/maps/level1.json';
import Room from './Room';
import { LevelJson, RoomJson } from './types';

export default class Level {
  rooms: Room[];

  width: number;

  height: number;

  name: string;

  currentRoom: Room;

  constructor(levelJson: LevelJson) {
    this.width = levelJson.size.width;
    this.height = levelJson.size.height;
    this.name = levelJson.name;
    this.rooms = levelJson.room
      .map((roomJson: RoomJson, index: number) => {
        const x = index % this.width;
        const y = Math.floor(index / this.width);
        return new Room(x, y, roomJson);
      });
    this.currentRoom = this.rooms.find((room) => room.id === levelJson.prince.room) ?? Room.empty();

    this.rooms.forEach((room: Room) => {
      const left = this.getRoomAtPosition(room.x - 1, room.y);
      const right = this.getRoomAtPosition(room.x + 1, room.y);
      const top = this.getRoomAtPosition(room.x, room.y - 1);
      const bottom = this.getRoomAtPosition(room.x, room.y + 1);
      room.setNeighbours(left, right, top, bottom);
      room.buildWalls();
    });
  }

  static createLevel(): Level {
    const json: LevelJson = level;
    return new Level(json);
  }

  getRoomAtPosition(x: number, y: number): Room | undefined {
    return this.rooms.find((room) => room.x === x && room.y === y);
  }
}
