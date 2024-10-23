// HandleCache.vue
<script setup>
import { ref, onMounted } from 'vue';
import packageApp from '../../../package.json';

const isLoading = ref(true);
const isLatestVersionAvailable = ref(false);
const appVersion = ref(packageApp.version);

// Function to clear cookies
const clearCookies = () => {
  console.log('Clearing cookies...');
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    // Set the cookie expiration date to the past
    // Set the cookie expiration to a past date and specify path and domain
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;

    // Also try clearing for the root path in case it was set elsewhere
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

const clearCacheAndReload = () => {
  console.log('Clearing cache and hard reloading...');
  if (caches) {
    caches.keys().then((names) => {
      for (let name of names) caches.delete(name);
      console.log('clearing', names)
    });
  }

  // Clear cookies before reloading
  clearCookies();


  // Store the latest version in localStorage to avoid redundant reloads
  localStorage.setItem('appVersion', appVersion.value);
  // window.location.reload(true);
};

const checkVersionMismatch = (latestVersion, currentVersion) => {
  const latestVersionArray = latestVersion.split(/\./g);
  const currentVersionArray = currentVersion.split(/\./g);
  while (latestVersionArray.length || currentVersionArray.length) {
    const a = Number(latestVersionArray.shift());
    const b = Number(currentVersionArray.shift());
    if (a === b) continue;
    return a > b || isNaN(b);
  }
  return false;
};

onMounted(() => {
  fetch(`/meta.json?${new Date().getTime()}`, { cache: 'no-cache' })
    .then((response) => response.json())
    .then((meta) => {
      const latestVersion = meta.version;
      const currentVersion = appVersion.value;
      const storedVersion = localStorage.getItem('appVersion');
      const shouldForceRefresh = checkVersionMismatch(latestVersion, storedVersion || currentVersion);

      console.log(shouldForceRefresh)
      if (shouldForceRefresh) {
        console.log(`New version - ${latestVersion}. Available, need to force refresh`);
        isLoading.value = false;
        isLatestVersionAvailable.value = false;
      } else {
        console.log(`Already latest version - ${latestVersion}. No refresh required.`);
        // Store the current version in localStorage for future checks
        localStorage.setItem('appVersion', appVersion.value);
        isLoading.value = false;
        isLatestVersionAvailable.value = true;
      }
    });
});

defineExpose({
  clearCacheAndReload,
});

</script>

<template>
  <div>
    <slot :isLoading="isLoading" :isLatestVersionAvailable="isLatestVersionAvailable" />
  </div>
</template>