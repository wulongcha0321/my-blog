<!-- @format -->

<template lang="pug">
svg(:class='svgClass' aria-hidden='true')
  use(:xlink:href='iconName')
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    svgClass() {
      return this.name ? `svg-icon ${this.name}` : 'svg-icon'
    },
    iconName() {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.svg-icon
  height 1em
  width 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
</style>
