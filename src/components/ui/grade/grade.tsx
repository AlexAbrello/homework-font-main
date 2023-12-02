import { StarEmpty } from '@/assets/icons/star-empty.tsx'
import { StarFull } from '@/assets/icons/star-full.tsx'

type GradeProps = {
  grade: number
}
export const Grade = ({ grade }: GradeProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {grade >= 1 ? <StarFull /> : <StarEmpty />}
      {grade >= 2 ? <StarFull /> : <StarEmpty />}
      {grade >= 3 ? <StarFull /> : <StarEmpty />}
      {grade >= 4 ? <StarFull /> : <StarEmpty />}
      {grade >= 5 ? <StarFull /> : <StarEmpty />}
    </div>
  )
}
