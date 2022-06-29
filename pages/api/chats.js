import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getChat(req, res)
    }
    else if (req.method === 'POST') {
        return await postChat(req, res)
    }
    else return res.status(405).json({ message: 'Method not allowed', success: false })
}

async function getChat(req, res) {
    try {
        const chats = await prisma.chats.findMany()
        return res.status(200).json(chats, {success: true})
    }
    catch (error) {
        console.error("Request error", error)
        res.status(500).json({error: "Error creating question", success: false})
    }
}

async function postChat(req, res) {
    const body = req.body
    try {
        const newEntry = await prisma.chats.create({
            data: {
                username: body.username,
                message: body.message,
                room: body.room
            }
        })
        return res.status(200).json(newEntry, {success: true,})
    }
    catch (error) {
        console.error("Unable to write value to database!", error)
        res.status(500).json({error: "Error creating user", success: false})
    }
}