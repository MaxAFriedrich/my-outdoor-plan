import {ref, type Ref} from "vue";

export type Field = {
    id: string,
    friendlyName: string,
    value: string,
    displayType: string,
    placeholder?: string,
    isInternal?: boolean
}

export const fields: Ref<Array<Field>> = ref([
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