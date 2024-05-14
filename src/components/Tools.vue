<script setup lang="ts">
import {generateText} from "@/utils/output";
import {fields} from "@/utils/fields";
import {notify} from "@/utils/utils";

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
</script>

<template>
  <div class="tools">
    <button @click="print">Print</button>
    <button @click="copy">Copy to Clipboard</button>
    <button @click="sendEmail">Send as Email</button>
    <button @click="getUrl">Copy Current URL</button>
    <button @click="reset">Reset</button>
  </div>
</template>
