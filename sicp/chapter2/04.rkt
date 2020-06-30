#lang sicp
(#%require racket)
(#%require rackunit)

; (define (cons x y) (lambda(key) (if (= key 0) x y)))
; (define (car pair) (pair 0))
; (define (cdr pair) (pair 1))

(define (cons x y)
  (lambda (m) (m x y)))
(define (car pair)
  (pair (lambda(x y) x)))
(define (cdr pair)
  (pair (lambda(x y) y)))

(check-equal? (car (cons 1 2)) 1)
(check-equal? (cdr (cons 1 2)) 2)
