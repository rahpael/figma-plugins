/* global Blob, Image */

import { emit, once } from '@create-figma-plugin/utilities'

export default async function (): Promise<void> {
  once('COMPUTE_IMAGE_WIDTH_REQUEST', async function ({ imageBytes }) {
    const url = URL.createObjectURL(new Blob([imageBytes]))
    const image: HTMLImageElement = await new Promise(function (resolve) {
      const image = new Image()
      image.onload = function (): void {
        resolve(image)
      }
      image.src = url
    })
    const dimensions = {
      width: image.width,
      height: image.height
    }
    emit('COMPUTE_IMAGE_WIDTH_RESULT', dimensions)
  })
}
