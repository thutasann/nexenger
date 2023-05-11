import { pusherClient } from '@/libs/pusher'
import type { Channel, Members } from 'pusher-js'
import { useEffect, useState } from 'react'
import useActiveList from './useActiveList'

const useActiveChannl = () => {
  const { set, add, remove } = useActiveList()
  const [activeChannel, setActiveChannel] = useState<Channel | null>()

  useEffect(() => {
    let channel = activeChannel
    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger')
      setActiveChannel(channel)
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initalMembers: string[] = []

      members.each((member: Record<string, any>) => initalMembers.push(member.id))
      set(initalMembers)
    })

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id)
    })

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger')
        setActiveChannel(null)
      }
    }
  }, [activeChannel, set, add, remove])
}

export default useActiveChannl
