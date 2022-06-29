import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getUser(req, res)
    }
    else if (req.method === 'POST') {
        return await postUser(req, res)
    }
    else return res.status(405).json({ message: 'Method not allowed', success: false })
}

async function getUser(req, res) {
    const body = req.body
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(users, {success: true})
    }
    catch (error) {
        console.error("Request error", error)
        res.status(500).json({error: "Error creating question", success: false})
    }
}

async function postUser(req, res) {
    try {
        const newEntry = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        })
        return res.status(200).json(newEntry, {success: true,})
    }
    catch (error) {
        console.error("Unable to write value to database!", error)
        res.status(500).json({error: "Error creating user", success: false})
    }
}