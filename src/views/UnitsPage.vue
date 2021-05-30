<template>
  <div class="units_page">
    <div class="font-weight-bold mb-2">Ages</div>
    <button
      v-for="(age, i) in agesFilter"
      :key="i"
      :style="{ backgroundColor: activeColor(age) }"
      @click="onClickAgeFilter(age)"
      type="button"
      class="ages-filter"
    >
      <span>{{ age.text }}</span>
    </button>

    <div class="costs-text">Costs</div>
    <div class="d-flex col-1">
      <div class="d-flex row">
        <div class="custom-control custom-checkbox mt-2">
          <input
            v-model="wood"
            type="checkbox"
            class="custom-control-input"
            id="checkOfWood"
          />
          <label class="custom-control-label" for="checkOfWood">Wood</label>
        </div>
        <div class="custom-control custom-checkbox mt-2">
          <input
            v-model="food"
            type="checkbox"
            class="custom-control-input"
            id="checkOfFood"
          />
          <label class="custom-control-label" for="checkOfFood">Food</label>
        </div>
        <div class="custom-control custom-checkbox mt-2">
          <input
            v-model="gold"
            type="checkbox"
            class="custom-control-input"
            id="checkOfGold"
          />
          <label class="custom-control-label" for="checkOfGold">Gold</label>
        </div>
      </div>
      <div class="d-flex row align-items-center ">
        <div class="d-flex align-items-center ml-5 mb-2">
          <input
            v-model="rangeSliderOfWood"
            :disabled="!wood"
            type="range"
            class="form-range "
            min="0"
            max="200"
            id="customRange1"
          />
          <label for="customRange1" class="form-label ml-4 mt-2">{{
            rangeSliderOfWood
          }}</label>
        </div>
        <div class="d-flex align-items-center ">
          <input
            v-model="rangeSliderOfFood"
            :disabled="!food"
            type="range"
            class="form-range ml-5"
            min="0"
            max="200"
            id="customRange2"
          />
          <label for="customRange2" class="form-label ml-4 mt-2">{{
            rangeSliderOfFood
          }}</label>
        </div>
        <div class="d-flex align-items-center ">
          <input
            v-model="rangeSliderOfGold"
            :disabled="!gold"
            type="range"
            class="form-range ml-5"
            min="0"
            max="200"
            id="customRange3"
          />
          <label for="customRange3" class="form-label ml-4 mt-2">{{
            rangeSliderOfGold
          }}</label>
        </div>
      </div>
    </div>
    <table class="table table-hover mt-5" style="width: 95%">
      <thead>
        <tr class="bg-dark text-white">
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Costs</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(unit, index) in filteredUnits"
          :key="index"
          @click="openDetailPage(unit)"
        >
          <th scope="row">{{ unit.id }}</th>
          <td>{{ unit.name }}</td>
          <td>{{ unit.age }}</td>
          <td>{{ cost(unit) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { unitsModule } from "@/store/units.module";
import { UnitsModel } from "@/api/units.interface";
import { FilterButton } from "@/api/filter-button.interface";
import { EnumAgesFilter } from "@/api/ages-filter.enum";

@Component
export default class UnitsPage extends Vue {
  rangeSliderOfWood: number = 0;
  rangeSliderOfFood: number = 0;
  rangeSliderOfGold: number = 0;

  wood: boolean = false;
  food: boolean = false;
  gold: boolean = false;

  filteredUnits: UnitsModel[] = [];

  get filteredUnitsToModule() {
    return unitsModule.filteredUnits;
  }

  get agesFilter() {
    return unitsModule.agesFilter;
  }

  get activeColor() {
    return (item: FilterButton): string => {
      return item.active ? "#42B983FF" : "white";
    };
  }

  get units() {
    return unitsModule.units;
  }

  get cost() {
    return (unit: UnitsModel) => {
      if (!unit.cost) return;
      return `Wood: ${unit.cost?.Wood ?? "-"},  Gold: ${unit.cost?.Gold ??
        "-"},  Food: ${unit.cost.Food ?? "-"}`;
    };
  }

  get filterConditionUnits() {
    return (item: UnitsModel) => {
      const filterUnits = this.agesFilter?.filter(f => f.active);

      let isFilterType: boolean = false;
      filterUnits.forEach(f => {
        if (f.value == EnumAgesFilter.Dark)
          isFilterType = isFilterType || item.age == "Dark";
        else if (f.value == EnumAgesFilter.Feudal)
          isFilterType = isFilterType || item.age == "Feudal";
        else if (f.value == EnumAgesFilter.Castle)
          isFilterType = isFilterType || item.age == "Castle";
        else if (f.value == EnumAgesFilter.Imperial)
          isFilterType = isFilterType || item.age == "Imperial";
        else if (f.value == EnumAgesFilter.All)
          isFilterType = isFilterType = true;
      });

      return isFilterType;
    };
  }

  filterSynchronously(rangeSliderOfCost: number) {
    const isActive = this.agesFilter.some(s => s.active);
    if (!rangeSliderOfCost && !isActive) this.filteredUnits = this.units;
    else if (!rangeSliderOfCost && isActive)
      this.agesFilter.forEach(f => {
        if (f.active) this.setSelectedFilter(f);
      });
  }

  filteredAccordingToCosts(costType: string, rangeSliderOfCost: number) {
    let filterItems: UnitsModel[] = [];
    const isActive = this.agesFilter.some(s => s.active);

    let cloneItems: UnitsModel[] = isActive
      ? this.filteredUnitsToModule
      : this.units;
    let costValue: number = 0;

    cloneItems.forEach(f => {
      if (costType == "Wood") costValue = f.cost?.Wood;
      else if (costType == "Food") costValue = f.cost?.Food;
      else if (costType == "Gold") costValue = f.cost?.Gold;

      if (!costValue) return;

      if (costValue <= rangeSliderOfCost && costValue > 0) {
        filterItems.push(f);
      }
    });
    this.filteredUnits = filterItems;

    this.filterSynchronously(rangeSliderOfCost);
  }

  @Watch("rangeSliderOfWood")
  onChangedRangeSliderWood() {
    this.filteredAccordingToCosts("Wood", this.rangeSliderOfWood);
  }

  @Watch("rangeSliderOfFood")
  onChangedRangeSliderFood() {
    this.filteredAccordingToCosts("Food", this.rangeSliderOfFood);
  }

  @Watch("rangeSliderOfGold")
  onChangedRangeSliderGold() {
    this.filteredAccordingToCosts("Gold", this.rangeSliderOfGold);
  }

  @Watch("wood")
  onChangedWood() {
    if (!this.wood) this.rangeSliderOfWood = 0;
  }

  @Watch("food")
  onChangedFood() {
    if (!this.food) this.rangeSliderOfFood = 0;
  }

  @Watch("gold")
  onChangedGold() {
    if (!this.gold) this.rangeSliderOfGold = 0;
  }

  @Watch("agesFilter", { deep: true })
  onChangedAgesFilter() {
    const isDark = this.agesFilter.some(
      s => !s.active && s.value == EnumAgesFilter.Dark
    );
    const isFeudal = this.agesFilter.some(
      s => !s.active && s.value == EnumAgesFilter.Feudal
    );
    const isCastle = this.agesFilter.some(
      s => !s.active && s.value == EnumAgesFilter.Castle
    );
    const isImperial = this.agesFilter.some(
      s => !s.active && s.value == EnumAgesFilter.Imperial
    );
    const isAll = this.agesFilter.some(
      s => !s.active && s.value == EnumAgesFilter.All
    );

    if (isDark && isFeudal && isCastle && isImperial && isAll)
      this.filteredUnits = this.units;

    this.filterOnlyTheCostsActive();
  }

  async created() {
    await unitsModule.getUnits();
    this.agesFilter.forEach(f => (f.active = false));
    this.onClickAgeFilter(this.agesFilter[0]);
  }

  filterOnlyTheCostsActive() {
    if (this.wood)
      this.filteredAccordingToCosts("Wood", this.rangeSliderOfWood);

    if (this.food)
      this.filteredAccordingToCosts("Food", this.rangeSliderOfFood);

    if (this.gold)
      this.filteredAccordingToCosts("Gold", this.rangeSliderOfGold);
  }

  onClickAgeFilter(item: FilterButton, isActive?: boolean) {
    unitsModule.setAgesFilter(item);
    this.filteredUnits = [];
    if (isActive) item.active = true;
    if (!item) this.filteredUnits = this.units;
    this.setSelectedFilter(item);
  }

  setSelectedFilter(item: FilterButton) {
    this.units
      .filter(e => this.filterConditionUnits(e))
      .forEach(f => {
        if (item.active) {
          if (!this.filteredUnits.some(s => s.id == f.id))
            this.filteredUnits.push(f);
        } else {
          this.removeItem(this.filteredUnits, f);
          this.removeFilter(item);
        }
      });
    unitsModule.setFilteredUnits(this.filteredUnits);
  }

  removeFilter(item: FilterButton) {
    this.agesFilter.forEach(f => {
      if (f.active && f.value != item.value) this.onClickAgeFilter(f, true);
    });
  }

  removeItem(units: UnitsModel[], unit: UnitsModel) {
    return units.filter(f => {
      return f != unit;
    });
  }

  openDetailPage(unit: UnitsModel) {
    unitsModule.setSelectedUnit(unit);

    this.$router.push({
      name: "UnitsDetail",
      params: { id: unit.id + "" }
    });
  }
}

</script>

<style scoped lang="scss">
.units_page {
  margin-left: 50px;

  .ages-filter {
    border: 1px solid black;
    width: 80px;
    height: 40px;
  }
  .costs-text {
    font-weight: bold;
    margin: 40px 0 5px 0;
  }
}
</style>
