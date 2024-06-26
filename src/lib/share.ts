import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/settings'
import { GUESS_MAX } from '../constants/settings'


export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `#${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${GUESS_MAX}\n\n` + generateEmojiGrid(guesses) + "\n\nhttps://railword.com"
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess.split("")
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            case 'samegroup':
              return '🟪'
            default:
              return '⬛'
          }
        })
        .join('')
    })
    .join('\n')
}
