import { Chunk } from "../terrain/chunk";
import ContinentalMap from "./ContinentalMap";
import DensityMap from "./DensityMap";
import ErosionMap from "./ErosionMap";
import Global2DMap from "./Global2DMap";
import Global3DMap from "./Global3DMap";
import HeightMap from "./HeightMap";
import MapManager from "./MapManager";
import PVMap from "./PVMap";
import TerrainMap from "./TerrainMap";
import { GlobalTreeMap, TreeMap } from "./tree";

export default class GlobalMapManager extends MapManager {
  private static instance: GlobalMapManager;

  // global maps
  private continentalMap: Global2DMap<ContinentalMap> | null;
  private erosionMap: Global2DMap<ErosionMap> | null;
  private pvMap: Global2DMap<PVMap> | null;
  private heightMap: Global2DMap<HeightMap> | null;
  private densityMap: Global3DMap<DensityMap> | null;

  private globalTerrainMap: TerrainMap | null;
  private globalTreeMap: GlobalTreeMap | null;

  private constructor(seed: string) {
    super(seed);

    this.continentalMap = null;
    this.erosionMap = null;
    this.pvMap = null;
    this.heightMap = null;
    this.densityMap = null;

    this.globalTerrainMap = null;
    this.globalTreeMap = null;
  }

  static getInstance(seed: string): GlobalMapManager {
    if (!this.instance) {
      this.instance = new GlobalMapManager(seed);
    }

    return this.instance;
  }

  getTerrainMap() {
    const { seed } = this;

    if (this.globalTerrainMap) {
      return this.globalTerrainMap;
    }

    this.continentalMap = new Global2DMap(
      Chunk.WIDTH,
      () => new ContinentalMap(MapManager.getContinentalMapSeed(seed))
    );

    this.erosionMap = new Global2DMap(
      Chunk.WIDTH,
      () => new ErosionMap(MapManager.getErosionMapSeed(seed))
    );

    this.pvMap = new Global2DMap(
      Chunk.WIDTH,
      () => new PVMap(MapManager.getPvMapSeed(seed))
    );

    this.heightMap = new Global2DMap(
      Chunk.WIDTH,
      () =>
        new HeightMap(
          MapManager.getHeightMapSeed(seed),
          this.continentalMap!,
          this.erosionMap!,
          this.pvMap!
        )
    );

    this.densityMap = new Global3DMap(
      Chunk.WIDTH,
      Chunk.HEIGHT,
      () =>
        new DensityMap(
          MapManager.getDensityMapSeed(seed),
          this.erosionMap!,
          this.pvMap!
        )
    );

    this.globalTerrainMap = new TerrainMap(
      seed,
      this.continentalMap,
      this.erosionMap,
      this.pvMap,
      this.heightMap,
      this.densityMap
    );

    return this.globalTerrainMap;
  }

  getTreeMap() {
    const { seed } = this;

    if (this.globalTreeMap) {
      return this.globalTreeMap;
    }

    const treeMapSeed = MapManager.getTreeMapSeed(seed);

    const globalTerrainMap = this.getTerrainMap();
    const globalTreeMap = new Global2DMap(
      TreeMap.MAP_SIZE,
      () => new TreeMap(treeMapSeed)
    );

    this.globalTreeMap = new GlobalTreeMap(
      treeMapSeed,
      globalTreeMap,
      globalTerrainMap
    );

    return this.globalTreeMap;
  }

  unloadMapsRegionAt(x: number, y: number, z: number) {
    this.continentalMap?.unloadRegionAt(x, z);
    this.erosionMap?.unloadRegionAt(x, z);
    this.pvMap?.unloadRegionAt(x, z);
    this.heightMap?.unloadRegionAt(x, z);
    this.densityMap?.unloadRegionAt(x, y, z);
    this.globalTreeMap?.unloadRegionAt(x, z);
  }

  _logTotalRegionCount() {
    console.group("GlobalMapManager");
    console.log("continentalMap", this.continentalMap?._totalRegionsCount());
    console.log("erosionMap", this.erosionMap?._totalRegionsCount());
    console.log("pvMap", this.pvMap?._totalRegionsCount());
    console.log("heightMap", this.heightMap?._totalRegionsCount());
    console.log("densityMap", this.densityMap?._totalRegionsCount());
    console.log("globalTreeMap", this.globalTreeMap?._totalRegionsCount());
    console.groupEnd();
  }
}
