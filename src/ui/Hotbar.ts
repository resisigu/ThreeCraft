import InventoryManager, { Slot } from "../player/InventoryManager";
import SlotGrid from "./SlotGrid";

export default class Hotbar {
  private inventoryManager: InventoryManager;

  private hotbarSlots: Slot[];

  private hotbarElement!: HTMLElement;

  constructor(inventoryManager: InventoryManager) {
    this.inventoryManager = inventoryManager;
    this.hotbarSlots = this.inventoryManager.getHotbarSlots();

    // ui
    this.initHotbarElement();
    this.createHotbarSlots();

    // listeners
    this.initItemChangeListener();
    this.initSelectionListener();
  }

  private initHotbarElement() {
    const hotbarElement = document.getElementById("hotbar");

    if (!hotbarElement) {
      throw new Error("Hotbar markup not found");
    }

    this.hotbarElement = hotbarElement;
  }

  private createHotbarSlots() {
    // creating the slots
    SlotGrid.createSlots(
      this.hotbarElement,
      InventoryManager.HOTBAR_SLOTS,
      (index) => this.inventoryManager.getItem(this.hotbarSlots, index)
    );
  }

  private initSelectionListener() {
    window.addEventListener("wheel", (event) => {
      //TODO
    });
  }

  private initItemChangeListener() {
    this.inventoryManager.onHotbarChange((items) => {
      SlotGrid.drawSlots(
        this.hotbarElement,
        InventoryManager.HOTBAR_SLOTS,
        (index) => this.inventoryManager.getItem(items, index)
      );
    });
  }
}
