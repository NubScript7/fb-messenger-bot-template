import axios from "axios"
import { env } from "../../env";
import { state } from "../../state";
import type { PSID } from "../webhook";

const config = {
    timeout: 10_000
}

export class SendAPI {
    private static _instance: SendAPI
    private _axios = axios.create({
        baseURL: state.axios.baseURL,
        params: {
            access_token: env.FB_PAGE_ACCESS_TOKEN
        },
        timeout: config.timeout
    })

    static getInstance() {
        if (!this._instance) {
            this._instance = new SendAPI()
        }

        return this._instance
    }

    send(message: string, id: PSID) {
        return this._axios.post("/me/messages", {
            recipient: { id },
            message: { text: message || "[Response was empty.]" }
        })
    }

    async sendBatch(messages: string[], id: PSID) {
        for (const msg of messages) {
            try {
                await this.send(msg, id)
            } catch(e: any) {
                console.error(e)

                this.send("[Failed to send.]", id)
                .catch(e => console.error(e))
            }
        }
    }
}
