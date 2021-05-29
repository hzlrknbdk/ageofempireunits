<template>
  <div style="max-width: 500px" class="ml-5">
    <table class="table">
      <thead>
        <tr class="bg-dark text-white">
          <th scope="col">Unit Detail</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Id:</th>
          <td>{{ selectedUnit.id }}</td>
        </tr>
        <tr>
          <th scope="row">Name:</th>
          <td>{{ selectedUnit.name }}</td>
        </tr>
        <tr>
          <th scope="row">Description:</th>
          <td>{{ selectedUnit.description }}</td>
        </tr>
        <tr>
          <th scope="row">Min. Required Age:</th>
          <td>{{ selectedUnit.age }}</td>
        </tr>
        <tr>
          <th scope="row">Wood Cost:</th>
          <td>{{ wood }}</td>
        </tr>
        <tr>
          <th scope="row">Gold Cost:</th>
          <td>{{ gold }}</td>
        </tr>
        <tr>
          <th scope="row">Build Time:</th>
          <td>{{ selectedUnit.build_time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { unitsModule } from "@/store/units.module";

@Component
class UnitsDetailPage extends Vue {
  get selectedUnit() {
    return unitsModule.selectedUnit;
  }

  get wood() {
    return this.selectedUnit?.cost?.Wood ?? "-";
  }

  get gold() {
    return this.selectedUnit?.cost?.Gold ?? "-";
  }
}

export default UnitsDetailPage;
</script>

<style lang="scss" scoped></style>
