#lang sicp
(#%require racket)
(#%require rackunit)

(define (isElInSet x set)
  (cond
    ((null? set) false)
    ((= x (car set)) true)
    ((< x (car set)) false)
    (else (isElInSet x (cdr set)))))

(define (addToSet x set)
  (define (iter acc set1 set2)
    (cond
      [(null? set1) (append (reverse acc) set2)]
      [(null? set2) (append (reverse acc) set1)]
      [(< (car set1) (car set2))
        (iter
          (cons (car set1) acc)
          (cdr set1)
          set2)]
      [(> (car set1) (car set2))
        (iter
          (cons (car set2) acc)
          set1
          (cdr set2))]
      [(= (car set1) (car set2))
        (iter
          (cons (car set1) acc)
          (cdr set1)
          (cdr set2))]))
  (iter '() (list x) set))

(define (getIntersection set1 set2)
  (if
    (or (null? set1) (null? set2))
    '()
    (let ((x1 (car set1)) (x2 (car set2)))
      (cond
        [
          (= x1 x2)
          (cons
            x1
            (getIntersection (cdr set1) (cdr set2)))]
      [
        (< x1 x2)
        (getIntersection (cdr set1) set2)]
      [
        (< x2 x1)
        (getIntersection set1 (cdr set2))]))))

(check-true (isElInSet 2 (list 1 2 3)))
(check-equal? (getIntersection '(1 2) '(2 3)) '(2))
(check-equal? (addToSet 3 (list 1 2 3)) '(1 2 3))
(check-equal? (addToSet 4 (list 1 2 3)) '(1 2 3 4))
(check-equal? (addToSet 0 (list 1 2 3)) '(0 1 2 3))
(check-equal? (addToSet 2 (list 1 3 4)) '(1 2 3 4))
