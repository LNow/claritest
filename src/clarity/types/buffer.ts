import { Buffer } from "../../deps.ts";

export interface BufferCV {
  readonly buffer: Buffer;
}

export function bufferCV(buffer: Buffer): BufferCV {
  if (buffer.length > 1000000) {
    throw new Error("Cannot construct clarity buffer that is greater than 1MB");
  }

  return { buffer: buffer };
}

export function bufferCVFromString(str: string): BufferCV {
  const encoder = new TextEncoder();
  const buffer = new Buffer();

  buffer.read(encoder.encode(str));
  return bufferCV(buffer);
}
