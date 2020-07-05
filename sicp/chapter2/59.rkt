#lang sicp
(#%require racket)
(#%require rackunit)

(define (isElInSet x set)
  (cond
    ((null? set) false)
    ((equal? x (car set)) true)
    (else (isElInSet x (cdr set)))))

(define (addToSet x set)
  (if (isElInSet x set)
    set
    (cons x set)))

(define (getIntersection set1 set2)
  (cond
    ((or (null? set1) (null? set2)) '())
    (
      (isElInSet (car set1) set2)
      (cons
        (car set1)
        (getIntersection (cdr set1) set2)))
    (else (getIntersection (cdr set1) set2))))

(define (getUnion set1 set2)
  (cond
    [(null? set1) set2]
    [(isElInSet (car set1) set2)
      (getUnion (cdr set1) set2)]
    [else
      (getUnion (cdr set1) (cons (car set1) set2))]))

(check-true (isElInSet 'x (list 1 'x 3)))
(check-equal? (getUnion '(y x) '(y z)) '(x y z))
(check-equal? (getUnion '(y x) '(z)) '(x y z))
