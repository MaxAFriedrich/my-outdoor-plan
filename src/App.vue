<script lang="ts" setup>
import {ref, watch} from 'vue';

let date = new Date();
date.setHours(date.getHours() + 3);
let dateTime = date.toISOString().substring(0, 16);

let url = new URL(window.location.href);

let leader = ref(url.searchParams.get('leader') || '');
let phone = ref(url.searchParams.get('phone') || '');
let vehicle = ref(url.searchParams.get('vehicle') || '');
let partySize = ref(url.searchParams.get('partySize') || '');
let map = ref(url.searchParams.get('map') || '');
let start = ref(url.searchParams.get('start') || '');
let startGrid = ref(url.searchParams.get('startGrid') || '');
let finish = ref(url.searchParams.get('finish') || 'Same as start point.');
let finishGrid = ref(url.searchParams.get('finishGrid') || '');
let route = ref(url.searchParams.get('route') || '');
let eta = ref(url.searchParams.get('eta') || dateTime);
let kitList = ref(url.searchParams.get('kitList') || 'First aid kit, map/compass, and shelter being carried.');

watch([leader, phone, vehicle, partySize, map, start, startGrid, finish, finishGrid, route, eta, kitList], () => {
  let url = new URL(window.location.href);
  url.searchParams.set('leader', leader.value);
  url.searchParams.set('phone', phone.value);
  url.searchParams.set('vehicle', vehicle.value);
  url.searchParams.set('partySize', partySize.value);
  url.searchParams.set('map', map.value);
  url.searchParams.set('start', start.value);
  url.searchParams.set('startGrid', startGrid.value);
  url.searchParams.set('finish', finish.value);
  url.searchParams.set('finishGrid', finishGrid.value);
  url.searchParams.set('route', route.value);
  url.searchParams.set('eta', eta.value);
  url.searchParams.set('kitList', kitList.value);
  window.history.pushState({}, '', url);
});

function generateText() {
  return `Leader: ${leader.value}

Phone Number: ${phone.value}

Vehicle: ${vehicle.value}

Party Size: ${partySize.value}

Map Used: ${map.value}

Start Point: ${start.value} (Grid Reference: ${startGrid.value})

Finish Point: ${finish.value} (Grid Reference: ${finishGrid.value})

Route: ${route.value}

ETA back at car: ${Date(eta.value).toLocaleString()}

${kitList.value}
`;
}

function reset() {
  leader.value = '';
  phone.value = '';
  vehicle.value = '';
  partySize.value = '';
  map.value = '';
  start.value = '';
  startGrid.value = '';
  finish.value = 'Same as start point.';
  finishGrid.value = '';
  route.value = '';
  eta.value = dateTime;
  kitList.value = 'First aid kit, map/compass, and shelter being carried.';
}

function print() {
  let text = `Print Date: ${Date().toLocaleString()}\n\n` + generateText();
  let printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write('<pre>' + text + '</pre>');
  printWindow.document.close();
  printWindow.print();
}

function copy() {
  let text = generateText();
  navigator.clipboard.writeText(text);
}

</script>

<template>
  <h1>My Plan</h1>
  <p>A quick way to create a note to leave with someone you trust for them to give to emergency services when something
    goes wrong in the outdoors.</p>
  <div class="form">
    <div class="property">
      <label for="leader">Leader:</label>
      <input type="text" id="leader" name="leader" v-model="leader" placeholder="Joe Blogs">
    </div>
    <div class="property">
      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" name="phone" v-model="phone" placeholder="071234 56789">
    </div>
    <div class="property">
      <label for="vehicle">Vehicle:</label>
      <input type="text" id="vehicle" name="vehicle" v-model="vehicle" placeholder="AB12 CDE">
    </div>
    <div class="property">
      <label for="leader">Party Size:</label>
      <input type="text" id="party-size" name="party-size" v-model="partySize" placeholder="5">
    </div>
    <div class="property">
      <label for="map">Map Used:</label>
      <input type="text" id="map" name="map" v-model="map" placeholder="OL 1">
    </div>
    <div class="property">
      <label for="start">Start Point:</label>
      <input type="text" id="start" name="start" placeholder="Car Park" v-model="start">
      <input type="text" id="start-grid" name="start-grid" placeholder="SX 1234 1234" v-model="startGrid">
    </div>
    <div class="property">
      <label for="finish">Finish Point:</label>
      <input type="text" id="finish" name="finish" value="Same as start point." v-model="finish">
      <input type="text" id="finish-grid" name="finish-grid" placeholder="SX 1234 1234" v-model="finishGrid">
    </div>
    <div class="property long">
      <label for="route">Route:</label>
      <textarea id="route" name="route"
                placeholder="Car Park > north to A > west to B > lunch at Grid Reference SX 1234 1234 > Return via same route > Car Park."
                v-model="route"></textarea>
    </div>
    <div class="property">
      <label for="eta">ETA back at car:</label>
      <input type="datetime-local" id="eta" name="eta" v-model="eta">
    </div>
    <div class="property long">
      <label for="kit">Kit/Notes:</label>
      <textarea id="kit-list" name="kit-list" placeholder="Kit List" v-model="kitList">First aid kit, map/compass, and shelter being carried.</textarea>
    </div>
  </div>
  <div class="tools">
    <button @click="print">Print</button>
    <button @click="copy">Copy to Clipboard</button>
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