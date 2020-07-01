#lang sicp
(#%require racket)
(#%require rackunit)

(define (ireverse items)
  (define (iter acc oldItems)
    (if
      (null? oldItems)
      acc
      (iter (cons (car oldItems) acc) (cdr oldItems))))
  (iter '() items))

(check-equal? (ireverse (list 1 2 3)) (list 3 2 1))
