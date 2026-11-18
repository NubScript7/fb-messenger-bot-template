import { Hono } from "hono";
import { webhook } from "./routes/messenger";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", webhook)

export default app;

