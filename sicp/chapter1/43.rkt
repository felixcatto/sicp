#lang sicp
(#%require racket)
(#%require rackunit)

(define (square x) (expt x 2))

; on every step: acc = (f x) i times
(define (repeated f n)
  (lambda(x)
    (define (iter acc i)
      (if
        (= i n)
        acc
        (iter (f acc) (inc i))))
    (iter (f x) 1)))

(check-equal? ((repeated square 2) 5) 625)
