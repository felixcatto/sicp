#lang sicp
(#%require racket)
(#%require rackunit)
(#%require "02.rkt")

; (define (makeRectangle firstSegment lastSegment)
;   (cons firstSegment lastSegment))

; (define (getFirstSegment rectangle) (car rectangle))

; (define (getLastSegment rectangle) (cdr rectangle))

(define (makeRectangle firstPoint lastPoint)
  (cons firstPoint lastPoint))

(define (getFirstPoint rectangle) (car rectangle))

(define (getLastPoint rectangle) (cdr rectangle))

(define (getFirstSegment rectangle)
  (define firstPoint (getFirstPoint rectangle))
  (define lastPoint (getLastPoint rectangle))
  (makeSegment
    firstPoint
    (makePoint (getX firstPoint) (getY lastPoint))))

(define (getLastSegment rectangle)
  (define firstPoint (getFirstPoint rectangle))
  (define lastPoint (getLastPoint rectangle))
  (makeSegment
    (makePoint (getX firstPoint) (getY lastPoint))
    lastPoint))

; P = 2(a+b)
(define (getPerimeter rectangle)
  (define a (getSegmentLength (getFirstSegment rectangle)))
  (define b (getSegmentLength (getLastSegment rectangle)))
  (* 2 (+ a b)))

; S = a*b
(define (getSquare rectangle)
  (define a (getSegmentLength (getFirstSegment rectangle)))
  (define b (getSegmentLength (getLastSegment rectangle)))
  (* a b))

(define sg1
  (makeSegment
    (makePoint 0 0)
    (makePoint 0 3)))
(define sg2
  (makeSegment
    (makePoint 0 3)
    (makePoint 2 3)))
; (define rectangle (makeRectangle sg1 sg2))
(define rectangle (makeRectangle (makePoint 0 0) (makePoint 2 3)))


(check-equal? (getPerimeter rectangle) 10)
(check-equal? (getSquare rectangle) 6)
; (printPoint (getSegmentMid sg1))
; (getSegmentLength sg2)
