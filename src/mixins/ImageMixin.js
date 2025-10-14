// options api version : voir aussi composition api version dans composables/image.js
export default {
  methods: {
    transformImage(imageUrl, transform) {
      return imageUrl.replace("/upload/", `/upload/${transform},e_improve/`)
    },
    fitToSizeWithAspectRatioRetained(
      imageUrl,
      width,
      height,
      backgroundColor = "b_white",
    ) {
      const transform = `w_${width},h_${height},c_pad,${backgroundColor}`
      return this.transformImage(imageUrl, transform)
    },
  },
}
