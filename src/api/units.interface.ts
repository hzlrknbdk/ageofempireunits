import { EnumAgesFilter } from "@/api/ages-filter.enum";

export interface UnitsModel {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string | EnumAgesFilter;
  cost: { Wood: number; Gold: number; Food: number };
  build_time: number;
  reload_time: number;
  attack_delay: number;
  movement_rate: number;
  line_of_sight: number;
  hit_points: number;
  range: number;
  attack: number;
  armor: number;
  accuracy: number;
}
