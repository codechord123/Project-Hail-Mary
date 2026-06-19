import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function MainMenu() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tight"
      >
        🚀 헤일메리 분수 미션
      </motion.h1>
      <p className="mt-4 text-space-accent text-lg">지구를 구하는 25명의 항해사</p>
      <p className="mt-2 text-white/60 text-sm max-w-md">
        잠에서 깨어난 5학년 항해사. 우주선을 복구하려면 분수 계산이 필요하다.
      </p>

      <div className="mt-12 flex flex-col gap-3 w-full max-w-xs">
        <Link
          to="/chapters"
          className="px-6 py-3 rounded-xl bg-space-accent text-space-900 font-bold hover:brightness-110 active:scale-95 transition"
        >
          항해 시작
        </Link>
        <Link
          to="/chapter/1"
          className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
        >
          챕터 1 바로가기
        </Link>
      </div>

      <p className="mt-12 text-white/30 text-xs">
        © Project Hail Mary 영감 · 학급 교육용
      </p>
    </div>
  )
}
