<script setup lang="ts">
import "ant-design-vue/dist/reset.css";
import "@surely-vue/table/dist/index.less";
import {
  Slider,
  Pagination as APagination,
  DatePicker as ADatePicker,
} from "ant-design-vue";
import STable from "@surely-vue/table";
import { ref } from "vue";
const value1 = ref<number>(0);
const value2 = ref<[number, number]>([20, 50]);
const reverse = ref<boolean>(true);

const current = ref(6);

//datepicker
const datepickerValue1 = ref<any>();

// table
interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}
const columns = ref([
  {
    title: "Full Name",
    dataIndex: "name",
    width: 150,
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 100,
    key: "age",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "address1",
  },
  {
    title: "Column 2",
    key: "address2",
    dataIndex: "address",
  },
  {
    title: "Column 3",
    key: "address3",
    dataIndex: "address",
  },
  {
    title: "Column 4",
    key: "address4",
    dataIndex: "address",
  },
  { title: "Column 5", dataIndex: "address", key: "address5" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    resizable: true,
    drag: false,
  },
]);
const data: DataItem[] = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: i + 1,
    address: `London Park no. ${i}`,
  });
}

const dataSource = ref(data);
</script>

<template>
  <div style="width: 500px">
    <slider id="test" v-model:value="value1" />
    <slider v-model:value="value1" :reverse="reverse" />
    <slider v-model:value="value2" range />

    <div style="height: 300px">
      <div style="display: inline-block; height: 300px; margin-left: 70px">
        <slider v-model:value="value1" vertical />
      </div>
    </div>
    <p></p>
    <div>
      <a-date-picker v-model:value="datepickerValue1" />
    </div>
    <p></p>
  </div>

  <br />
  <a-pagination v-model:current="current" :total="500" />

  <br />

  <div style="width: 800px">
    <s-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :scroll="{ y: 500, x: 2000 }"
      column-drag
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>Action</a>
        </template>
      </template>
    </s-table>
  </div>
</template>

<style scoped></style>
