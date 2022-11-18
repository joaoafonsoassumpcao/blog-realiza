package models

type Blog struct {
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	UserID      string `json:"user_id"`
	Date        string `json:"date"`
	User        User   `gorm:"foreignKey:UserID"`
	Category    string `json:"category"`
	Resumo      string `json:"resumo"`
}
