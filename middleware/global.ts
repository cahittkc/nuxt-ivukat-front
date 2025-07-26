export default defineNuxtRouteMiddleware((to, from) => {
    // Her sayfa geçişinde çalışacak kodlar
    console.log('Sayfa değişiyor:', from.path, '->', to.path)
    
    // Örnek: Sayfa başlığını güncelleme
    const title = to.meta.title || 'NuxtFirst'
    useHead({
      title: title
    })
    
    // Client-side kontrolü
    if (process.client) {
      // Örnek: Sayfa yükleme durumunu kontrol etme
      const nuxtApp = useNuxtApp()
      nuxtApp.hook('page:start', () => {
        // Sayfa yüklenmeye başladığında
        console.log('Sayfa yükleniyor...')
      })
      
      nuxtApp.hook('page:finish', () => {
        // Sayfa yüklendiğinde
        console.log('Sayfa yüklendi!')
      })
    }
  }) 