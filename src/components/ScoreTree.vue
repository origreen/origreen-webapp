<template>
  <vue-tree class="tree" :dataset="treeData" :config="treeConfig" :collapseEnabled="false" direction="vertical" v-if="treeData">
    <template v-slot:node="{ node }">
      <div class="node-container" :style="colorStyle">
        <span class="name">{{ node.name }}</span>
        <span class="value">{{ node.value }}%</span>
      </div>
    </template>
  </vue-tree>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Score } from "@/services/types";

interface TreeNode {
  name: string;
  value: number;
  children: TreeNode[];
}

@Component
export default class ScoreTree extends Vue {
  /* PROPS */

  @Prop({ type: Object, required: true })
  score!: Score;

  @Prop({ type: Boolean, default: false })
  isEnvironmental!: boolean;

  /* DATA */

  public treeConfig = { nodeWidth: 110, nodeHeight: 80, levelHeight: 130 };

  /* METHODS */

  private getPercentage(value: number): number {
    return Math.floor(value * 100);
  }

  /* GETTERS */

  public get treeNutritionalData(): TreeNode {
    return {
      name: "health",
      value: this.getPercentage(this.score.nutritional.overall),
      children: [
        {
          name: "vitamins",
          value: this.getPercentage(this.score.nutritional.vitamin),
          children: [],
        },
        {
          name: "fiber",
          value: this.getPercentage(this.score.nutritional.fiber),
          children: [],
        },
        {
          name: "calories",
          value: this.getPercentage(this.score.nutritional.caloric),
          children: [],
        },
        // {
        //   name: "sodium",
        //   value: this.getPercentage(this.score.nutritional.sodium),
        //   children: [],
        // },
      ],
    };
  }

  public get treeEnvironmentalData(): TreeNode {
    return {
      name: "eco",
      value: this.getPercentage(this.score.environmental.overall),
      children: [
        {
          name: "water",
          value: this.getPercentage(this.score.environmental.water),
          children: [],
        },
        {
          name: "energy",
          value: this.getPercentage(this.score.environmental.energy),
          children: [],
        },
        {
          name: "co2",
          value: this.getPercentage(this.score.environmental.co2),
          children: [],
        },
      ],
    };
  }

  public get treeData(): TreeNode {
    return this.isEnvironmental ? this.treeEnvironmentalData : this.treeNutritionalData;
  }

  public get colorStyle() {
    return {
      backgroundColor: this.isEnvironmental ? "#9dd69b" : "#9b9fd6",
    };
  }
}
</script>

<style lang="scss" scoped>
.tree {
  border-top: 1px solid #bbbaba;
  border-bottom: 1px solid #bbbaba;
  height: 350px;
  width: 100vw;
  overflow: auto;
}
.tree::v-deep .vue-tree {
  transform: scale(1) translate(50vw, -20px) !important;
}
.tree::v-deep .dom-container {
  transform: scale(1) translate(50vw, -20px) !important;
}

.node-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 4px;

  border-radius: 20px;
  min-width: 100px;

  .name {
    font-weight: bold;
  }

  .value {
    margin-top: 4px;
    font-size: 18px;
  }
}
</style>
