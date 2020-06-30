#lang sicp
(#%require racket)
(#%require rackunit)
(#%require "07.rkt")

(define (makeCenterWidth c w)
  (makeInterval (- c w) (+ c w)))

(define (makeCenterPercent c p)
  (makeInterval
    (- c (inexact->exact (* c p)))
    (+ c (inexact->exact (* c p)))))

(define (percentValue i)
  (exact->inexact
    (-
      1
      (/ (lowerBound i) (center i)))))

(define (center i)
  (/ (+ (lowerBound i) (upperBound i)) 2))

(define (width i)
  (/ (- (upperBound i) (lowerBound i)) 2))

(define (percent i)
  (format "~a%" (inexact->exact (* (percentValue i) 100))))

(check-equal? (lowerBound (makeInterval 1 2)) 1)
(check-equal? (upperBound (makeInterval 1 2)) 2)
(check-equal? (makeCenterPercent 10 0.1) (makeInterval 9 11))
(check-equal? (percentValue (makeCenterPercent 10 0.1)) 0.1)
(check-equal? (percent (makeCenterPercent 10 0.1)) "10%")
