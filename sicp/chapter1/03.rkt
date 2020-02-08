#lang sicp
(#%require rackunit)

(define (sumOfSquare x y)
  (+ (* x x) (* y y)))

(define (solution a b c)
  (cond
    [(and
      (< a b)
      (< a c)) (sumOfSquare b c)]
    [(and
      (< b a)
      (< b c)) (sumOfSquare a c)]
    [else (sumOfSquare a b)]))

(check-equal? (solution 1 2 3) (+ 4 9))
(check-equal? (solution 5 0 2) (+ 25 4))
