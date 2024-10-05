<script setup lang="ts">
import {POSTS} from './configs/post.config';
import ThePosts from './components/ThePosts.vue';
import {useSearchPosts} from './composables/useSearchPosts.ts';

const {searchText, matchCount} = useSearchPosts(POSTS);
</script>

<template>
  <div class="main-container">
    <div class="search-wrapper">
      <label for="search">Search</label>
      <input v-model="searchText" type="search" name="search" id="search"/>
      <p v-if="matchCount > 0" class="match-count">
        <span class="count">
          {{ matchCount }} {{ matchCount > 1 ? 'posts were' : 'post was' }}
        </span>
        <span class="text">found.</span>
      </p>
    </div>
    <div class="content">
      <ThePosts/>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 10px;

  label {
    font-weight: 600;
  }

  #search {
    width: 450px;
    padding: 8px;
  }

  .match-count {
    display: flex;
    gap: 4px;
    margin-top: 0;
    font-size: 90%;
    .count {
      font-weight: 600;
    }
  }
}
</style>
