#lang sicp
(#%require racket)
(#%require rackunit)
(#%require "40.rkt")

; 0 <= i < j < k <= s, i+j+k = s
(define (fractionNumber s)
  (filter
    (lambda (listTriple)
      (=
        (+
          (car listTriple)
          (cadr listTriple)
          (caddr listTriple))
        s))
    (flatmap
      (lambda (i)
        (flatmap
          (lambda (j)
            (map
              (lambda (k) (list i j k))
              (enumerateInterval (inc j) s)))
          (enumerateInterval (inc i) s)))
      (enumerateInterval 0 s))))

(check-equal? (fractionNumber 5) (list (list 0 1 4) (list 0 2 3)))
