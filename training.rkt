#lang sicp
(#%require racket)
(#%require "math.rkt")

; (define (displayln x)
;   (display x)
;   (display "\n"))

; (display (
;   - (+ 4 2)
;     (* 3 5)
;     (/ 8 7)))


; (define lang "racket")
; (display lang) ; => "racket"


; ((lambda ()
;         (display "one\n")
;         (display "two\n")))

; (lambda () (display "hello!"))

; (define square (lambda (n) (* n n)))
; (define cube (lambda (n) (* n n n)))
; (cube 4)

; (lambda (n) (* n n))
; ((lambda (n) (* n n)) 5)

; (define middle ((lambda (a b) (/ (+ a b) 2)) 2 4))
; (display middle)


; (define (sumOfSquares a b) (+ (* a a) (* b b)))
; (sumOfSquares 2 3)

; (define result (sum 5 3))
; (display result)

; (define (f)
;   (define text "lorem")
;   (displayln text))

; (f)

; (define (reload a b)
;   (+ a b))

; (displayln (reload 1 2))

; (let (
;   [x 322]
;   [y 644]) (displayln (+ x y)))


; (define (square-of-sum x y) (
;   let ([sum (+ x y)])
;     (* sum sum)
;   ))
; (square-of-sum 2 3) ; 25

; (= 42 42)
; (not "moon")
; (and #t #t)




; (define (even? x)
;   (= (remainder x 2) 0))
; (define (odd? x)
;   (not (even? x)))

; (define (same-parity? x y)
;   (or
;     (and
;       (odd? x)
;       (odd? y))
;     (and
;       (not (odd? x))
;       (not (odd? y)))))




; (same-parity? 3 7) ; #t
; (same-parity? 4 8) ; #t
; (same-parity? 4 7) ; #f
; (same-parity? 3 10) ; #f


; (if (> 3 2) (displayln "yes") (displayln "no"))

; (string-upcase "abcde")
; (string-length "abcde")
; (string? "abcde")
; (string=? "Apple" "Apple")
; (string-upcase "abc!")

; (define (sentence-type str)
;   (if
;     (equal? (string-upcase str) str)
;     "cry"
;     "common"))

; (sentence-type "HOW ARE YOU?") ; "cry"
; (sentence-type "Hello, world!") ; "common"


; ((lambda () nil))


; (define (say-boom str)
;   (when (equal? str "go") "Boom!"))

; (say-boom "go")



; (define (humanize-permission permission)
;   (case permission
;     [("x") "execute"]
;     [("r") "read"]
;     [("w") "write"]
;     [else "wrong permission"]))

; (humanize-permission "x") ; execute
; (humanize-permission "r") ; read
; (humanize-permission "w") ; write
; (humanize-permission "ggwp") ; ??




; (define (programmer-level n)
;   (cond
;     [(< n 10) "junior"]
;     [(<= n 20) "middle"]
;     [(> n 20) "senior"]
;     [else "??"]))

; (programmer-level 10) ; middle
; (programmer-level 0) ; junior
; (programmer-level 40) ; senior

; (define (improveGuess n guess)
;   (displayln 322)
;   (if #f 1 2))

; (improveGuess 2.0 1)






; (define x (cons 1 2))
; (car x)
; (cdr x)
; (gcd -6 -9)
; (define y 2)
; (- y)
(cadr (list 1 2 3))
(null? (cdddr (list 1 2 3)))
(odd? 1)