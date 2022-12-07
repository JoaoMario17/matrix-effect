<script>
import script from '../script/index.js'

export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      script
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
}
</script>

<template>
  <canvas id="canvas-tag"></canvas>
</template>
