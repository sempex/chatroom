import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getSearch(req, res)
    }
    else return res.status(405).json({ message: 'Method not allowed', success: false })
}
async function getSearch(req, res) {
    const search = req.query.s
    try {
        const result = await prisma.User.findMany({where : {
            name : {
                search: search
            }
        }})
        return res.status(200).json(result, {success: true})
    }
    catch (error) {
        console.error("Request error", error)
        res.status(500).json({error: "Error creating question", success: false})
    }
}
