<template>
  <footer class="footer">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Logo ve Başlık -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-blue-400 mb-2">IVUKAT</h2>
        <p class="text-gray-400">Akıllı Hukuk Asistanı</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
        <!-- Hızlı Linkler -->
        <div class="text-white">
          <h3 class="text-xl font-bold mb-4">Hızlı Linkler</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/hakkimizda" class="hover:text-blue-400 transition-colors duration-300">Hakkımızda</NuxtLink></li>
            <li><NuxtLink to="/hizmetlerimiz" class="hover:text-blue-400 transition-colors duration-300">Hizmetlerimiz</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-blue-400 transition-colors duration-300">Blog</NuxtLink></li>
            <li><NuxtLink to="/iletisim" class="hover:text-blue-400 transition-colors duration-300">İletişim</NuxtLink></li>
          </ul>
        </div>

        <!-- İletişim Bilgileri -->
        <div class="text-white">
          <h3 class="text-xl font-bold mb-4">İletişim</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <i class="fas fa-phone text-blue-400 mr-3 text-xl"></i>
              <p>+90 555 000 00 00</p>
            </div>
            <div class="flex items-center">
              <i class="fas fa-envelope text-blue-400 mr-3 text-xl"></i>
              <p>info@ivukat.com</p>
            </div>
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-blue-400 mr-3 text-xl"></i>
              <p>İstanbul, Türkiye</p>
            </div>
          </div>
        </div>

        <!-- Sosyal Medya -->
        <div class="text-white">
          <h3 class="text-xl font-bold mb-4">Sosyal Medya</h3>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
              <i class="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-red-400 transition-colors duration-300">
              <i class="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-blue-600 transition-colors duration-300">
              <i class="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="text-white">
          <h3 class="text-xl font-bold mb-4">Bültenimize Katılın</h3>
          <p class="mb-4">Yeni hukuki gelişmelerden haberdar olun.</p>
          <div class="flex space-x-2">
            <input type="email" placeholder="E-posta adresinizi girin" class="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 pt-8 text-center text-white">
        <p class="mb-2">&copy; {{ new Date().getFullYear() }} IVUKAT. Tüm hakları saklıdır.</p>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/gizlilik-politikasi" class="hover:text-blue-400 transition-colors duration-300">Gizlilik Politikası</NuxtLink>
          <NuxtLink to="/kullanım-şartları" class="hover:text-blue-400 transition-colors duration-300">Kullanım Şartları</NuxtLink>
          <NuxtLink to="/kullanıcı-şartları" class="hover:text-blue-400 transition-colors duration-300">Kullanıcı Şartları</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #0c0c0c;
  padding: 6rem 0 2rem;
}

.footer input[type="email"] {
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}

.footer input[type="email"]:focus {
  border-color: #3b82f6;
  background-color: rgba(255,255,255,0.05);
}

.footer button {
  transition: all 0.3s ease;
}

.footer h3 {
  color: #fff;
  margin-bottom: 1rem;
}

.footer p {
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.footer .fab, .footer .fas {
  transition: all 0.3s ease;
}

.footer .fab:hover {
  transform: translateY(-2px);
}

.footer .fab:active {
  transform: translateY(0);
}
</style>