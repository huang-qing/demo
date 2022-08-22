<!-- 使用 lang="tsx" 可以使用jsx语法 -->
<script lang="tsx">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref<number>(1);
    const onClick = () => {
      count.value++;
      const elem = document.querySelector("#list-" + count.value);
      if (elem) {
        // 跳转定位
        elem.scrollIntoView();
      }
    };

    return () => {
      return (
        <div class="container" onClick={onClick}>
          <div>
            <h2>{count.value}</h2>
          </div>
          <div class="wrap">
            <div id="list-1" class="one">
              1
            </div>
            <div id="list-2">2</div>
            <div id="list-3">3</div>
            <div id="list-4">4</div>
            <div id="list-5">5</div>
            <div id="list-6">6</div>
            <div id="list-7">7</div>
            <div id="list-8">8</div>
            <div id="list-9">9</div>
            <div id="list-10">10</div>
          </div>
        </div>
      );
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  margin: 1em;

  h2 {
    cursor: pointer;
  }
  .wrap {
    max-height: 5em;
    overflow: auto;
  }

  .one {
    color: cornflowerblue;
  }
}
</style>
