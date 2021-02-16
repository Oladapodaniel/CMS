<template>
  <div>
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-12 px-0 connection-bar text-center" :class="{ 'minimized': onLine && !showBackOnline, 'maximized': !onLine}">
                  <p class="mb-0 font-weight-700" v-if="!onLine">You 're offline</p>
                  <p class="mb-0 font-weight-700 text-success" v-if="showBackOnline">You 're back online</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
        onLine: navigator.onLine ? true : false,
        showBackOnline: false,
    }
 },

 methods: {
     checkStatus() {
         this.onLine = navigator.onLine;
     }
 },

 watch: {
    onLine: function () {
        if(this.onLine === true){
            this.showBackOnline = true;
            setTimeout(()=>{ this.showBackOnline = false; }, 1000);
        }
    },
},

created() {
    setInterval(() => this.checkStatus(), 1000)
}
};
</script>

<style scoped>

    .connection-bar {
        background: #00204412;
    }

    .minimized {
        height: 0;
        transition: all .5s ease-in-out;
        overflow: hidden;
    }

    .maximized {
        height: 25px;
        transition: all .5s ease-in-out;
        overflow: hidden;
    }
</style>