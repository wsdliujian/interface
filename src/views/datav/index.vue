<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-container">
        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-7 class="rmctc-left-container">
              <Center-Cmp ref="centerChart" />
            </dv-border-box-7>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import CenterCmp from './CenterCmp'
export default {
  name: 'DataView',
  components: {
    CenterCmp
  },
  data () {
     return {

    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  /*#dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }*/

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
    }
  }

  .left-chart-container {
    width: 21%;
    height: 60%;
    padding: 10px;
    box-sizing: border-box;
    margin-left: 62px;

    .border-box-content {
      flex-direction: column;
    }
  }
  .right-chart-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }
  .right-main-container {
    width: 100%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 100%;
    display: flex;
  }

  .rmctc-left-container {
    width: 100%;
    height: 100%;
  }

  .rmctc-right-container {
    width: 100%;
  }

  .rmc-bottom-container {
    height: 100%;
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 100%;
  }
}
</style>
