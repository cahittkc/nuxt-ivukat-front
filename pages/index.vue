<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-800 to-black">
        <!-- Header -->
        <header  class="fixed w-full bg-gray-900/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-800">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-xl font-bold text-white">Ivukat</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <router-link to="/login" class="text-gray-300 hover:text-cyan-500 transition-colors duration-200">Giriş Yap</router-link>
                        <router-link to="/register" class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-200">Hemen Kayıt Ol</router-link>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section with Animation -->
        <section class="pt-32 pb-20 px-4">
            <div class="container mx-auto">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl font-bold text-white mb-6 animate-fade-in-up">
                        Hukuk Büronuzu <span class="text-cyan-500">Dijital</span> Dünyaya Taşıyın
                    </h1>
                    <p class="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
                        Modern ve yenilikçi çözümlerle hukuk büronuzu yönetin. Dava takibi, müvekkil ilişkileri ve daha fazlası tek bir platformda.
                    </p>
                    <router-link to="/register" class="inline-flex items-center px-8 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 text-lg font-medium animate-fade-in-up animation-delay-400">
                        Ücretsiz Deneyin
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-16 bg-gray-900">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="text-center animate-fade-in-up">
                        <div class="text-4xl font-bold text-cyan-500 mb-2 counter">500+</div>
                        <div class="text-gray-300">Aktif Hukuk Bürosu</div>
                    </div>
                    <div class="text-center animate-fade-in-up animation-delay-200">
                        <div class="text-4xl font-bold text-cyan-500 mb-2 counter">10K+</div>
                        <div class="text-gray-300">Yönetilen Dava</div>
                    </div>
                    <div class="text-center animate-fade-in-up animation-delay-400">
                        <div class="text-4xl font-bold text-cyan-500 mb-2 counter">50K+</div>
                        <div class="text-gray-300">Mutlu Müvekkil</div>
                    </div>
                    <div class="text-center animate-fade-in-up animation-delay-600">
                        <div class="text-4xl font-bold text-cyan-500 mb-2 counter">99%</div>
                        <div class="text-gray-300">Müşteri Memnuniyeti</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section with Hover Effects -->
        <section class="py-20 bg-gray-900">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-700">
                        <div class="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-4">Dava Yönetimi</h3>
                        <p class="text-gray-300">Dava süreçlerinizi dijital ortamda takip edin, önemli tarihleri kaçırmayın ve tüm belgeleri düzenli tutun.</p>
                    </div>

                    <div class="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-700">
                        <div class="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-4">Müvekkil İlişkileri</h3>
                        <p class="text-gray-300">Müvekkillerinizle iletişiminizi güçlendirin, dosya paylaşımını kolaylaştırın ve süreçleri şeffaf tutun.</p>
                    </div>

                    <div class="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-700">
                        <div class="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-4">Analitik Raporlar</h3>
                        <p class="text-gray-300">Dava istatistiklerinizi analiz edin, performansınızı ölçün ve veriye dayalı kararlar alın.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-20 bg-gray-900">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center text-white mb-12">Müşterilerimiz Ne Diyor?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gray-800 p-8 rounded-xl animate-fade-in-up border border-gray-700">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-500 font-bold text-xl">A</div>
                            <div class="ml-4">
                                <div class="font-semibold text-white">Av. Ahmet Yılmaz</div>
                                <div class="text-gray-400 text-sm">Yılmaz Hukuk Bürosu</div>
                            </div>
                        </div>
                        <p class="text-gray-300">"Ivukat ile dava yönetimimiz tamamen değişti. Artık her şey daha düzenli ve verimli."</p>
                    </div>
                    <div class="bg-gray-800 p-8 rounded-xl animate-fade-in-up animation-delay-200 border border-gray-700">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-500 font-bold text-xl">M</div>
                            <div class="ml-4">
                                <div class="font-semibold text-white">Av. Mehmet Demir</div>
                                <div class="text-gray-400 text-sm">Demir & Demir Hukuk</div>
                            </div>
                        </div>
                        <p class="text-gray-300">"Müvekkil ilişkilerimiz çok daha iyi hale geldi. Dosya paylaşımı ve iletişim artık çok kolay."</p>
                    </div>
                    <div class="bg-gray-800 p-8 rounded-xl animate-fade-in-up animation-delay-400 border border-gray-700">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-500 font-bold text-xl">Z</div>
                            <div class="ml-4">
                                <div class="font-semibold text-white">Av. Zeynep Kaya</div>
                                <div class="text-gray-400 text-sm">Kaya Hukuk</div>
                            </div>
                        </div>
                        <p class="text-gray-300">"Analitik raporlar sayesinde büromuzun performansını daha iyi takip edebiliyoruz."</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section with Animation -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="bg-gray-800 rounded-2xl p-12 text-center animate-fade-in-up border border-gray-700">
                    <h2 class="text-3xl font-bold text-white mb-6">Hukuk Büronuzu Geleceğe Taşıyın</h2>
                    <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Modern çözümlerle hukuk büronuzu yönetin, verimliliğinizi artırın ve müvekkillerinize daha iyi hizmet verin.
                    </p>
                    <router-link to="/register" class="inline-flex items-center px-8 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 text-lg font-medium">
                        Hemen Başlayın
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'


 const authStore = useAuthStore()


const handle = () => {
    console.log("authstore",authStore.authInfo)
}   

handle();


</script>

<style scoped>

</style>
