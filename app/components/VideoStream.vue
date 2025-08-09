<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isDarkMode: boolean
  onDonateClick: () => void
  // optional: pass the full YouTube URL or just the ID
  youtubeUrl?: string
  youtubeId?: string
}
const props = defineProps<Props>()

// Grab the ID from either youtubeId prop or from a full URL like /live/<id> or /watch?v=<id>
const videoId = computed(() => {
  if (props.youtubeId) return props.youtubeId
  const url = props.youtubeUrl || ''
  // try /live/<id>
  let m = url.match(/\/live\/([a-zA-Z0-9_-]+)/)
  if (m?.[1]) return m[1]
  // try v= param
  m = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (m?.[1]) return m[1]
  return '-m_nQT62B4Y' // fallback to your live id
})

const embedUrl = computed(() =>
  `https://www.youtube-nocookie.com/embed/${videoId.value}?autoplay=1&mute=1&playsinline=1&rel=0`
)
</script>

<template>
  <div class="space-y-4">
    <div
      class="relative rounded-2xl overflow-hidden aspect-video group hover:scale-[1.02] transition-transform duration-300"
      :class="props.isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
    >
      <!-- YouTube Live iframe -->
      <iframe
        :src="embedUrl"
        class="absolute inset-0 w-full h-full"
        title="YouTube Live"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>

      <!-- Optional overlays (keep if you want them above video) -->
      <div class="pointer-events-none absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        🔴 LIVE
      </div>
      <div class="pointer-events-none absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        👥 Live viewers
      </div>
    </div>

    <!-- Your info + donate button stays the same below -->
    <!-- ... -->
  </div>
</template>
