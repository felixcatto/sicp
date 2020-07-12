#lang sicp
(#%require racket)
(#%require rackunit)

(define (makeAccumulator acc)
  (lambda (value)
    (set! acc (+ acc value))
    acc))

(define accumulator1 (makeAccumulator 0))
(define accumulator2 (makeAccumulator 0))

(check-equal? (accumulator1 10) 10)
(check-equal? (accumulator1 10) 20)
(check-equal? (accumulator1 5) 25)
(check-equal? (accumulator2 15) 15)
