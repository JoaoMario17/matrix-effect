export interface drop {
  isDropping: boolean;
  droppingFunction: Function;
  currentX: number;
  elements: Array<string>;
  speed: number;
}