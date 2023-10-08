import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { env } from "@env.mjs";
import { getToken } from "next-auth/jwt";
import { NextRequest } from 'next/server';

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: NextRequest) {
  const json = await req.json()
  const { messages, previewToken } = json
  const token = await getToken({ req });

  // letting unauthorized people play a little, haha
  // if (!token) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}