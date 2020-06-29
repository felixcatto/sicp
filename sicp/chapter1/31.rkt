#lang sicp
(#%require racket)
(#%require rackunit)

; on every step: acc === term(a) * ... * term(i)
(define (productIterative term a next b)
  (define (iter acc i)
    (if
      (= i b)
      acc
      (let ([nextEl (next i)])
        (iter (* acc (term nextEl)) nextEl))))
  (iter (term a) a))

(define (productRecursive term a next b)
  (if
    (= a b)
    (term b)
    (let ([nextEl (next a)])
      (*
        (term a)
        (productRecursive term nextEl next b)))))

(define (fact n)
  (productIterative identity 1 inc n))

(check-equal? (productRecursive identity 1 inc 4) 24)
(check-equal? (fact 5) 120)
