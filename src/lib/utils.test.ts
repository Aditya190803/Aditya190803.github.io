import { expect, test } from 'vitest'
import { cn } from './utils'

test('cn merges tailwind classes correctly', () => {
  expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4')
  expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  expect(cn('bg-white', { 'bg-black': true })).toBe('bg-black')
  expect(cn('bg-white', { 'bg-black': false })).toBe('bg-white')
})
