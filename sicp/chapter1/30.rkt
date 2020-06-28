#lang sicp
(#%require racket)
(#%require rackunit)

; on every step: acc === term(a) + ... + term(i)
(define (sum term a next b)
  (define (iter acc i)
    (if
      (= i b)
      acc
      (let 
        ([nextI (next i)])
        (iter (+ acc (term nextI)) nextI))))
  (iter (term a) a))

(check-equal? (sum identity 0 inc 3) 6)
