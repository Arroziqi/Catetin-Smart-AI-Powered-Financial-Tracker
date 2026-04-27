package utils

import (
	"regexp"
	"strings"
)

func CleanJSON(s string) string {
	s = strings.TrimSpace(s)

	s = strings.TrimPrefix(s, "```json")
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimSuffix(s, "```")

	re := regexp.MustCompile(`(?s)\{.*\}`)
	match := re.FindString(s)
	if match != "" {
		return match
	}

	return s
}
