#lang sicp
(#%require racket)
(#%require rackunit)

(provide
  makePoint
  getX
  getY
  printPoint
  makeSegment
  getSegmentStart
  getSegmentEnd
  getSegmentMid
  getSegmentLength
  printSegment)

(define (makePoint x y)
  (cons x y))

(define (getX point) (car point))

(define (getY point) (cdr point))

(define (printPoint p [withEof #t])
  (display "(")
  (display (getX p))
  (display ",")
  (display (getY p))
  (display ")")
  (if
    withEof
    (display "\n")
    nil))

(define (isPointsEqual pointA pointB)
  (and
    (= (getX pointA) (getX pointB))
    (= (getY pointA) (getY pointB))))

(define (makeSegment startPoint endPoint)
  (cons startPoint endPoint))

(define (getSegmentStart segment) (car segment))

(define (getSegmentEnd segment) (cdr segment))

(define (getSegmentMid segment)
  (define startPoint (getSegmentStart segment))
  (define endPoint (getSegmentEnd segment))
  (makePoint
    (/
      (+ (getX startPoint) (getX endPoint))
      2.0)
    (/
      (+ (getY startPoint) (getY endPoint))
      2.0)))

(define (getSegmentLength segment)
  (define startPoint (getSegmentStart segment))
  (define endPoint (getSegmentEnd segment))
  (sqrt
    (+
      (expt (- (getX endPoint) (getX startPoint)) 2)
      (expt (- (getY endPoint) (getY startPoint)) 2))))

(define (printSegment segment)
  (define startPoint (getSegmentStart segment))
  (define endPoint (getSegmentEnd segment))
  (display "[")
  (printPoint startPoint #f)
  (display " - ")
  (printPoint endPoint #f)
  (displayln "]"))

(define segment
  (makeSegment
    (makePoint 0 0)
    (makePoint 4 6)))
(define midPoint (makePoint 2 3))
; (printPoint (getSegmentMid segment))
; (printPoint midPoint)

(check-true
  (isPointsEqual
    (getSegmentMid segment)
    midPoint))
