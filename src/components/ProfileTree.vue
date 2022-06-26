<template>
  <vue-tree style="width: 800px; height: 600px; border: 1px solid gray" :dataset="treeData" :config="treeConfig" :collapseEnabled="false" v-if="treeData">
    <template v-slot:node="{ node, collapsed }">
      <div class="node-container" :style="{ border: collapsed ? '2px solid grey' : '' }">
        <span class="name">{{ node.name }}</span>
        <span class="value" v-if="!isCustom || isRoot(node.name)">{{ node.value }}</span>
        <vue-slider
          @mousedown.native.stop
          style="width: 50px"
          :min="0"
          :max="100"
          :value="node.value * 100"
          @change="setValueFromName(node.name, $event)"
          ref="slider"
          v-else
        />
      </div>
    </template>
  </vue-tree>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import * as api from "@/services/api";
import { Profile, ProfileParameters } from "@/services/types";

interface TreeNode {
  name: string;
  value: number;
  children: TreeNode[];
}

@Component
export default class ProfileTree extends Vue {
  /* PROPS */
  @Prop({ type: Object, required: true })
  public profile!: Profile;

  /* DATA */

  public treeConfig = { nodeWidth: 150, nodeHeight: 120, levelHeight: 200 };
  public treeData: TreeNode | null = null;

  /* GETTERS */

  public get isCustom(): boolean {
    return this.profile.name === "custom";
  }

  /* METHODS */

  private parseProfileParameters(name: string, parameter: ProfileParameters): TreeNode {
    return {
      name,
      value: Math.round(parameter.weight * 100) / 100,
      children: parameter.parameters ? Object.keys(parameter.parameters).map((name) => this.parseProfileParameters(name, (parameter as any).parameters[name])) : [],
    };
  }

  // private setValueFromNameHelper(children: TreeNode[], name: string, value: number): boolean {
  //   for (const child of children) {
  //     if (child.name === name) {
  //       this.$set(child, "value", value);
  //       return true;
  //     }

  //     if (this.setValueFromNameHelper(child.children, name, value)) {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  private getTreeData(): TreeNode | null {
    return this.profile
      ? {
          name: this.profile.name,
          value: 1,
          children: Object.keys(this.profile.parameters).map((name) => this.parseProfileParameters(name, (this.profile as any).parameters[name])),
        }
      : null;
  }

  public isRoot(name: string): boolean {
    return name === this.profile.name;
  }

  public setValueFromName(name: string, value: number): void {
    value /= 100;

    if (!this.treeData) {
      return;
    }
    if (this.isRoot(name)) {
      return;
    }

    api.updateCustomProfile(name, value);
    // this.setValueFromNameHelper(this.treeData.children, name, value);
  }

  /* LIFECYCLE */

  mounted() {
    this.treeData = this.getTreeData();
  }

  /* WATCHERS */

  @Watch("profile", { deep: true })
  watchProfile() {
    this.treeData = this.getTreeData();
  }
}
</script>

<style lang="scss" scoped>
.node-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 12px;

  background: #9dd69b;
  border-radius: 20px;

  min-width: 100px;

  .name {
    font-weight: bold;
  }

  .value {
    margin-top: 4px;
    font-size: 20px;
  }
}
</style>
