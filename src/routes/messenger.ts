import { Hono } from "hono";
import { StatusCodes } from "http-status-codes"
import type { WebhookPayloadMessages } from "../core/webhook";
import { env } from "../env";
import { zValidator } from "@hono/zod-validator"
import { userRequestBodySchema } from "../schema/messenger";
import { handleCommand } from "../core/commands/command";
import { SendAPI } from "../core/util/sender";
import chunkify, { chunkifyBatch } from "../core/util/chunkify";

export const webhook = new Hono()

const sender = SendAPI.getInstance()

webhook.post("/webhook", zValidator("json", userRequestBodySchema), async (c) => {
    const body = await c.req.json() as WebhookPayloadMessages

    if(body.object !== "page") return c.body(null, StatusCodes.FORBIDDEN);

    for(const item of body.entry) {
        for(const msg of item.messaging) {
            const id = msg.sender.id
            const message = msg.message.text

            console.log("PID:", id, " has sent a message: ", msg.message.text)

            const [output, isCommand] = await handleCommand(message, id)
            
            if (isCommand) {
                const chunked = chunkifyBatch(output)
                c.executionCtx.waitUntil(sender.sendBatch(chunked, id))
            } else {
                c.executionCtx.waitUntil(sender.send("Hey! you just sent me a message", id))
            }
        }
    }

    return c.body(null, 200)
});

webhook.get("/webhook", (c) => {
    const mode = c.req.query("hub.mode")
    const token = c.req.query("hub.verify_token")
    const challenge = c.req.query("hub.challenge")

    if (!challenge || mode !== "subscribe" || token !== env.VERIFY_TOKEN) return c.body(null, StatusCodes.FORBIDDEN);
    
    console.log("WEBHOOK_VERIFIED");

    return c.text(challenge)
})
