import client from "../config/openai"

const embed = async (text: string) => {
    const embeddingData = await client.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float'
    })
    return `[${embeddingData.data[0].embedding.join(',')}]`
}


export default embed