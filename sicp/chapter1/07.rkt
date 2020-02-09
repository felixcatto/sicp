#lang sicp
(#%require racket)
(#%require rackunit)

(define accuracy 0.1)

(define (improveGuess n guess)
  (define average
    (/
      (+
        guess
        (/ n guess))
      2))
  average)

(define (isGoodEnough n guess)
  (<
    (abs (- n (* guess guess)))
    accuracy))

(define (isBestEnough oldGuess newGuess)
  (<
    (abs (- oldGuess newGuess))
    accuracy))

; (define (sqrtIter n guess)
;   (if
;     (isGoodEnough n guess)
;     guess
;     (sqrtIter n (improveGuess n guess))))

(define (sqrtIter n guess)
  (define newGuess (improveGuess n guess))
  (if
    (isBestEnough guess newGuess)
    newGuess
    (sqrtIter n newGuess)))

(define (isqrt n)
  (sqrtIter n 1.0))

(check-equal? (improveGuess 2.0 1) 1.5)
(check-equal? (isGoodEnough 2.0 1.42) #t)
(check-equal? (isGoodEnough 2.0 2.1) #f)
(check-true
  (<
    (abs
      (- (isqrt 9) 3))
    0.1))
(check-true (isGoodEnough 100 (isqrt 100)))