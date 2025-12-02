import {NextApiRequest, NextApiResponse} from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse)
{
    const now = new Date();
    res.status(200).json({ time: now.toLocaleString()});
}