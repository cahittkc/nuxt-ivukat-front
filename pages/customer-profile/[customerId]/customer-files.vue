<template>
    <div class="xs-txt">
       
       <div class=" max-w-[320px] rounded-lg overflow-hidden">
            <no-ssr>
                <FilePond
                    styleButtonRemoveItemPosition="right"
                    ref="pond"
                    max-files="1"
                    :files="files"
                    accepted-file-types="image/*,application/pdf"
                />
        </no-ssr>
       </div>
       <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-auto" @click="submit">Submit</button>
    </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const auth = useAuthStore();
const route = useRoute();

// Pluginleri FilePond'a tanıt
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

const pond = ref<any>(null);           // FilePond instance'ı
const files = ref<any>();  
const customerFiles = ref<any>([]);


watch(files, () => {
    console.log(files.value);
})


// Örnek olarak submit butonunda dosyaları loglamak istersen
const submit = async () => {
    pond.value?.processFiles();
    const datas = pond.value?.getFiles();
    const file = datas[0].file;
    const formData = new FormData();
    formData.append('file', file);
    if(auth.session?.id){
        formData.append('userId', auth.session?.id);
    }
    formData.append('customerId', route.params.customerId as string); 
    formData.append('description', 'deneme');

    const result = await apiRequest('post', 'files/upload', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
    if(result.data.success){
        pond.value?.removeFiles();
    }else{
        console.log(result.data);
    }
}


const getCustomerFiles = async () => {
    try {
        const result = await apiRequest('post', 'files/get-customer-files', {customerId: route.params.customerId})
        if(result.data.success){
            customerFiles.value = result.data.data;
        }
    } catch (error) {
        console.log(error)
    }
}





onMounted(() => {
    document.querySelector('.filepond--credits')?.remove()
    getCustomerFiles()
})

</script>
