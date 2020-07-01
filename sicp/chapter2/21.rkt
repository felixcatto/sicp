#lang sicp
(#%require racket)
(#%require rackunit)

(define (squareList items)
  (if
    (null? items)
    nil
    (cons
      (expt (car items) 2)
      (squareList (cdr items)))))

; (define (squareList items)
;   (map (lambda (el) (expt el 2)) items))

(check-equal? (squareList (list 1 2 3 4)) (list 1 4 9 16))
