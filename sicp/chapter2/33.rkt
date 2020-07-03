#lang sicp
(#%require racket)
(#%require rackunit)

(define (accumulate op initial sequence)
  (if
    (null? sequence)
    initial
    (op (car sequence)
      (accumulate op initial (cdr sequence)))))

(define (map p sequence)
  (accumulate
    (lambda (el acc)
      (cons (p el) acc))
    '()
    sequence))

(define (append seq1 seq2)
  (accumulate cons seq2 seq1))

(define (length sequence)
  (accumulate (lambda (el acc) (inc acc)) 0 sequence))

(check-equal? (map (lambda (x) (* x 2)) (list 1 2 3)) (list 2 4 6))
(check-equal? (append (list 1 2) (list 3 4)) (list 1 2 3 4))
(check-equal? (length (list 1 2 3)) 3)
