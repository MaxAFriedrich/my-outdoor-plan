import {fields} from "./fields";

export function generateText() {
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
