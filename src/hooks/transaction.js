import { useMemo } from 'react'

export function encodeMessage (message) {
  return `0x${(new TextEncoder()).encode(message).map(v => v.toString(16))}`
}

export function useEncodedMessage (message) {
  return useMemo(() => encodeMessage(message), [message])
}
