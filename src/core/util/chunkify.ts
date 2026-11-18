export function chunkify(message: string) {
	const portionSize = 2000;
	const chunks: string[] = [];
	let i = 0;

	while (i < message.length) {
		
		if (message.length - i <= portionSize) {
			chunks.push(message.slice(i));
			break;
		}

		
		const sliceEnd = i + portionSize;
		const windowText = message.slice(i, sliceEnd);

		const lastSpace = windowText.lastIndexOf(' ');

		if (lastSpace > 0) {
			chunks.push(message.slice(i, i + lastSpace));
			i += lastSpace + 1;
		} else {
			chunks.push(windowText);
			i += portionSize;
		}
	}

	return chunks;
}

export function chunkifyBatch(messages: string[]) {
    const flatArray = []

    for (const message of messages) {
        const chunk = chunkify(message)

        flatArray.push(...chunk)
    }

    return flatArray
}

export default chunkify;
