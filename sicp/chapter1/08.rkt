#lang sicp
(#%require racket)
(#%require rackunit)

(define accuracy 0.1)

(define (improveGuess n guess)
  (/
    (+
      (/ n (* guess guess))
      (* 2 guess))
    3))

(define (isGoodEnough oldGuess newGuess)
  (<
    (abs (- oldGuess newGuess))
    accuracy))

(define (iter n guess)
  (define newGuess (improveGuess n guess))
  (if
    (isGoodEnough guess newGuess)
    newGuess
    (iter n newGuess)))

(define (icqrt n)
  (iter n 1.0))

(check-within (improveGuess 8.0 1) 3.33 accuracy)
(check-within (icqrt 8) 2 accuracy)
