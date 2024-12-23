import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, from, message } = body;

    if (!to || !from || !message) {
      return NextResponse.json(
        { error: 'Alle Felder müssen ausgefüllt sein' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        to,
        from,
        message,
        expiresAt: addDays(new Date(), 30), // Nachricht läuft nach 30 Tagen ab
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Fehler beim Erstellen der Nachricht:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Message ID ist erforderlich' },
      { status: 400 }
    );
  }

  try {
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json(
        { error: 'Nachricht nicht gefunden' },
        { status: 404 }
      );
    }

    if (message.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Diese Nachricht ist abgelaufen' },
        { status: 410 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Fehler beim Abrufen der Nachricht:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 