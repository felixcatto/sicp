#lang sicp
(#%require racket)
(#%require rackunit)
(#%require "./03.rkt")

(define (makeJoint account password newPassword)
  (define (dispatch curPassword operation)
    (if (eq? curPassword newPassword)
      (account password operation)
      "Неверный пароль"))
  dispatch)

(define peterAcc
  (makeAccount 100 'secretPassword))

(define paulAcc
  (makeJoint peterAcc 'secretPassword 'openSesame))

(check-equal? 
  ((peterAcc 'secretPassword 'withdraw) 40)
  60)
(check-equal? 
  ((paulAcc 'openSesame 'withdraw) 40)
  20)

; // Direct way
; let makeAcc = (balance, password) => {
;   return {
;     withdraw: amount => {
;       balance -= amount;
;       return balance;
;     },
;     getPass: () => password,
;   };
; };

; let jointAcc = (acc, newPass) => {
;   return {
;     ...acc,
;     getPass: () => newPass,
;   };
; };

; let pacc = makeAcc(100, 'hurr');
; let lacc = jointAcc(pacc, 'sesame open');
; console.log(pacc.withdraw(20));
; console.log(pacc.withdraw(20));
; console.log(pacc.getPass());
; console.log(lacc.withdraw(20));
; console.log(lacc.withdraw(20));
; console.log(lacc.getPass());

; // Alternative way
; let makeAcc = balance => password => {
;   return {
;     withdraw: amount => {
;       balance -= amount;
;       return balance;
;     },
;     getPass: () => password,
;   };
; };

; let setPassword = makeAcc(100);
; let pacc = setPassword('hurr');
; let lacc = setPassword('sesame open');
; console.log(pacc.withdraw(20));
; console.log(pacc.withdraw(20));
; console.log(pacc.getPass());
; console.log(lacc.withdraw(20));
; console.log(lacc.withdraw(20));
; console.log(lacc.getPass());
