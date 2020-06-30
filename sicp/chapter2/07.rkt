#lang sicp
(#%require racket)
(#%require rackunit)

(provide
  makeInterval
  lowerBound
  upperBound)

(define (makeInterval a b) (cons a b))

(define (lowerBound interval) (car interval))

(define (upperBound interval) (cdr interval))

(define (addInterval x y)
  (makeInterval
    (+ (lowerBound x) (lowerBound y))
    (+ (upperBound x) (upperBound y))))

(define (subInterval x y)
  (makeInterval
    (- (lowerBound x) (lowerBound y))
    (- (upperBound x) (upperBound y))))

(define (mulInterval x y)
  (let
    (
      [p1 (* (lowerBound x) (lowerBound))]
      [p2 (* (lowerBound x) (upperBound))]
      [p3 (* (upperBound x) (lowerBound))]
      [p4 (* (upperBound x) (upperBound))])
    (makeInterval
      (min p1 p2 p3 p4)
      (max p1 p2 p3 p4))))

(check-equal? (lowerBound (makeInterval 1 2)) 1)
(check-equal? (upperBound (makeInterval 1 2)) 2)
(check-equal?
  (subInterval
    (makeInterval 4 4)
    (makeInterval 2 1))
  (makeInterval 2 3))
