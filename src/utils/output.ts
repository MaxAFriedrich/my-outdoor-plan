import {fields} from "./fields";

export function generateText() {
    const start = `Hi,

I am going on a walk and I would like you to have this information in case I don't return by the deadline.

I will send you a message once I am back to let you know that I am safe.\n\n`;
    const end = `
WHAT TO DO AT THE DEADLINE TIME - Do not delay in saving lives!

1. Call the leader's mobile.
2. If you do not get an answer, you need to call the emergency services NOW!
3. Have this information in front of you and **DIAL 112**.
4. The emergency operator is going to first ask you which service you require, if they are in:
    a. The mountains or hills it will be MOUNTAIN RESCUE
    b. At sea or along the coastline, including the land by the sea COASTGUARD
    c. For all other areas it will be the POLICE
5. Tell them who you are and why you are calling:

> My name is ............ and I am calling from ............ a person
> called .................. who is alone/leading a group of people has
> gone hiking/climbing and they left a some information with me about exactly where
> they were going and at what time they expected to be back. 
> I have just tried calling them on their mobile phone and received no answer.
> If they still had not returned by the DEADLINE TIME they asked me to
> call you for help.

6. The emergency operator will then confirm what you have just told them and probably ask for the details on the card. If they do not, tell them again:

> I have a card that they left with their names, mobile numbers
> and planned journey, what would you like me to do with this?

Well done, your prompt action may have saved their lives!
`;
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
