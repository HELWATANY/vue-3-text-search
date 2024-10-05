<script setup lang="ts">
import SinglePost from './SinglePost.vue';
import {useSearchPosts} from '../composables/useSearchPosts.ts';

const {postWithHighlights} = useSearchPosts();

</script>

<template>
  <div class="posts-wrapper">
    <SinglePost
      v-for="post in postWithHighlights"
      :post="post"
      :key="post.id"
      class="post"
    />
  </div>
</template>

<style scoped>
.posts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: self-start;

  .post {
    padding: 8px 8px 24px 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid black;
  }
}
</style>
