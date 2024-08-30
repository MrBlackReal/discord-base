/**
 * Inserts Params into a message by replacing {0} etc.
 * @param msg 
 * @param params 
 * @returns formatted msg
 */
export function insertParams(msg: string, ...params: any[]) {
	params.forEach((param, index) => msg = msg.replace(new RegExp(`\\{${index}\\}`, 'g'), param));
	return msg;
}