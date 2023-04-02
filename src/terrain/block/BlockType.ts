import { BlockMetadata } from "./Block";

export enum BlockType {
  AIR = 0,
  STONE,
  COBBLESTONE,
  DIRT,
  GRASS,
  GRASS_SNOW,
  WATER,
  SAND,
  GLASS,
  OAK_LOG,
  OAK_LEAVES,
  PLANKS,
  COAL_ORE,
}

export const BlockRegistry: Record<BlockType, BlockMetadata> = {
  [BlockType.AIR]: {
    isTransparent: true,
    isSolid: false,
    icon: {
      row: -1,
      col: -1,
    },
    texture: {
      top: {
        row: -1,
        col: -1,
      },
      bottom: {
        row: -1,
        col: -1,
      },
      side: {
        row: -1,
        col: -1,
      },
    },
  },
  [BlockType.STONE]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.COBBLESTONE,
    icon: {
      row: 48,
      col: 12,
    },
    texture: {
      top: {
        row: 0,
        col: 5,
      },
      bottom: {
        row: 0,
        col: 5,
      },
      side: {
        row: 0,
        col: 5,
      },
    },
  },
  [BlockType.COBBLESTONE]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.COBBLESTONE,
    icon: {
      row: 8,
      col: 31,
    },
    texture: {
      top: {
        row: 0,
        col: 4,
      },
      bottom: {
        row: 0,
        col: 4,
      },
      side: {
        row: 0,
        col: 4,
      },
    },
  },
  [BlockType.GRASS]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.DIRT,
    icon: {
      row: 16,
      col: 27,
    },
    texture: {
      top: {
        row: 0,
        col: 1,
      },
      bottom: {
        row: 0,
        col: 2,
      },
      side: {
        row: 0,
        col: 0,
      },
    },
  },
  [BlockType.GRASS_SNOW]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.DIRT,
    icon: {
      row: 13,
      col: 18,
    },
    texture: {
      top: {
        row: 2,
        col: 5,
      },
      bottom: {
        row: 0,
        col: 2,
      },
      side: {
        row: 2,
        col: 4,
      },
    },
  },
  [BlockType.DIRT]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.DIRT,
    icon: {
      row: 13,
      col: 18,
    },
    texture: {
      top: {
        row: 0,
        col: 2,
      },
      bottom: {
        row: 0,
        col: 2,
      },
      side: {
        row: 0,
        col: 2,
      },
    },
  },
  [BlockType.OAK_LOG]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.OAK_LOG,
    icon: {
      row: 25,
      col: 9,
    },
    texture: {
      top: {
        row: 1,
        col: 2,
      },
      bottom: {
        row: 1,
        col: 2,
      },
      side: {
        row: 1,
        col: 3,
      },
    },
  },
  [BlockType.OAK_LEAVES]: {
    isTransparent: true,
    isSolid: true,
    icon: {
      row: 25,
      col: 8,
    },
    texture: {
      top: {
        row: 1,
        col: 5,
      },
      bottom: {
        row: 1,
        col: 5,
      },
      side: {
        row: 1,
        col: 5,
      },
    },
  },
  [BlockType.PLANKS]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.PLANKS,
    icon: {
      row: 25,
      col: 10,
    },
    texture: {
      top: {
        row: 1,
        col: 4,
      },
      bottom: {
        row: 1,
        col: 4,
      },
      side: {
        row: 1,
        col: 4,
      },
    },
  },
  [BlockType.SAND]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.SAND,
    icon: {
      row: 32,
      col: 6,
    },
    texture: {
      top: {
        row: 1,
        col: 6,
      },
      bottom: {
        row: 1,
        col: 6,
      },
      side: {
        row: 1,
        col: 6,
      },
    },
  },
  [BlockType.WATER]: {
    isTransparent: true,
    isSolid: false,
    icon: {
      row: 37,
      col: 28,
    },
    texture: {
      side: {
        row: 1,
        col: 7,
      },
      top: {
        row: 1,
        col: 7,
      },
      bottom: {
        row: 1,
        col: 7,
      },
    },
  },
  [BlockType.GLASS]: {
    isTransparent: true,
    isSolid: true,
    icon: {
      row: 15,
      col: 26,
    },
    texture: {
      side: {
        row: 2,
        col: 0,
      },
      top: {
        row: 2,
        col: 0,
      },
      bottom: {
        row: 2,
        col: 0,
      },
    },
  },
  [BlockType.COAL_ORE]: {
    isTransparent: false,
    isSolid: true,
    drop: BlockType.COAL_ORE,
    icon: {
      row: 8,
      col: 25,
    },
    texture: {
      side: {
        row: 0,
        col: 6,
      },
      top: {
        row: 0,
        col: 6,
      },
      bottom: {
        row: 0,
        col: 6,
      },
    },
  },
};
