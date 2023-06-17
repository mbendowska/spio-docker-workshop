<template>
  <iframe v-bind:src="link"
    frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"
    width="740" height="591"></iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { presentations } from '../presentations'

export default defineComponent({
  props: {
    name: String,
    slide: {
        default: 1,
        type: Number
    },
  },

  setup(props) {
    const presentationId = presentations[props.name]
    const options = `start=false&loop=false&delayms=3000&slide=${props.slide}`
    const link = `https://docs.google.com/presentation/d/e/${presentationId}/embed?${options}`

    return {
      link
    }
  },
})
</script>
