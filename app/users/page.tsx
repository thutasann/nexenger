import EmptyState from '@/components/empty-state'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages | Nexenger',
}

const Users = () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState />
    </div>
  )
}

export default Users
