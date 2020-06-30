#lang sicp
(#%require racket)
(#%require rackunit)

(define (makeRat n d)
  (define g (gcd n d))
  (define numer (/ n g))
  (define denom (/ d g))
  (cond
    [(and (>= n 0) (< d 0)) (cons (- numer) (- denom))]
    [(and (< n 0) (< d 0)) (cons (- numer) (- denom))]
    [else (cons numer denom)]))

(define (numer x) (car x))

(define (denom x) (cdr x))

(define (printRat x)
  (display (numer x))
  (display "/")
  (displayln (denom x)))

(define (isEqualRat x y)
  (=
    (* (numer x) (denom y))
    (* (numer y) (denom x))))

(define (addRat x y)
  (makeRat
    (+
      (* (numer x) (denom y))
      (* (numer y) (denom x)))
    (* (denom x) (denom y))))

(define (subRat x y)
  (makeRat
    (-
      (* (numer x) (denom y))
      (* (numer y) (denom x)))
    (* (denom x) (denom y))))

(define (mulRat x y)
  (makeRat
    (* (numer x) (numer y))
    (* (denom x) (denom y))))

(define (divRat x y)
  (makeRat
    (* (numer x) (denom y))
    (* (denom x) (numer y))))

; (define oneThird (makeRat 1 3))
; (printRat (makeRat 1 2))
; (printRat (addRat oneThird oneThird))
; (printRat (makeRat -1 -2))

(check-equal? (numer (makeRat -1 -2)) 1)
(check-equal? (denom (makeRat -1 -2)) 2)
(check-equal? (numer (makeRat -1 2)) -1)
(check-equal? (denom (makeRat -1 2)) 2)
(check-equal? (numer (makeRat 1 -2)) -1)
(check-equal? (denom (makeRat 1 -2)) 2)
