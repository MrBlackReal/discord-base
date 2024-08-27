export function insertParams(msg: string, ...params: any[]) {
	params.forEach((param, index) => msg = msg.replace(new RegExp(`\\{${index}\\}`, 'g'), param));
	return msg;
}