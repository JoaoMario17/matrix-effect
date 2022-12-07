<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "../script/index.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
}
</script>

<template>
  <canvas id="canvas-tag"></canvas>
</template>
