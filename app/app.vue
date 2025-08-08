<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Heart } from 'lucide-vue-next'

// Use imports if you're not relying on Nuxt auto-imports
import Header from '@/components/Header.vue'
import VideoStream from '@/components/VideoStream.vue'
import Chat from '@/components/Chat.vue'
import DonationModal from '@/components/DonationModal.vue'

const isDarkMode = ref(false)
const isDonationModalOpen = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const openDonationModal = () => { isDonationModalOpen.value = true }
const closeDonationModal = () => { isDonationModalOpen.value = false }

// Optional: ensure dark class matches initial state (e.g., from storage)
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="isDarkMode ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <Header :is-dark-mode="isDarkMode" :toggle-dark-mode="toggleDarkMode" />

    <!-- Center the stream area vertically + horizontally -->
<main class="flex justify-center items-center min-h-[calc(100vh-72px)] px-4 py-6">
  <div class="w-full max-w-7xl flex gap-6 items-stretch">
    
    <!-- VIDEO - takes more width -->
    <div class="flex-[2] rounded-lg overflow-hidden flex">
      <VideoStream
        :is-dark-mode="isDarkMode"
        :on-donate-click="openDonationModal"
        :fill="true"
        class="w-full h-full"
      />
    </div>

    <!-- CHAT - fixed width -->
    <aside class="w-[22rem] flex flex-col">
      <Chat :is-dark-mode="isDarkMode" class="flex-1" />
      <button
        @click="openDonationModal"
        class="mt-4 w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
        :class="isDarkMode
          ? 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 shadow-pink-500/25'
          : 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 shadow-orange-500/25'"
      >
        ❤️ Support Our Cats
      </button>
    </aside>

  </div>
</main>

    <!-- Mobile floating donate (since chat stacks under video) -->
    <div class="lg:hidden fixed bottom-6 right-6 z-40">
      <button
        @click="openDonationModal"
        class="p-4 rounded-full font-bold text-white shadow-2xl transition-all hover:scale-110"
        :class="isDarkMode
          ? 'bg-gradient-to-r from-pink-600 to-pink-500 shadow-pink-500/25'
          : 'bg-gradient-to-r from-orange-500 to-orange-400 shadow-orange-500/25'"
        aria-label="Donate"
      >
        <Heart size="22" />
      </button>
    </div>

    <!-- Donation Modal -->
    <DonationModal
      :is-open="isDonationModalOpen"
      :on-close="closeDonationModal"
      :is-dark-mode="isDarkMode"
    />
  </div>
</template>
