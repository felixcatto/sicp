#lang sicp
(#%require racket)
(#%require rackunit)

(define accuracy 0.1)

(define (icqrt n)
  (define (improveGuess guess)
    (/
      (+
        (/ n (* guess guess))
        (* 2 guess))
      3))
  (define (isGoodEnough oldGuess newGuess)
    (<
      (abs (- oldGuess newGuess))
      accuracy))
  (define (iter guess)
    (define newGuess (improveGuess guess))
    (if
      (isGoodEnough guess newGuess)
      newGuess
      (iter newGuess)))
  (iter 1.0))

(check-within (icqrt 8) 2 accuracy)
