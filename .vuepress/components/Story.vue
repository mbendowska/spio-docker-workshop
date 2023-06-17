<template>
  <div class="admonition story">
    <p class="admonition-title">
      <span class="icon">💬</span>{{ title }}</p>
      <p><slot></slot></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String,
  },

  setup(props) {

  },
})
</script>


<style scoped>
  .admonition.story {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    position: relative;
    margin: 1.5625em 0;
    padding: 0 1.2rem;
    border-left: 0.4rem solid #448aff;
    border-radius: 0.2rem;
    overflow: auto;
  }

  html .admonition>:last-child {
    margin-bottom: 1.2rem;
  }

  .admonition .admonition {
    margin: 1em 0;
  }

  .admonition p {
    margin-top: 0.5em;
  }

  .admonition .icon {
    margin-right: 0.5em;
    font-size: 1.2em;
  }

  .admonition.story>.admonition-title {
    margin: 0 -1.2rem;
    padding: 0.8rem 1rem 0.8rem 1rem;
    border-bottom: 0.1rem solid rgba(68,138,255,0.1);
    background-color: rgba(68,138,255,0.1);
    font-weight: 700;
  }

  .admonition>.admonition-title:last-child {
    margin-bottom: 0;
  }

  .admonition.story {
    border-left-color: #448aff;
  }

  .admonition.story>.admonition-title {
    border-bottom-color: 0.1rem solid rgba(68,138,255,0.1);
    background-color: rgba(68,138,255,0.1);
  }
</style>
