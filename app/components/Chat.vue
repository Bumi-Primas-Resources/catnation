<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Send, Smile } from 'lucide-vue-next'

interface ChatProps {
  isDarkMode: boolean
}
interface ChatMessage {
  id: number
  username: string
  message: string
  timestamp: string
  color: string
}

const props = defineProps<ChatProps>()

const messages = ref<ChatMessage[]>([])
const newMessage = ref('')

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
const sampleMessages = [
  'OMG the orange cat is so cute! 🧡',
  'Look at those tiny paws! 🐾',
  'This stream makes my day better',
  'Whiskers is my favorite!',
  'Can we get more treats for them?',
  'So relaxing to watch 😊',
  'These cats are living their best life',
  'Thanks for the great stream! 💕'
]
const usernames = ['CatLover123', 'FluffyFan', 'WhiskerWatcher', 'PawPal', 'FelineFrend', 'MeowMaster']

let intervalId: number | undefined

function simulateMessage() {
  const msg: ChatMessage = {
    id: Date.now(),
    username: usernames[Math.floor(Math.random() * usernames.length)],
    message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    color: colors[Math.floor(Math.random() * colors.length)]
  }
  messages.value = [...messages.value.slice(-20), msg]
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  const msg: ChatMessage = {
    id: Date.now(),
    username: 'You',
    message: newMessage.value,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    color: '#FF1493'
  }
  messages.value.push(msg)
  newMessage.value = ''
}

onMounted(() => {
  intervalId = window.setInterval(simulateMessage, 3000)
  // initial burst
  for (let i = 0; i < 5; i++) setTimeout(simulateMessage, i * 500)
})
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div
    class="h-full rounded-2xl overflow-hidden shadow-xl"
    :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'"
  >
    <!-- Header -->
    <div
      class="p-4 border-b"
      :class="props.isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'"
    >
      <h3
        class="font-bold text-lg flex items-center"
        :class="props.isDarkMode ? 'text-pink-400' : 'text-orange-500'"
      >
        💬 Cat Chat
        <span
          class="ml-2 text-sm px-2 py-1 rounded-full"
          :class="props.isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'"
        >
          {{ messages.length }}
        </span>
      </h3>
    </div>

    <!-- Messages -->
    <div class="h-96 overflow-y-auto p-4 space-y-3 ">
      <div v-for="msg in messages" :key="msg.id" class="animate-slideIn">
        <div class="flex items-start space-x-2">
          <span class="font-bold text-sm" :style="{ color: msg.color }">
            {{ msg.username }}:
          </span>
          <span
            class="text-sm flex-1"
            :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'"
          >
            {{ msg.message }}
          </span>
          <span class="text-xs" :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-400'">
            {{ msg.timestamp }}
          </span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <form
      @submit.prevent="sendMessage"
      class="p-4 border-t"
      :class="props.isDarkMode ? 'border-gray-700' : 'border-gray-200'"
    >
      <div class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Say something nice..."
          class="flex-1 px-3 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2"
          :class="props.isDarkMode
            ? 'bg-gray-900 text-white placeholder-gray-400 focus:ring-pink-500'
            : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-orange-500'"
        />
        <button
          type="button"
          class="p-2 rounded-full transition-colors"
          :class="props.isDarkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-orange-500'"
          aria-label="emoji"
        >
          <Smile size="20" />
        </button>
        <button
          type="submit"
          class="p-2 rounded-full transition-all hover:scale-110"
          :class="props.isDarkMode ? 'bg-pink-600 text-white hover:bg-pink-500' : 'bg-orange-500 text-white hover:bg-orange-400'"
          aria-label="send"
        >
          <Send size="20" />
        </button>
      </div>
    </form>
    
  </div>
  
</template>
