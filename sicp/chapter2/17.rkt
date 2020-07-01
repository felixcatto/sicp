#lang sicp
(#%require racket)
(#%require rackunit)

(define (lastPair items)
  (if
    (null? (cdr items))
    (car items)
    (lastPair (cdr items))))

(check-equal? (lastPair (list 23 72 149 34)) 34)
