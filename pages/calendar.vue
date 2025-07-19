<template>
  <div class="minh">
    <vue-cal
      class="mt-5"  
      @view-change="getCalendar($event)"
      :time-from="8 * 60"
      :time-to="18 * 60"
      :time-step="5"
      locale="tr"
      :views-bar="false"
      :views="['month']"
      dark
      :events="events"
      events-on-month-view="true"
      :events-count-on-month-view="true"
      :hide-weekends="false"
      :disable-views="['day', 'years', 'year']"
      @event-click="showEventDetails"
      @cell-click="openEventModal">
      <template #event="{ event }">
        <div class="event-container" :class="getEventClass(event)">
          <div class="event-time">
            {{ formatTime(event.hearingDate) }}
          </div>
          <div class="event-info">
            <div class="event-title">{{ event.courtNameDescription }}</div>
            <div class="event-content">{{ event.hearingDescription }}</div>
            <div class="event-status" :class="getStatusClass(event.hearingResultDescription)">
              {{ event.hearingResultDescription }}
            </div>
          </div>
        </div>
      </template>
    </vue-cal>

    <!-- Event Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Yeni Takvim Ekle</h3>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveEvent">
            <div class="form-group">
              <label>Görüşme Türü</label>
              <select v-model="newEvent.type" required>
                <option value="">Seçiniz</option>
                <option value="meeting">Görüşme</option>
                <option value="hearing">Duruşma</option>
                <option value="settlement">Uzlaşma</option>
                <option value="other">Diğer</option>
              </select>
            </div>
            <div class="form-group">
              <label>Title</label>
              <input v-model="newEvent.title" type="text" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <input v-model="newEvent.description" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Saat</label>
              <input v-model="selectedTime" type="time" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="save-button">Kaydet</button>
              <button type="button" @click="closeModal" class="cancel-button">İptal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueCal } from "vue-cal";
import "vue-cal/style";
import moment from "moment";
definePageMeta({
  layout: "auth",
});

import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { apiRequest } from '@/utils/axiosService'

const authStore = useAuthStore()
const hearings = ref()

const events = computed(() => {
  if (!hearings.value) return []
  return hearings.value.map((hearing: any) => ({
    ...hearing,
    start: formatTime(hearing.hearingDate),
    end: formatTime(hearing.hearingDate),
    id: hearing.hearingId,
    title: hearing.courtNameDescription,
    content: hearing.hearingDescription,
    class: getEventClass(hearing)
  }))
})

const listObj = ref({
    userId: null as string | null,
    startDate : null as string | null,
    endDate : null as string | null
})

const showModal = ref(false)
const selectedDate = ref('')
const selectedTime = ref('')
const newEvent = ref({
  title: '',
  description: '',
  date : '',
  type : '',
  userId: authStore?.session?.id
})

const openEventModal = (cell : any) => {
  selectedDate.value = cell.cursor.date
  console.log(cell.cursor.date);
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  newEvent.value = {
    title: '',
    description: '',
    date : '',
    type : '',
    userId: authStore?.session?.id
  }
}


const getCalendar = (event :any) => {
    listObj.value.startDate = moment(event.start).format('YYYY-MM-DD HH:mm:ssZ')
    listObj.value.endDate = moment(event.end).format('YYYY-MM-DD HH:mm:ssZ')
    getHearings()
}


const saveEvent = async () => {
  console.log(selectedDate.value);  // Original date (e.g., Fri Jul 18 2025 09:30:00 GMT+0300)
  console.log(selectedTime.value);  // Time string (e.g., "12:00")
  
  const [hours, minutes] = selectedTime.value.split(':').map(Number);
  
  const updatedDate = new Date(selectedDate.value);
  updatedDate.setHours(hours, minutes, 0, 0);
  
  newEvent.value.date = moment(updatedDate).format('YYYY-MM-DD HH:mm:ssZ')

  try {
    const response = await apiRequest('post', '/calendar/add-calendar', newEvent.value)
    if(response.data.success){
      closeModal();
    }
  } catch (error) {
    console.log(error);
  }
}



const getHearings = async () => {
    try {
      listObj.value.userId = authStore?.session?.id as string
      const response = await apiRequest('post', `/hearings/get-hearings`, listObj.value)
      if(response.data.success){
        hearings.value = response.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

const formatTime = (hearingDate: string) => {
  return moment(new Date(hearingDate)).format('YYYY-MM-DD HH:mm')
}

const getEventClass = (event: any) => {
  return {
    'event-commercial': event.hearingDescription === 'Duruşma',
    'event-critical': event.hearingResultDescription === 'Kabul Edildi',
    'event-warning': event.hearingResultDescription === 'Reddedildi',
    'event-info': event.hearingResultDescription === 'Günü Verildi',
    'event-success': event.hearingResultDescription === 'Devam Ediyor'
  }
}

const getStatusClass = (status: string) => {
  return {
    'status-success': status === 'Günü Verildi',
    'status-warning': status === 'Devam Ediyor',
    'status-danger': status === 'Kabul Edildi',
    'status-info': status === 'Reddedildi'
  }
}

const showEventDetails = (event: any) => {
  // Implement event details modal or navigation here
  console.log('Event clicked:', event)
}

onMounted(() => {
    const currentMonth = moment()
    listObj.value.startDate = currentMonth.startOf('month').format('YYYY-MM-DD HH:mm:ssZ')
    listObj.value.endDate = currentMonth.endOf('month').format('YYYY-MM-DD HH:mm:ssZ')
    getHearings()
})

</script>

<style scoped>
.vuecal {
  --vuecal-primary-color: #2563eb;
  --vuecal-height: 100%;
  --vuecal-secondary-color: #1f2937;
  --vuecal-base-color: #fff;
  --vuecal-contrast-color: #f3f4f6;
  --vuecal-header-color: #f3f4f6;
  --vuecal-event-color: #fff;
  --vuecal-event-border-color: rgba(255, 255, 255, 0.1);
  --vuecal-border-radius: 12px;
  --vuecal-min-schedule-width: 0px;
  --vuecal-event-min-height: 40px;
  --vuecal-event-border-radius: 12px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #1f2937;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: #fff;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.save-button,
.cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.save-button {
  background: #2563eb;
  color: #fff;
}

.cancel-button {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.vuecal__title{
    margin-left: 30px;
}

.event-container {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: var(--vuecal-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
}

.event-container:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.event-time {
  font-size: 12px;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 500;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.event-content {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

.event-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-top: 4px;
  color: #fff;
  font-weight: 500;
}

.status-success {
  background-color: #10b981;
  color: #f3f4f6;
}

.status-warning {
  background-color: #f59e0b;
  color: #f3f4f6;
}

.status-danger {
  background-color: #ef4444;
  color: #f3f4f6;
}

.status-info {
  background-color: #3b82f6;
  color: #f3f4f6;
}

.event-info {
  background-color: var(--event-info-bg);
  color: var(--event-info-text);
}

.event-success {
  background-color: var(--event-success-bg);
  color: var(--event-success-text);
}

.event-warning {
  background-color: var(--event-warning-bg);
  color: var(--event-warning-text);
}

.event-danger {
  background-color: var(--event-danger-bg);
  color: var(--event-danger-text);
}

.event-commercial {
  background-color: var(--event-commercial-bg);
  color: var(--event-commercial-text);
}

.vuecal__menu-item {
  color: var(--vuecal-contrast-color);
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.vuecal__menu-item:hover {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--vuecal-primary-color);
}

.vuecal__cell {
  background-color: var(--vuecal-base-color);
  border-right: var(--vuecal-day-cell-border-right);
  border-bottom: var(--vuecal-day-cell-border-bottom);
  transition: var(--vuecal-day-transition);
}

.vuecal__cell:hover {
  background-color: rgba(37, 99, 235, 0.05);
}

.vuecal__cell--today .vuecal__cell-date {
    background: rgb(203, 8, 8) !important;
}

.vuecal__cell--selected {
  background-color: var(--vuecal-selected-color);
}

.vuecal__event {
  background-color: var(--vuecal-event-background-color);
  color: var(--vuecal-event-text-color);
  border: var(--vuecal-event-border-width) var(--vuecal-event-border-style) var(--vuecal-event-border-color);
  border-radius: var(--vuecal-event-border-radius);
  padding: var(--vuecal-event-padding);
  margin: var(--vuecal-event-margin);
  min-height: var(--vuecal-event-min-height);
  max-height: var(--vuecal-event-max-height);
  overflow: var(--vuecal-event-overflow);
  text-overflow: var(--vuecal-event-text-overflow);
  white-space: var(--vuecal-event-white-space);
  font-weight: var(--vuecal-event-font-weight);
  line-height: var(--vuecal-event-line-height);
  text-transform: var(--vuecal-event-text-transform);
  letter-spacing: var(--vuecal-event-letter-spacing);
  text-shadow: var(--vuecal-event-text-shadow);
  box-shadow: var(--vuecal-event-box-shadow);
  transition: var(--vuecal-event-transition);
}

.vuecal__event:hover {
  background-color: var(--vuecal-event-hover-color);
  transform: scale(var(--vuecal-event-hover-scale));
  box-shadow: var(--vuecal-event-hover-box-shadow);
}

.vuecal__header {
  background-color: var(--vuecal-secondary-color);
  color: var(--vuecal-header-color);
  border-bottom: var(--vuecal-day-header-border-bottom);
  height: var(--vuecal-header-height);
  padding: var(--vuecal-header-padding);
  font-size: var(--vuecal-header-font-size);
  transition: var(--vuecal-header-transition);
}

.vuecal__day-header {
  color: var(--vuecal-header-color);
  font-size: var(--vuecal-day-header-font-size);
  height: var(--vuecal-day-header-height);
  border-bottom: var(--vuecal-day-header-border-bottom);
}

.vuecal__day {
  height: var(--vuecal-day-cell-height);
  font-size: var(--vuecal-day-cell-font-size);
  transition: var(--vuecal-day-transition);
}

.vuecal__menu {
  background-color: var(--vuecal-secondary-color);
  border-radius: var(--vuecal-border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.vuecal__menu-item {
  color: var(--vuecal-contrast-color);
  transition: color 0.25s ease;
}

.vuecal__menu-item:hover {
  color: var(--vuecal-primary-color);
}

@media (max-width: 768px) {
  .vuecal {
    --vuecal-header-font-size: 14px;
    --vuecal-day-header-font-size: 12px;
    --vuecal-day-cell-font-size: 12px;
    --vuecal-event-font-size: 12px;
    --vuecal-header-height: 50px;
    --vuecal-day-header-height: 35px;
    --vuecal-day-cell-height: 50px;
  }
}
</style>
