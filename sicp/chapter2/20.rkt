#lang sicp
(#%require racket)
(#%require rackunit)

(define (sameParity . items)
  (define firstItem (car items))
  (define isSameParity
    (if (even? firstItem) even? odd?))
  (define (iter acc restItems)
    (cond
      [(null? restItems) (reverse acc)]
      [
        (isSameParity (car restItems))
        (iter (cons (car restItems) acc) (cdr restItems))]
      [else (iter acc (cdr restItems))]))
  (iter '() items))

(check-equal? (sameParity 1 2 3 4 5 6 7) (list 1 3 5 7))
(check-equal? (sameParity 2 3 4 5 6 7) (list 2 4 6))
