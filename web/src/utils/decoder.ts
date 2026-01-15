const decoder = new TextDecoder('utf-8')

const decode = (value: Uint8Array) => decoder.decode(value)

export default decode