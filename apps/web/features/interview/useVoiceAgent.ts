"use client"

import { useCallback, useRef } from "react"

export function useVoiceAgent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise(resolve => {
      if (typeof window === "undefined") { resolve(); return }
      window.speechSynthesis.cancel()
      const utt = new window.SpeechSynthesisUtterance(text)
      utt.rate = 1.35
      utt.pitch = 1
      utt.onend = () => resolve()
      utt.onerror = () => resolve()
      window.speechSynthesis.speak(utt)
    })
  }, [])

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis.cancel()
  }, [])

  const listen = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition
      if (!SR) {
        reject(new Error("Speech recognition not supported. Use Chrome or Edge."))
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rec: any = new SR()
      rec.lang = "en-US"
      rec.interimResults = false
      rec.maxAlternatives = 1
      let got = false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (e: any) => { got = true; resolve(e.results[0][0].transcript) }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onerror = (e: any) => {
        if (e.error === "no-speech") resolve("")
        else reject(new Error(`Mic error: ${e.error}`))
      }
      rec.onend = () => { if (!got) resolve("") }
      recognitionRef.current = rec
      rec.start()
    })
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  return { speak, stopSpeaking, listen, stopListening }
}
