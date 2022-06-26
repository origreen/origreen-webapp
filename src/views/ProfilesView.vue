<template>
  <div class="profiles">
    <profiles-list class="list" @select="selectProfile($event)" />
    <div class="tree-container">
      <profile-tree class="tree" v-if="profile" :profile="profile" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Profile } from "@/services/types";
import * as api from "@/services/api";

import ProfilesList from "@/components/ProfilesList.vue";
import ProfileTree from "@/components/ProfileTree.vue";

@Component({
  components: {
    ProfileTree,
    ProfilesList,
  },
})
export default class ProfilesView extends Vue {
  /* DATA */

  public profile: Profile | null = null;

  /* METHODS */

  public async selectProfile(name: string): Promise<void> {
    if (name !== this.profile?.name) {
      await api.setActiveProfile(name);
      this.profile = await api.getActiveProfile();
    }
  }

  /* LIFECYCLE */

  async created() {
    this.profile = await api.getActiveProfile();
  }
}
</script>

<style lang="scss" scoped>
.profiles {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  .list {
    margin-right: 24px;
  }

  .tree-container {
    flex: 1;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>