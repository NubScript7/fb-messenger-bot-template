// the 'messages' webhook event

export type PSID = string

export interface WebhookPayloadMessages {
    object: "page",
    entry: MessagesEntry[]
}

interface MessagesEntry {
    id: PSID // example: "883478894494323" <--same A
    time: number // example: 1794576964938
    messaging: MessageEntryMessaging[]
}

interface MessageEntryMessaging {
    sender: { id: PSID } // example: "8297504716950349"
    recipient: { id: PSID } //example: "883478894494323" <--same A
    timestamp: number // example: 1794576963895
    message: {
        mid: string //example: m_lKiOrwnWN8aqTQxReYyHoSXlv9DIlDOFiEIU9RKWfQrJKdioyCdwYwTnGwssP7OzjTnFDqPnGHkdMblP2B44qsgg
        text: string // example: "test"
    }
}
