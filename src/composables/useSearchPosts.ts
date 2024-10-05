import {computed, ref, shallowRef, watch} from 'vue';
import type {Post} from '../configs/post.config.ts';
import {type Chunk, type FindAllArgs, findAll} from 'highlight-words-core';

export interface TextChunk {
  chunk: Chunk;
  text: string;
  key: number;
}

export interface PostWithHighlights extends Post {
  titleChunks: TextChunk[];
  bodyChunks: TextChunk[];
  hasHighlights: boolean;
}

const _posts = ref<Post[]>([]);
const postWithHighlights = shallowRef<PostWithHighlights[]>([]);
const matchCount = computed(() => {
  return postWithHighlights.value.filter((post)=>post.hasHighlights).length;
})
const searchText = ref('');
const searchWords = computed(() => {
  return searchText.value.split(' ');
});

watch(searchWords, ()=> {
  postWithHighlights.value = getPostsHighlights();
})

export function getHighlightedWords(args: FindAllArgs): TextChunk[] {
  const {textToHighlight} = args;
  const chunks = findAll(args);

  return chunks.map((chunk, index) => {
    const text = textToHighlight.substring(chunk.start, chunk.end);
    return {chunk, text, key: index};
  });

}

function getPostsHighlights(): PostWithHighlights[] {
  if (!_posts.value.length) {
    return [] as PostWithHighlights[];
  }

  return _posts.value.map((post) => {
    const titleChunks = getHighlightedWords({
      textToHighlight: post.title,
      searchWords: searchWords.value,
      autoEscape: true,
    });

    const bodyChunks = getHighlightedWords({
      textToHighlight: post.body,
      searchWords: searchWords.value,
      autoEscape: true,
    });

    const hasHighlights = titleChunks.some((t) => t.chunk.highlight) || bodyChunks.some((b) => b.chunk.highlight);

    return {
      ...post,
      titleChunks,
      bodyChunks,
      hasHighlights
    };
  });
}


export function useSearchPosts(posts?: Post[]) {
  if (posts && !_posts.value.length) {
    _posts.value = posts;
    postWithHighlights.value = getPostsHighlights();
  }

  return {
    searchText,
    postWithHighlights,
    matchCount,
  };
}
