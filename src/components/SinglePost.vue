<script setup lang="ts">
import {defineProps} from 'vue';
import type {PostWithHighlights} from '../composables/useSearchPosts.ts';

interface SinglePostProps {
  post: PostWithHighlights;
}

const props = defineProps<SinglePostProps>();

</script>

<template>
  <div class="post-wrapper">
    <h3 class="post-title">
      <span
        v-for="{chunk, text, key} in props.post.titleChunks"
        :key="key"
        :class="{highlight: chunk.highlight}"
      >
        {{ text }}
      </span>
    </h3>
    <p class="post-body">
      <span
        v-for="{chunk, text, key} in props.post.bodyChunks"
        :key="key"
        :class="{highlight: chunk.highlight}"
      >
        {{ text }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  align-items: self-start;
  text-align: left;
}

.highlight {
  background-color: mark;
  color: marktext;
}
</style>
