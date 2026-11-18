import { state } from "../../state";
import type { PSID } from "../webhook"
import { COMMANDS } from "./list"

export const PREFIX = state.command.prefix || "/"

export type CommandStructure = {
    [commandName: string]: {
        default: string[] | ((id: PSID, ...args: any[]) => string[] | Promise<string[]>);
        run?: (output: string[], id: PSID, ...args: any[]) => void | Promise<void>;
    };
};

// returns an array that has two items: the resulting output from the request and a boolean whether the request was a command.
export async function handleCommand(message: string, id: PSID): Promise<[string[], boolean]> {
    const output: string[] = [];
    const isCommand = message.startsWith(PREFIX);
    
    const messageArgs: string[] = isCommand ? message.slice(PREFIX.length).split(" ") : [message];
    
    if (typeof messageArgs !== "object" && !Array.isArray(messageArgs)) return [output, isCommand];

    const [commandName, ...args] = messageArgs;
    const command = COMMANDS[commandName] ?? COMMANDS._default;

    if(!isCommand) {
        return [output, isCommand];
    }

    if (messageArgs.length === 1) {
        if (typeof command.default === "function") {
            const result = await Promise.resolve(command.default(id, ...args))
            output.push(...result);
        } else {
            output.push(...command.default);
        }
    } else if (typeof command?.run === "function") {
        await Promise.resolve(command.run(output, id, ...args))
    } else {
        if (typeof command.default === "function") {
            const result = await Promise.resolve(command.default(id, ...args))
            output.push(...result)
        } else {
            output.push(...command.default)
        }
    }
    

    return [output, isCommand];
}
