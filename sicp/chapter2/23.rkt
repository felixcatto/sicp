#lang sicp
(#%require racket)
(#%require rackunit)

(define (forEach func items)
  (if
    (null? items)
    (void)
    (begin
      (func (car items))
      (forEach func (cdr items)))))

(forEach
  (lambda (el)
    (display "->")
    (display el)
    (displayln "<-"))
  (list 1 2 4 8))
