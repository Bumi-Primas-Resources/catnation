<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X, Heart, CreditCard, Shield } from 'lucide-vue-next'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}
const props = defineProps<DonationModalProps>()

const selectedAmount = ref<number | null>(null)
const customAmount = ref('')
type Freq = 'one-time' | 'monthly' | 'annual'
const frequency = ref<Freq>('one-time')

const formData = ref({
  email: '',
  name: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  country: ''
})
const captchaChecked = ref(false)

const predefinedAmounts = [10, 20, 50, 100, 200] as const
const frequencies: Freq[] = ['one-time', 'monthly', 'annual']

const displayAmount = computed(() => {
  if (selectedAmount.value) return `RM${selectedAmount.value}`
  if (customAmount.value) return `RM${customAmount.value}`
  return ''
})

function handleSubmit() {
  if (!captchaChecked.value) {
    alert('Please verify that you are human')
    return
  }
  alert('Thank you for your donation! 🐾💕')
  props.onClose()
}

// Optional: lock body scroll when modal is open
watch(() => props.isOpen, (open) => {
  document.body.classList.toggle('overflow-hidden', open)
})
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <!-- Modal Container -->
<div
  class="w-full max-w-[92vw] sm:max-w-[900px] lg:max-w-[1100px] 
         max-h-[85vh] sm:max-h-[90vh] lg:max-h-none 
         overflow-y-auto lg:overflow-y-visible 
         rounded-2xl sm:rounded-3xl shadow-2xl"
  :class="props.isDarkMode ? 'bg-gray-900' : 'bg-white'"
>
      <!-- Header -->
      <div
        class="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b"
        :class="props.isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'"
      >
        <h2
          class="text-xl sm:text-2xl font-bold flex items-center"
          :class="props.isDarkMode ? 'text-pink-400' : 'text-orange-500'"
        >
          <Heart class="mr-3" :size="28" />
          Support Our Cats
        </h2>

        <button
          @click="props.onClose"
          class="p-2 rounded-full transition-colors"
          :class="props.isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'"
          aria-label="close"
        >
          <X :size="24" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-4 sm:p-6 space-y-6">
        <!-- Amount -->
        <div>
          <label class="block text-lg font-semibold mb-4" :class="props.isDarkMode ? 'text-white' : 'text-gray-900'">
            Choose Donation Amount (RM)
          </label>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <button
              v-for="amount in predefinedAmounts"
              :key="amount"
              type="button"
              @click="selectedAmount = amount; customAmount = ''"
              class="p-3 sm:p-4 rounded-xl font-bold transition-all hover:scale-105"
              :class="selectedAmount === amount
                ? (props.isDarkMode ? 'bg-pink-600 text-white ring-2 ring-pink-400' : 'bg-orange-500 text-white ring-2 ring-orange-300')
                : (props.isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')"
            >
              RM{{ amount }}
            </button>
          </div>

          <input
            type="number"
            placeholder="Other amount (RM)"
            v-model="customAmount"
            @input="selectedAmount = null"
            class="w-full p-3 sm:p-4 rounded-xl transition-all focus:outline-none focus:ring-2"
            :class="props.isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-pink-500' : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-orange-500'"
          />
        </div>

        <!-- Frequency -->
        <div>
          <label class="block text-lg font-semibold mb-4" :class="props.isDarkMode ? 'text-white' : 'text-gray-900'">
            Donation Frequency
          </label>

          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="freq in frequencies"
              :key="freq"
              type="button"
              @click="frequency = freq"
              class="p-3 rounded-xl font-medium transition-all capitalize"
              :class="frequency === freq
                ? (props.isDarkMode ? 'bg-pink-600 text-white' : 'bg-orange-500 text-white')
                : (props.isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')"
            >
              {{ freq.replace('-', ' ') }}
            </button>
          </div>
        </div>

        <!-- Contact -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            v-model="formData.email"
            required
            class="p-3 sm:p-4 rounded-xl transition-all focus:outline-none focus:ring-2"
            :class="props.isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-pink-500' : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-orange-500'"
          />
          <input
            type="text"
            placeholder="Name"
            v-model="formData.name"
            required
            class="p-3 sm:p-4 rounded-xl transition-all focus:outline-none focus:ring-2"
            :class="props.isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-pink-500' : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-orange-500'"
          />
        </div>

        <!-- reCAPTCHA -->
        <div class="flex items-center space-x-3">
          <input
            id="captcha"
            type="checkbox"
            v-model="captchaChecked"
            class="w-5 h-5 rounded"
          />
          <label
            for="captcha"
            class="flex items-center text-sm"
            :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'"
          >
            <Shield class="mr-2" :size="16" />
            I'm not a robot (reCAPTCHA)
          </label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 transform"
          :class="props.isDarkMode
            ? 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 shadow-lg shadow-pink-500/25'
            : 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 shadow-lg shadow-orange-500/25'"
        >
          🐾 Donate {{ displayAmount }} Now
        </button>
      </form>
    </div>
  </div>
</template>
