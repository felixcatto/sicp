#lang sicp
(#%require racket)
(#%require rackunit)

(define (double f)
  (lambda(x) (f (f x))))

(check-equal? ((double inc) 1) 3)
(check-equal? (((double (double double)) inc) 5) 21)
