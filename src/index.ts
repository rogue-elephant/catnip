#!/usr/bin/env node
import * as fs from 'fs';
import * as kleur from 'kleur';
import { Highlighter, ILanguage } from './highlighter/highlighter';
import { Javascript } from './highlighter/languages/javascript';

const fileName = process.argv[2];
const fileExtension = fileName.split('.').pop();

fs.readFile(fileName, (err, data) => {
  const text = data.toString();
  const language = new Highlighter(getLanguageByExtension(fileExtension as string), (keyword: string) => kleur.blue(keyword), (literal: string) => kleur.magenta(literal));
  process.stdout.write(language.highlight(text));
});


// tslint:disable-next-line: no-unused-expression
const getLanguageByExtension = (extension: string) => {
    switch (extension) {
        case 'js':
            return Javascript;
    
        default:
            throw "Extension not supported";
    }
}