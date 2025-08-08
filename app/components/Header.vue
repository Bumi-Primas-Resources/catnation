<script setup lang="ts">
import { Sun, Moon, User, UserPlus } from 'lucide-vue-next'

interface HeaderProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const props = defineProps<HeaderProps>()
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-sm bg-opacity-95"
    :class="props.isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center  md:flex gap-x-4">
          <h1
            class="text-2xl font-black tracking-tight hover:scale-105 transition-transform cursor-pointer"
            :class="props.isDarkMode ? 'text-pink-400' : 'text-orange-500'"
          >
            🐾 CATNATION
          </h1>

          <div class="hidden md:flex">                   
             
            <a
            href="#about"
            class="font-medium transition-colors"
            :class="props.isDarkMode 
              ? 'text-gray-300 hover:text-pink-400' 
              : 'text-gray-700 hover:text-orange-500'"
          >
            About Us
          </a></div>

        </div>

        <!-- Navigation (Desktop) -->
        <nav class=" md:flex items-center space-x-8">

<div class="hidden  md:flex items-center space-x-8">
          <!-- Sign Up Button -->
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
            :class="props.isDarkMode
              ? 'bg-pink-600 hover:bg-pink-500 text-white'
              : 'bg-orange-500 hover:bg-orange-400 text-white'"
          >
            <UserPlus size="18" />
            <span>Sign Up</span>
          </button>

          <!-- Login Button -->
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
            :class="props.isDarkMode
              ? 'border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white'
              : 'border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'"
          >
            <User size="18" />
            <span>Login</span>
          </button>
</div>

                  <button
          @click="props.toggleDarkMode"
          class="p-2 rounded-full transition-all hover:scale-110"
          :class="props.isDarkMode
            ? 'bg-gray-800 text-pink-400 hover:bg-gray-700'
            : 'bg-gray-100 text-orange-500 hover:bg-gray-200'"
        >
          <component :is="props.isDarkMode ? Sun : Moon" size="20" />
        </button>

        </nav>

        <!-- Dark/Light Mode Toggle -->

      </div>
    </div>
  </header>
</template>
