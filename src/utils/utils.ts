import {ref} from "vue";

export const notification = ref("");

export function notify(message: string) {
    notification.value = message;
    setTimeout(() => notification.value = '', 5000);
}
