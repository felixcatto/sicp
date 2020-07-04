#lang sicp
(#%require racket)
(#%require rackunit)

(define (isEqual l1 l2)
  (cond
    [(null? l1) #t]
    [(not (eq? (car l1) (car l2))) #f]
    [else (isEqual (cdr l1) (cdr l2))]))

(check-false (isEqual
  '(this is a list)
  '(this (is a) list)))
(check-true (isEqual
  '(this is a list)
  '(this is a list)))
