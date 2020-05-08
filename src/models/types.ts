export interface DungeonJson {
  [key: string]: TileDefinition;
}

export interface TileJson {
  element: number;
  modifier: number;
}

export interface PrinceJson {
  direction: number;
  location: number;
  room: number;
}

export interface LevelJson {
  number: number;
  name: string;
  size: {
    width: number;
    height: number;
  };
  type: number;
  room: RoomJson[];
  prince: PrinceJson;
}

export interface RoomJson {
  id: number;
  tile?: TileJson[];
}

export interface Position {
  x: number;
  y: number;
}

export interface TileDefinition {
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  sourceSize: {
    w: number;
    h: number;
  };
  pivot: {
    x: number;
    y: number;
  };
}