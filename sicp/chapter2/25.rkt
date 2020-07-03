#lang sicp
(#%require racket)
(#%require rackunit)


(define l1 (list 1 3 (list 5 7) 9))
(define l2 (list (list 7)))
(define l3 (list 1 (list 2 (list 3 (list 4 (list 5 (list 6 7)))))))

(check-equal? (car (cdaddr l1)) 7)
(check-equal? (caar l2) 7)
(check-equal? (cadadr (cadadr (cadadr l3))) 7)

(define x (list 1 2 3))
(define y (list 4 5 6))

(append x y)
(cons x y)
(list x y)

(cons 1 2)
(list 1 2)
; (cons 1 (cons 2 '()))
