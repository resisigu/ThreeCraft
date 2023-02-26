import { TransferDescriptor } from "threads";
import { expose, Transfer } from "threads/worker";
import TerrainShapeMap from "../../maps/TerrainShapeMap";
import { TreeMapBuilder } from "../../maps/tree";
import Chunk, { ChunkID } from "./Chunk";
import ChunkDecorator from "./ChunkDecorator";
import ChunkGeometryBuilder from "./ChunkGeometryBuilder";

function generateChunk(
  chunkId: ChunkID,
  seed: string,
  treeMapDataBuffer: TransferDescriptor<number>
) {
  const start = performance.now();

  // create the chunk
  const chunk = new Chunk(chunkId);

  // load maps
  const terrainShapeMap = new TerrainShapeMap(seed);
  const treeMap = TreeMapBuilder.generateChunkTreeMapFromBuffer(
    chunkId,
    //@ts-ignore
    new Uint16Array(treeMapDataBuffer),
    seed,
    terrainShapeMap.getHeightMap()
  );

  // instantiate a chunk decorator
  const chunkDecorator = new ChunkDecorator(terrainShapeMap, treeMap);

  // decorate the chunk
  chunkDecorator.decorateChunk(chunk);
  const chunkBlocks = chunk.getBlocks();

  const { solid, transparent } = ChunkGeometryBuilder.buildChunkGeometry(
    chunk,
    chunk.getWorldOriginPosition(),
    terrainShapeMap
  );

  const end = performance.now();
  const time = (end - start) / 1000;

  return {
    solidGeometry: solid,
    transparentGeometry: transparent,
    blocksBuffer: Transfer(chunkBlocks.buffer),
    time,
  };
}

export type TerrainGeneratorType = typeof generateChunk;

expose(generateChunk);
