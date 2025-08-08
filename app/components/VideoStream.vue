<script setup lang="ts">
import { Heart, DollarSign } from 'lucide-vue-next'

interface OverlayName {
  name: string
  x: number
  y: number
}

interface VideoStreamProps {
  isDarkMode: boolean
  onDonateClick: () => void
}

const props = defineProps<VideoStreamProps>()

// Static overlay names
// const overlayNames: OverlayName[] = [
//   { name: 'Justin Ng', x: 20, y: 30 },
//   { name: 'Whiskers', x: 60, y: 70 },
//   { name: 'FluffyTail', x: 15, y: 80 }
// ]
</script>

<template>
  <div class="space-y-4">
    <!-- Video Wrapper -->
    <div
      class="relative rounded-2xl overflow-hidden aspect-video group hover:scale-[1.02] transition-transform duration-300"
      :class="props.isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
    >
      <!-- Placeholder Stream -->
      <div class="w-full h-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <!-- Stream Info Center -->
        <div class="text-white text-center z-10">
          <div class="text-6xl mb-4">🐱</div>
          <p class="text-xl font-semibold">Live Cat Stream</p>
          <p class="text-sm opacity-80">Currently streaming adorable cats!</p>
        </div>

        <!-- Live Indicator -->
        <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          🔴 LIVE
        </div>

        <!-- Floating Overlays -->
        <div
          v-for="(overlay, index) in overlayNames"
          :key="index"
          class="absolute bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm animate-bounce"
          :style="{
            left: `${overlay.x}%`,
            top: `${overlay.y}%`,
            animationDelay: `${index * 0.5}s`
          }"
        >
          🐾 {{ overlay.name }}
        </div>

        <!-- Viewer Count -->
        <div class="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          👥 1,234 viewers
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2
          class="text-2xl font-bold"
          :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
        >
          Adorable Cats Playing Live! 🐱
        </h2>
        <p
          class="text-sm"
          :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
        >
          Watch our rescue cats in their natural habitat
        </p>
      </div>


    </div>
  </div>
</template>
