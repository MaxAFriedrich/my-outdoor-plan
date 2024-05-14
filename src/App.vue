<script lang="ts" setup>
import {type Ref, ref, watch} from 'vue';

const notification = ref("");

type Field = {
  id: string,
  friendlyName: string,
  value: string,
  displayType: string,
  placeholder?: string,
  isInternal?: boolean
}

const fields: Ref<Array<Field>> = ref([
  {
    id: 'deadline',
    friendlyName: 'Deadline Time',
    value: new Date().toISOString().substring(0, 16),
    displayType: 'datetime-local'
  },
  {
    id: 'eta',
    friendlyName: 'ETA back at car',
    value: new Date().toISOString().substring(0, 16),
    displayType: 'datetime-local'
  },
  {id: 'leader', friendlyName: 'Leader', value: '', displayType: 'text', placeholder: 'Joe Blogs'},
  {id: 'phone', friendlyName: 'Phone Number', value: '', displayType: 'tel', placeholder: '071234 56789'},
  {id: 'vehicle', friendlyName: 'Vehicle', value: '', displayType: 'text', placeholder: 'AB12 CDE'},
  {id: 'partySize', friendlyName: 'Party Size', value: '', displayType: 'number', placeholder: '5'},
  {id: 'map', friendlyName: 'Map Used', value: '', displayType: 'text', placeholder: 'OL 1'},
  {id: 'start', friendlyName: 'Start Point', value: '', displayType: 'text', placeholder: 'Car Park'},
  {id: 'startGrid', friendlyName: 'Start Grid Reference', value: '', displayType: 'text', placeholder: 'SX 1234 1234'},
  {
    id: 'finish',
    friendlyName: 'Finish Point',
    value: 'Same as start point.',
    displayType: 'text',
    placeholder: 'Car Park'
  },
  {
    id: 'finishGrid',
    friendlyName: 'Finish Grid Reference',
    value: '',
    displayType: 'text',
    placeholder: 'SX 1234 1234'
  },
  {
    id: 'route',
    friendlyName: 'Route',
    value: '',
    displayType: 'textarea',
    placeholder: 'Car Park > north to A > west to B > lunch at Grid Reference SX 1234 1234 > Return via same route > Car Park.'
  },
  {
    id: 'kitList',
    friendlyName: 'Kit List',
    value: 'First aid kit, map/compass, and shelter being carried.',
    displayType: 'textarea'
  },
  {
    id: 'notes',
    friendlyName: 'Notes',
    value: '',
    displayType: 'textarea',
    placeholder: 'Any other information that may be useful.'
  },
  {
    id: 'fromEmail',
    friendlyName: 'From email',
    value: '',
    displayType: 'email',
    isInternal: true
  },
  {
    id: 'toEmails',
    friendlyName: 'To emails',
    value: '',
    displayType: 'textarea',
    placeholder: 'Emails to send this to route plan to.',
    isInternal: true
  },
  {
    id: 'subject',
    friendlyName: 'Email Subject',
    value: 'Route Plan',
    displayType: 'text',
    isInternal: true
  }
]);

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


function generateText() {
  const start = "Hi,\n\nI am going on a walk and I would like you to have this information in case I don't return by the deadline.\n\nI will send you a message once I am back to let you know that I am safe.\n\n";
  const end = "\n\n";
  return start + fields.value.filter(
      field => !field.isInternal
  ).map(
      (field) => {
        if (field.id === 'eta' || field.id === 'deadline') {
          return `${field.friendlyName}: ${new Date(field.value).toLocaleString()}`
        }
        return `${field.friendlyName}: ${field.value}`
      }
  ).join('\n') + end;
}

function reset() {
  fields.value.forEach(field => field.value = '');
}

function print() {
  let text = `Print Date: ${Date().toLocaleString()}\n\n` + generateText();
  let printWindow = window.open('', '', 'width=600,height=600');
  if (!printWindow) {
    alert('Please allow popups for this site');
    return;
  }
  printWindow.document.write('<pre>' + text + '</pre>');
  printWindow.document.close();
  printWindow.print();
}

function copy() {
  const text = generateText();
  navigator.clipboard.writeText(text);
  notify("Copied to clipboard");
}

function getField(id: string) {
  return fields.value.find(field => field.id === id);
}

function sendEmail() {
  const text = encodeURIComponent(generateText());
  const url = `mailto:${getField('fromEmail')?.value}?bcc=${getField('toEmails')?.value}&subject=${getField('subject')?.value}&body=${text}`;
  window.open(url);
}

function getUrl() {
  navigator.clipboard.writeText(window.location.href);
  notify("Copied URL to clipboard");
}

function notify(message: string) {
  notification.value = message;
  setTimeout(() => notification.value = '', 5000);
}


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
  <div class="tools">
    <button @click="print">Print</button>
    <button @click="copy">Copy to Clipboard</button>
    <button @click="sendEmail">Send as Email</button>
    <button @click="getUrl">Copy Current URL</button>
    <button @click="reset">Reset</button>
  </div>
  <div>
    <h2>Usage</h2>
    <p>The edit that you make in the form will be saved to the URL. Therefore, you can bookmark the URL with some useful
      presets.</p>
    <p>You can then either send the url to someone (not recommended), copy the message and send it to them using a
      messaging app, or print it out.</p>
  </div>
</template>
