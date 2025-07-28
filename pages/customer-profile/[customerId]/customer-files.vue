<template>
    <div class="xs-txt">
       <div class=" rounded-lg overflow-hidden flex ml-auto flex-col h-fit">
                <FilePond
                    styleButtonRemoveItemPosition="right"
                    ref="pond"
                    max-files="1"
                    :files="files"
                    accepted-file-types="image/*,application/pdf"
                />
       </div>

       <div class="flex w-full justify-end items-center mt-4">
        <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-auto" @click="submit">Submit</button>
       </div>


       <div class="overflow-x-auto rounded-2xl shadow-xl bg-gray-900 p-1 mt-4">
            <table class="min-w-full w-full divide-y divide-gray-800">
                <thead class="bg-gray-900">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Dosya adı</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Dosya Açıklaması</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Tarih</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(caseItem, index) in customerFiles"
                        :key="caseItem.id"
                        class="hover:bg-gray-900 transition border-b border-gray-800"
                    >
                        <td class="px-4 py-3 text-blue-400 whitespace-nowrap max-w-[200px]">
                            <a @click="dowloandFile(caseItem)" class="truncate block cursor-pointer">{{ caseItem.fileName }}</a>
                        </td>
                        <td class="px-4 py-3 text-gray-100 cursor-pointer">{{ caseItem.description }}</td>
                        <td class="px-4 py-3 text-gray-300">{{ moment(caseItem.createdAt).format('DD.MM.YYYY HH:mm:ss') }}</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
       
    </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import moment from 'moment';
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


const dowloandFile = async (data: any) => {
    const url = new URL(data.fileUrl);
    const key = url.pathname.slice(1);

    let newData = {
        customerId : data.id,
        key : key
    }
    const result = await apiRequest('post', 'files/dowloand-file', newData)
    if(result.data.success){
        window.open(result.data.data, '_blank');
    }
    else{
        console.log(result.data);
    }
}
    





onMounted(() => {
    document.querySelector('.filepond--credits')?.remove()
    getCustomerFiles()
})

</script>
