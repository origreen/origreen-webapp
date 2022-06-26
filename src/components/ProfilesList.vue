<template>
  <div class="profiles-list">
    <div class="item" v-for="profile of profiles" :key="profile.name" :class="{ active: activeName === profile.name }" @click="select(profile.name)">
      {{ profile.name }}
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Profile } from "@/services/types";
import * as api from "@/services/api";

@Component
export default class ProfileList extends Vue {
  /* DATA */

  private profiles: Profile[] = [];
  private activeName = "";

  /* METHODS */

  public select(name: string): void {
    this.$emit("select", name);
    this.activeName = name;
  }

  /* LIFECYCLE */

  async created() {
    this.profiles = await api.getProfiles();
    this.activeName = (await api.getActiveProfile()).name;
  }
}
</script>

<style lang="scss" scoped>
.profiles-list {
  margin: 0 18px;

  .item {
    cursor: pointer;

    margin: 24px 0;
    padding: 18px;
    font-size: 22px;

    background: #bfccf5;
    border-radius: 20px;

    transition: all 0.2s ease-in-out;
  }
  .item:hover {
    background: #cfd9f7;
  }
  .item.active {
    background: #aabcf5;
    border: 1px solid black;
  }
}
</style>
