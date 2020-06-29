#lang sicp
(#%require racket)
(#%require rackunit)

(define (square x) (expt x 2))

(define (compose f g)
  (lambda(x) (f (g x))))

(check-equal? ((compose square inc) 6) 49)
