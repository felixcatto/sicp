#lang sicp
(#%require racket)
(#%require rackunit)

; f(n) = n if n < 3
; f(n) = f(n-1) + f(n-2) + f(n-3) if n >= 3

(define (fRecursive n)
  (if
    (< n 3)
    n
    (+
      (fRecursive (- n 1))
      (fRecursive (- n 2))
      (fRecursive (- n 3)))))

(define (fIterative n)
  (define (iter currentFn fnm1 fnm2 fnm3)
    (if
      (= currentFn n)
      (+ fnm1 fnm2 fnm3)
      (iter
        (+ currentFn 1)
        (+ fnm1 fnm2 fnm3)
        fnm1
        fnm2)))
  (if
    (< n 3)
    n
    (iter 3 2 1 0)))

(define f fIterative)

(check-equal? (f 0) 0)
(check-equal? (f 2) 2)
(check-equal? (f 3) 3)
(check-equal? (f 4) 6)
(check-equal? (f 5) 11)
