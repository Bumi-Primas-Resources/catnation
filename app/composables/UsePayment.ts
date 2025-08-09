export const usePayment = () => {
  const config = useRuntimeConfig()

  const pay = async ({ amount, to, email, phone }: {
    amount: number
    to: string
    email: string
    phone: string
  }) => {
    try {
      const response = await $fetch('/pay', {
        baseURL: config.public.apiBase, // ✅ automatically uses https://cat.megumin.dev/api
        method: 'POST',
        body: { amount, to, email, phone },
        redirect: 'manual'
      })

      if ((response as any)?.url) {
        window.location.href = (response as any).url
      }
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  return { pay }
}
