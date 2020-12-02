package main

import (
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	fmt.Println("Parsing....")
	templates := []string{}
	// walk the path and get a list of files for writing out
	filepath.Walk("./src", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		fmt.Printf("\nWalking and have %s\n", path)
		if !strings.Contains(path, "partials/") && strings.Contains(path, ".gohtml") {
			fmt.Printf("\t FOUND A TEMPLATE: %s\n", path)
			templates = append(templates, path)
		}
		// if it's a partial, go ahead and load it
		if strings.Contains(path, "partials/") {
			_, err = template.ParseFiles(path)
			fmt.Printf("\n\t Processing partial %s", path)
			if err != nil {
				fmt.Printf("\nERROR processing partial %s: %+v\n", path, err)
				os.Exit(2)
			}
		}

		return nil
	})

	// now we execute the templates
	for i := range templates {
		tpl, err := template.ParseFiles(templates[i])
		fmt.Printf("\nExecuting %+v\n", templates[i])
		if err != nil {
			fmt.Printf("\nERROR: %+v\n", err)
			os.Exit(2)
		}

		fileName := strings.Replace(templates[i], "src/", "build/", 1)
		fileName = strings.Replace(fileName, ".gohtml", ".html", 1)
		f, err := os.Create(fileName)
		if err != nil {
			fmt.Printf("\nERROR CREATING: %+v\n", err)
			os.Exit(2)
		}
		defer f.Close()
		err = tpl.Execute(f, nil)
		if err != nil {
			fmt.Printf("\nERROR EXECUTING: %+v\n", err)
			os.Exit(2)
		}
	}

}
