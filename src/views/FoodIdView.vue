<template>
  <div class="food-id" v-if="food">
    <div class="panel">
      <h2 class="name">{{ food.name }}</h2>
      <img class="image" :src="food.photo" alt="Image" />
    </div>
    <div class="score-container">
      <h3 v-if="score" class="score">
        Score: <span class="value">{{ totalScore }}%</span>
      </h3>

      <div class="tree-container">
        <score-tree :score="score" v-if="score" />
      </div>
      <div class="tree-container">
        <score-tree :score="score" isEnvironmental v-if="score" />
      </div>
    </div>

    <div class="timelapse-container">
      <h3>Growth timelapse</h3>
      <timelapse width="96vw" :images="food.growingInformation.timelapse" />
    </div>

    <div class="location">
      <div class="info">
        <h2>Greenhouse location</h2>
        <span class="itemino">{{ food.location.greenhouse }}</span>
        <span class="itemino">{{ food.location.city }}, {{ food.location.region }}, {{ food.location.country }}</span>
      </div>
      <google-map class="map" :center="center" :zoom="12" ref="map">
        <google-map-marker :position="center" />
      </google-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Food, Score } from "@/services/types";
import * as api from "@/services/api";

import ScoreTree from "@/components/ScoreTree.vue";
import Timelapse from "@/components/Timelapse.vue";

@Component({
  components: {
    ScoreTree,
    Timelapse,
  },
})
export default class FoodIdView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;

  /* DATA */

  public food: Food | null = null;
  public score: Score | null = null;

  /* GETTERS */

  get totalScore(): number {
    return this.score ? Math.floor(this.score.personalized * 100) : 0;
  }

  get center(): { lat: number; lng: number } | null {
    return this.food ? { lat: this.food.location.coordinates.lat, lng: this.food.location.coordinates.lon } : null;
  }

  get attribution(): string {
    return `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
  }
  /* LIFECYCLE */

  async created() {
    this.food = await api.getFoodById(this.id);
    this.score = await api.getFoodScoreById(this.id);
  }
}
</script>

<style lang="scss" scoped>
.food-id {
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  .score-container {
    margin-top: 42px;

    .score {
      font-size: 20px;
      font-weight: normal;
      font-style: italic;

      .value {
        margin-left: 4px;
        color: #9dd69b;
        font-size: 24px;
        font-style: normal;
        font-weight: bold;
      }
    }

    .tree-container {
      // overflow-x: auto;
    }
  }

  .location {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;

    background: #91cda0;

    margin-top: 45px;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      margin-bottom: 36px;

      h2 {
        font-size: 22px;
        margin-bottom: 14px;
      }

      .itemino {
        font-style: italic;
        margin: 4px 0;
      }
    }

    .map {
      height: 350px;
      width: 96vw;
    }
  }

  .panel {
    background: #9dd69b;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    padding-bottom: 24px;

    width: 100vw;

    .name {
      color: white;
      font-weight: normal;
    }

    .image {
      margin: 56px 0;
      width: 70vw;
      border-radius: 10px;
      box-shadow: 0 0 8px #ffffff;
    }
  }

  .timelapse-container {
    margin: 32px 0 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;

    h3 {
      font-size: 20px;
    }
  }
}
</style>