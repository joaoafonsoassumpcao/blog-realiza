package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID       uint   `json:"id"`
	Nome     string `json:"nome"`
	Email    string `json:"email"`
	Password []byte `json:"-"`
	Image    string `json:"image"`
}

func (u *User) SetPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword(u.Password, []byte(password))
	return err == nil
}
