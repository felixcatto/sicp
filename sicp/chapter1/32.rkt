#lang sicp
(#%require racket)
(#%require rackunit)

; ; on every step: acc === combiner(term(a)...term(i))
(define (accumulate combiner nullValue term a next b)
  (define (iter acc i)
    (if
      (= i b)
      (combiner acc nullValue)
      (iter (combiner acc (term (next i))) (next i))))
  (iter (term a) a))

(define (fact n)
  (accumulate (lambda(acc el) (* acc el)) 1 identity 1 inc n))

(check-equal? (fact 5) 120)
(check-equal? (accumulate (lambda(acc el) (+ acc el)) 10 identity 0 inc 3) 16)
(check-equal? (accumulate (lambda(acc el) (+ acc el)) 10 identity 1 inc 1) 11)
