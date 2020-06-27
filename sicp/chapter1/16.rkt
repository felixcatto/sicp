#lang sicp
(#%require racket)
(#%require rackunit)

(define (square x) (* x x))

; on every step: acc === Math.pow(b, i)
(define (fastExp b n)
  (define (iter acc i)
    (cond
      [(= i n) acc]
      [(<= (* i 2) n) (iter (square acc) (* i 2))]
      [else (iter (* acc b) (+ i 1))]))
  (iter b 1))

(check-equal? (square 4) 16)
(check-equal? (fastExp 3 3) 27)
(check-equal? (fastExp 2 9) 512)