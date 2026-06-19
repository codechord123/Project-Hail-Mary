/**
 * Firestore 기반 학급 로스터 동기화.
 * Firebase 미설정 시 no-op + LocalStorage 기본 동작 유지.
 *
 * 경로: classes/{classCode}/students/{studentName}
 */

import { getFirestore, isFirebaseConfigured } from './firebase'
import type { RosterEntry } from './classRoster'

export const cloudPushRoster = async (entry: RosterEntry): Promise<boolean> => {
  if (!isFirebaseConfigured()) return false
  if (!entry.name.trim() || !entry.classCode.trim()) return false
  const db = await getFirestore()
  if (!db) return false
  try {
    const { doc, setDoc } = await import('firebase/firestore')
    const ref = doc(db, 'classes', entry.classCode, 'students', entry.name)
    await setDoc(ref, entry, { merge: true })
    return true
  } catch (e) {
    console.warn('[cloudSync] push 실패', e)
    return false
  }
}

export const cloudFetchRoster = async (classCode: string): Promise<RosterEntry[] | null> => {
  if (!isFirebaseConfigured()) return null
  if (!classCode.trim()) return null
  const db = await getFirestore()
  if (!db) return null
  try {
    const { collection, getDocs } = await import('firebase/firestore')
    const colRef = collection(db, 'classes', classCode, 'students')
    const snap = await getDocs(colRef)
    return snap.docs.map((d: any) => d.data() as RosterEntry)
  } catch (e) {
    console.warn('[cloudSync] fetch 실패', e)
    return null
  }
}
