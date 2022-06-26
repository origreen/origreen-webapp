<template>
  <div class="timelapse" style="position: relative" :style="sizeStyle">
    <image-displayer
      class="image-displayer"
      :style="zIndexStyle"
      :minZindex="minZindex"
      :image="currentImagePath"
      :stretchWidth="width !== 'auto'"
      :stretchHeight="height !== 'auto'"
      v-if="currentImagePath"
    />
    <div class="date">
      {{ currentImageDate }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ImageDisplayer from "./ImageDisplayer.vue";

@Component({
  components: {
    ImageDisplayer,
  },
})
export default class Timelapse extends Vue {
  /* PROPS */

  @Prop({ type: Number, default: -1 })
  minZindex!: number;

  @Prop({ type: String, default: "auto" })
  width!: string;

  @Prop({ type: String, default: "auto" })
  height!: string;

  @Prop({ type: Array, required: true })
  images!: { date: string; url: string }[];

  /* DATA */

  private index = 0;

  /* GETTERS */

  get zIndexStyle(): { zIndex: number } {
    return {
      zIndex: this.minZindex + 1,
    };
  }

  get sizeStyle(): { width: string; height: string } {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get currentImagePath(): string {
    return this.images[this.index].url.replace("https:/github.com/origreen/static-assets/raw/main", "https://static-assets-two.vercel.app");
  }

  get currentImageDate(): string {
    return this.images[this.index].date.slice(0, 8).replace('2022-06', '2022-05') + this.zeroPaddedStrIndex;
  }

  get zeroPaddedStrIndex(): string {
    return ((this.index + 1) % 31).toString().padStart(2, "0");
  }

  /* LIFE CYCLE */

  created() {
    setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.date {
  position: absolute;
  bottom: 0;
  right: 0;

  font-size: 20px;
  font-style: italic;
  padding: 6px;
  color: white;
}
</style>