import { AmbientLight, Color, DirectionalLight, Fog, Scene } from "three";
import EnvVars from "../config/EnvVars";
import { Chunk } from "../terrain/chunk";
import DebugControls from "../tools/DebugControls";
import Logger from "../tools/Logger";

export default class GameScene extends Scene {
  private static readonly SkyColor: string = "#87CEEB";

  private initialized: boolean;
  private gui!: DebugControls;

  private lights: THREE.Light[];

  constructor() {
    super();
    this.initialized = false;
    this.lights = [];
  }

  init(renderDistanceInChunks: number) {
    if (this.initialized) {
      return;
    }

    Logger.info("Initializing scene...", Logger.SCENE_KEY);
    this.gui = DebugControls.getInstance();
    this.lights = this.initLights();
    this.initBackground();
    this.initFog(renderDistanceInChunks);

    this.initialized = true;
    Logger.info("Scene initialized", Logger.SCENE_KEY);
  }

  /**
   * //TODO implement a better light system (smooth lighting)
   */
  private initLights() {
    const sunLight = new DirectionalLight(0xffffff, 0.2);
    sunLight.position.set(100, 100, 0);

    // const helper = new THREE.DirectionalLightHelper(sunLight, 5);

    const ambientLight = new AmbientLight(0xffffff, 0.8);

    // add lights
    this.add(sunLight, ambientLight);
    // this.scene.add(helper);

    return [sunLight, ambientLight];
  }

  private initBackground() {
    // set sky color
    this.background = new Color(GameScene.SkyColor);
  }

  /**
   * This will apply a fog fading effect
   * starting from one chunk before the rendering distance
   */
  private initFog(renderingDistanceInChunks: number) {
    if (!EnvVars.FOG_ENABLED) {
      return;
    }

    const renderingDistance = renderingDistanceInChunks * Chunk.WIDTH;
    const far = renderingDistance - Chunk.WIDTH;
    // not a too intrusive fog fading effect, just 2 blocks long
    const near = far - 2;

    this.fog = new Fog(GameScene.SkyColor, near, far);
  }

  dispose() {
    Logger.info("Disposing scene...", Logger.DISPOSE_KEY, Logger.SCENE_KEY);
    this.lights.forEach((light) => light.dispose());
    this.lights = [];
    this.clear();

    this.initialized = false;
  }

  getMeshCount(): number {
    return this.children.length;
  }
}
