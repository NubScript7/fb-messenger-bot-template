import { state } from "../../state";
import { join } from "../util/concat";
import { PSID } from "../webhook"
import type { CommandStructure } from "./command";


// command functions must return arrays.
// note that each item in the array will be sent as a seperate message
export const COMMANDS: CommandStructure = {
    v: {
        default: [`app version: ${state.version}`],
    },

    help: {
        default: [join(
            `To use, type the message you want to ask ${state.botname} or you could use these commands:`,
            `(note: add a \"${state.command.prefix}\" prefix when calling a command)\n`,
            "v - get app version",
            "help - used to print this help message",
            "pickanumber - returns an integer from given range or pass \"any\" to use the range of 1 to 1M.",
            "echo - sends back the words that is given"
        )]
    },

    pickanumber: {
        default: ["To use this command, pass the minimum and maximum range.\nexample: \"/pickanumber <min> <max>\"\n\nYou can also use: \"/pickanumber any\" with range of 1 to 1M."],
        run(output, id, min, max) {
            const isAny = min === "any"

            const fx = Math.floor(isAny ? 1_000_000 : max)
            const fn = Math.ceil(isAny ? 1 : min)

            output.push(
                "I pick... " + Math.floor(Math.random() * (fx - fn + 1) + fn).toLocaleString("en-US")
            )
        }
    },

    echo: {
        default: ["call this command with atleast one word."],
        run(output, id, ...text) {
            output.push(text.join(" "))
        }
    },
    
    _default: {
        default: ["That is an invalid command. Use '/help' to see the list of valid commands."]
    }
};
