import { useContext } from 'react'
import { TopicContext } from '@/context/TopicContext'

export const useTopic = () => {
  return useContext(TopicContext)
}