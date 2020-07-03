#lang sicp
(#%require racket)
(#%require rackunit)

(provide
  prime?
  flatmap
  enumerateInterval)

(define (square x) (* x x))
(define (divides? a b)
  (= (remainder b a) 0))
(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
  ((divides? test-divisor n) test-divisor)
  (else (find-divisor n (+ test-divisor 1)))))
(define (smallest-divisor n)
  (find-divisor n 2))
(define (prime? n)
  (= n (smallest-divisor n)))
(define (prime-sum? pair)
  (prime? (+ (car pair) (cadr pair))))
(define (make-pair-sum pair)
  (list (car pair) (cadr pair) (+ (car pair) (cadr pair))))
(define (prime-sum-pairs n)
  (map make-pair-sum
    (filter prime-sum?
      (flatmap
        (lambda (i)
          (map
            (lambda (j) (list i j))
            (enumerateInterval 1 (- i 1))))
        (enumerateInterval 1 n)))))

(define (flatmap proc seq)
  (foldr append nil (map proc seq)))

(define (enumerateInterval low high)
  (if (> low high)
  nil
  (cons low (enumerateInterval (+ low 1) high))))



(define (uniquePairs n)
  (flatmap
    (lambda (i)
      (map
        (lambda (j) (list i j))
        (enumerateInterval 1 (dec i))))
    (enumerateInterval 1 n)))

(define (primeSumPairs n)
  (filter
    (lambda (listTriple) (prime? (caddr listTriple)))
    (map
      (lambda (listPair)
        (list
          (car listPair)
          (cadr listPair)
          (+ (car listPair) (cadr listPair))))
      (uniquePairs n))))

(check-equal? (primeSumPairs 3) (list (list 2 1 3) (list 3 2 5)))
