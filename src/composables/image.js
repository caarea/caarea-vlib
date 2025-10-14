// composition api version : voir aussi options version dans mixins/ImageMixin.js
export function useImage() {
  function transformImage(imageUrl, transform) {
    return imageUrl.replace("/upload/", `/upload/${transform},e_improve/`)
  }
  function fitToSizeWithAspectRatioRetained(
    imageUrl,
    width,
    height,
    backgroundColor = "b_white",
  ) {
    const transform = `w_${width},h_${height},c_pad,${backgroundColor}`
    return transformImage(imageUrl, transform)
  }
  return {
    transformImage,
    fitToSizeWithAspectRatioRetained,
  }
}
