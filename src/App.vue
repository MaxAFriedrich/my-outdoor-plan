<script lang="ts" setup>
import {watch} from 'vue';
import Usage from "@/components/Usage.vue";
import Tools from "@/components/Tools.vue";
import {type Field, fields} from "@/utils/fields";
import {notification} from "@/utils/utils";


fields.value.forEach(field => {
  let url = new URL(window.location.href);
  field.value = url.searchParams.get(field.id) || field.value;
});

watch(fields, () => {
  let url = new URL(window.location.href);
  fields.value.forEach(field => {
    url.searchParams.set(field.id, field.value);
  });
  window.history.pushState({}, '', url);
});


function isShort(field: Field) {
  return field.displayType !== 'textarea';
}

</script>

<template>
  <div class="notification" v-show="notification!=''">
    {{ notification }}
  </div>
  <h1>My Plan</h1>
  <p>A quick way to create a note to leave with someone you trust for them to give to emergency services when something
    goes wrong in the outdoors.</p>
  <div class="form">
    <div v-for="field in fields" :key="field.id" :class="{property: isShort(field), internal: field.isInternal}">
      <label :for="field.id">{{ field.friendlyName }}</label>
      <input v-if="isShort(field)" :type="field.displayType" :id="field.id" v-model="field.value"
             :placeholder="field.placeholder">
      <textarea v-else :id="field.id" v-model="field.value" :placeholder="field.placeholder"></textarea>
    </div>
  </div>
  <Tools/>
  <Usage/>
</template>
