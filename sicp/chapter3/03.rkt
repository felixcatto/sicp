#lang sicp
(#%require racket)
(#%require rackunit)

(define (makeAccount balance password)
  (define wrongPasswordTryCount 0)
  (define (resetWPTCount) (set! wrongPasswordTryCount 0))
  (define (increaseWPTCount) (set! wrongPasswordTryCount (inc wrongPasswordTryCount)))
  (define (callTheCops) "Enough of this, have at you!")
  (define (withdraw amount)
    (if (>= balance amount)
      (begin
        (set! balance (- balance amount))
        balance)
      "Недостаточно денег на счете"))
  (define (deposit amount)
    (set! balance (+ balance amount))
    balance)
  (define (dispatch currPassword operation)
    (if (not (eq? currPassword password))
      (begin
        (increaseWPTCount)
        (if (>= wrongPasswordTryCount 3)
          (lambda (amount) (callTheCops))
          (lambda (amount) "Неверный пароль")))
      (begin
        (resetWPTCount)
        (cond
          [(eq? operation 'withdraw) withdraw]
          [(eq? operation 'deposit) deposit]))))
  dispatch)

(define acc (makeAccount 100 'secret-password))

(check-equal? 
  ((acc 'secret-password 'withdraw) 40)
  60)
(check-equal? 
  ((acc 'secret-password 'withdraw) 140)
  "Недостаточно денег на счете")
(check-equal? 
  ((acc 'secret-password 'withdraw) 50)
  10)
(check-equal?
  ((acc 'some-other-password 'deposit) 50)
  "Неверный пароль")
(check-equal?
  ((acc 'secret-password 'deposit) 40)
  50)

(check-equal?
  ((acc 'some-other-password 'deposit) 50)
  "Неверный пароль")
(check-equal?
  ((acc 'some-other-password 'deposit) 50)
  "Неверный пароль")
(check-equal?
  ((acc 'some-other-password 'deposit) 50)
  "Enough of this, have at you!")