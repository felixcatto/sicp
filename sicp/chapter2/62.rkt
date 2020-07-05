#lang sicp
(#%require racket)
(#%require rackunit)

(define (getUnion initialSet1 initialSet2)
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
  (iter '() initialSet1 initialSet2))

(check-equal? (getUnion (list 1 3) (list 2 4)) '(1 2 3 4))
(check-equal? (getUnion (list 1 3) (list 2 3 4)) '(1 2 3 4))
(check-equal? (getUnion (list 1 2 3) (list 2 3 4)) '(1 2 3 4))
(check-equal? (getUnion '() (list 2 3 4)) '(2 3 4))
