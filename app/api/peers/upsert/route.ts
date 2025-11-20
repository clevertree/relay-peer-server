import {NextResponse} from 'next/server';
import {ensureDb} from '@/lib/db';
import {Peer} from '@/models/Peer';

export const runtime = 'nodejs';

function getErrorMessage(e: unknown): string {
    if (!e) return 'Unknown error';
    if (e instanceof Error) return e.message;
    try {
        return String(e);
    } catch {
        return 'Unknown error';
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        await ensureDb();
        const body = await req.json().catch(() => ({}));
        const socket = (body?.socket ?? '').toString().trim();
        if (!socket) {
            return NextResponse.json({error: 'socket is required'}, {status: 400});
        }

        // Upsert by unique socket
        const [peer] = await Peer.upsert({socket});
        return NextResponse.json({id: peer.id, socket: peer.socket, updatedAt: peer.updatedAt});
    } catch (e: unknown) {
        return NextResponse.json({error: getErrorMessage(e)}, {status: 500});
    }
}
