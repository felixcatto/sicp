#lang sicp
(#%require racket)
(#%require rackunit)

(define (iterativeImprove isGoodF improveF)
  (lambda(initialGuess)
    (define (iter guess)
      (if
        (isGoodF guess)
        guess
        (iter (improveF guess))))
    (iter initialGuess)))

(define accuracy 0.1)
(define (square x) (expt x 2))

(define (isqrt n)
  (define (isGoodEnough guess)
    (<
      (abs (- n (square guess)))
      accuracy))
  (define (improveGuess guess)
    (define average
      (/
        (+
          guess
          (/ n guess))
        2))
    average)
  ((iterativeImprove isGoodEnough improveGuess) 1.0))

(check-within (isqrt 9) 3 accuracy)
