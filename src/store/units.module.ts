import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import store from ".";
import axios from "axios";
import { UnitsModel } from "@/api/units.interface";
import { BASE_URL } from "@/api/api.const";
import { EnumAgesFilter } from "@/api/ages-filter.enum";
import { FilterButton } from "@/api/filter-button.interface";

export interface UnitsFilter {
  agesFilter: FilterButton[];
}

@Module({
  dynamic: true,
  store: store,
  namespaced: true,
  name: "units"
})
export default class UnitsModule extends VuexModule {
  agesFilter: FilterButton[] = [
    { value: EnumAgesFilter.All, text: "All", active: false },
    { value: EnumAgesFilter.Dark, text: "Dark", active: false },
    { value: EnumAgesFilter.Feudal, text: "Feudal", active: false },
    { value: EnumAgesFilter.Castle, text: "Castle", active: false },
    { value: EnumAgesFilter.Imperial, text: "Imperial", active: false }
  ];
  filter: UnitsFilter = {
    agesFilter: []
  };
  units: UnitsModel[] = [];
  // eslint-disable-next-line no-undef
  selectedUnit: Partial<UnitsModel> = {};
  filteredUnits: UnitsModel[] = [];

  @Mutation
  setFilteredUnits(items: UnitsModel[]) {
    this.filteredUnits = items;
  }

  @Mutation
  setAgesFilter(item: FilterButton) {
    item.active = !item.active;
    this.filter.agesFilter = this.agesFilter.reduce(
      (res: FilterButton[], item) => {
        if (item.active) {
          res.push(item.value);
        }
        return res;
      },
      []
    );
  }

  @Mutation
  // eslint-disable-next-line no-undef
  setSelectedUnit(unit: Partial<UnitsModel>) {
    this.selectedUnit = unit;
  }

  @Mutation
  setUnits(items: UnitsModel[]) {
    this.units = items;
  }

  @Action({ rawError: true })
  async getUnits() {
    const result = await axios.get(BASE_URL);
    if (!result) return;
    this.setUnits(result.data);
  }
}

export const unitsModule = getModule(UnitsModule);
