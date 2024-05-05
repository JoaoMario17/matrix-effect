export interface drop {
  droppingFunction: Function;
  elements: Array<string>;
	rgb: string;
	rgbe: string;
  isDropping: boolean;
  currentX: number;
  speed: number;
}
