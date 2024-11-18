<script setup>
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['uploaded'])

const imagePreview = ref(null)
const imageSource = ref(null)
const showModal = ref(false)
const originalFilename = ref('')

const handleClose = () => {
  showModal.value = false
  resetImage()
}

const cropImage = ({ canvas }) => {
  imagePreview.value = canvas.toDataURL()
}

const changeImage = (event) => {
  const files = event.target.files[0]
  if (files && files.type.startsWith('image/')) {
    originalFilename.value = files.name
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSource.value = e.target.result
    }
    reader.readAsDataURL(files)
  }
  showModal.value = true
  event.target.value = '' // Clear the input
}

const saveCroppedImage = () => {
  showModal.value = false
  if (!imagePreview.value) {
    return
  }
  const arr = imagePreview.value.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  const file = new File([u8arr], originalFilename.value, { type: mime })
  emit('uploaded', file)
  resetImage()
}

const resetImage = () => {
  imagePreview.value = null
  imageSource.value = null
}
</script>

<template>
  <span>
    <input
      ref="file"
      type="file"
      accept="image/*"
      :disabled="isLoading"
      class="hidden"
      @change="changeImage"
    />
    <!-- <slot name="upload-button" :trigger="() => $refs.file.click()" /> -->
    <el-dialog
      class="overflow-y-auto sm:max-w-lg"
      v-model="showModal"
    >
      <!-- <DialogTitle as="h3" class="text-3xl font-bold capitalize">Crop Image</DialogTitle> -->
      <!-- <div v-if="!imagePreview" class="w-full flex justify-center mt-12 items-center">
        <SpinnerIcon class="w-10 h-full animate-spin" />
      </div> -->
      <div class="mt-12 flex flex-col sm:flex-row justify-between items-center">
        <div v-if="imageSource" class="w-full sm:w-1/2 mb-4">
          <Cropper
            :src="imageSource"
            class="w-full"
            :stencil-props="{ aspectRatio: 1 }"
            @change="cropImage"
          />
        </div>
        <div v-if="imagePreview" class="mt-4 sm:mt-0">
          <img :src="imagePreview" alt="Cropped Image" class="border w-36 h-36 rounded-full" />
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <el-button round class="primary-bg" :disabled="!imagePreview" :is-loading="isLoading" @click="saveCroppedImage">
          save cropped picture
        </el-button>
        <el-button round class="primary-bg" :is-loading="isLoading" @click="handleClose">
          Cancel
        </el-button>
      </div>
    </el-dialog>
  </span>
</template>
