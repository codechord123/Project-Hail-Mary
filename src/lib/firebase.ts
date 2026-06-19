/**
 * Firebase 옵셔널 초기화.
 *
 * 사용법:
 * 1. Firebase 콘솔에서 프로젝트 생성, Web 앱 추가, Firestore 활성화
 * 2. .env.local에 다음 env vars 설정:
 *    VITE_FIREBASE_API_KEY=...
 *    VITE_FIREBASE_AUTH_DOMAIN=...
 *    VITE_FIREBASE_PROJECT_ID=...
 *    VITE_FIREBASE_STORAGE_BUCKET=...
 *    VITE_FIREBASE_MESSAGING_SENDER_ID=...
 *    VITE_FIREBASE_APP_ID=...
 * 3. 자동으로 cloudSync 활성화. env 없으면 LocalStorage 모드 유지.
 */

let initialized = false
let dbRef: any = null

export const isFirebaseConfigured = (): boolean => {
  const env = import.meta.env as Record<string, string | undefined>
  return Boolean(
    env.VITE_FIREBASE_API_KEY &&
      env.VITE_FIREBASE_PROJECT_ID &&
      env.VITE_FIREBASE_APP_ID,
  )
}

export const getFirestore = async (): Promise<any | null> => {
  if (!isFirebaseConfigured()) return null
  if (initialized && dbRef) return dbRef
  try {
    const env = import.meta.env as Record<string, string | undefined>
    const { initializeApp } = await import('firebase/app')
    const { getFirestore } = await import('firebase/firestore')
    const { getAuth, signInAnonymously } = await import('firebase/auth')
    const app = initializeApp({
      apiKey: env.VITE_FIREBASE_API_KEY!,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID!,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID!,
    })
    const auth = getAuth(app)
    try {
      await signInAnonymously(auth)
    } catch {
      /* 익명 로그인 실패해도 firestore 읽기는 시도 */
    }
    dbRef = getFirestore(app)
    initialized = true
    return dbRef
  } catch (e) {
    console.warn('[firebase] init 실패, LocalStorage 모드로 fallback', e)
    return null
  }
}
