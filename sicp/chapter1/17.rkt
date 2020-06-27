#lang sicp
(#%require racket)
(#%require rackunit)

(define (double x) (+ x x))

; multiply without '*' operator
; on every step: acc === a * i
(define (fastMultiply a b)
  (define (iter acc i)
    (cond
      [(= b i) acc]
      [(= i 0) (iter a 1)]
      [(<= (double i) b) (iter (double acc) (double i))]
      [else (iter (+ acc a) (+ i 1))]))
  (iter 0 0))

(check-equal? (double 3) 6)
(check-equal? (fastMultiply 4 0) 0)
(check-equal? (fastMultiply 2 4) 8)
