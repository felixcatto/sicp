#lang sicp
(#%require racket)
(#%require rackunit)

(define (makeMonitored func)
  (define count 0)
  (lambda args
    (define firstArg (car args))
    (cond
      [(eq? firstArg 'howManyCalls) count]
      [(eq? firstArg 'resetCout) (set! count 0)]
      [else
        (begin
          (set! count (inc count))
          (apply func args))
      ])))

(define s (makeMonitored sqrt))
(define ss (makeMonitored sqrt))

(check-equal? (s 100) 10)
(check-equal? (s 16) 4)
(check-equal? (ss 4) 2)
(check-equal? (s 'howManyCalls) 2)
(s 'resetCout)
(check-equal? (s 'howManyCalls) 0)
(check-equal? (ss 'howManyCalls) 1)
