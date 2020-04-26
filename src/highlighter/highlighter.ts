export class Highlighter {
  public reservedKeywordsRegex: RegExp;
  public literalsRegex: RegExp;
  public numberRegex: RegExp = /^-?[0-9]\d*(\.\d+)?$/g;
  public stringRegex: RegExp = /"(?:[^"\\]|\\.)*"/g;
  /**
   *
   */
  constructor(
    private language: ILanguage,
    private reservedKeywordsHighlighter: RegexHighlighterDelegate,
    private literalsHighlighter: RegexHighlighterDelegate,
    private stringHighlighter: RegexHighlighterDelegate
  ) {
    this.reservedKeywordsRegex = new RegExp(
      language.reservedKeywords.join("|"),
      "gi"
    );
    this.literalsRegex = new RegExp(language.literals.join("|"), "gi");
  }

  public runReplacement = (
    textToHighlight: string,
    regex: RegExp,
    delegate: RegexHighlighterDelegate
  ) => textToHighlight.replace(regex, ($0) => delegate($0));

  public highlight = (textToHighlight: string): string => {
    [
      {
        regex: this.reservedKeywordsRegex,
        delegate: this.reservedKeywordsHighlighter,
      },
      {
        regex: this.literalsRegex,
        delegate: this.literalsHighlighter,
      },
      {
        regex: this.numberRegex,
        delegate: this.literalsHighlighter,
      },
      {
        regex: this.stringRegex,
        delegate: this.stringHighlighter,
      },
    ].forEach((tuple) => {
      textToHighlight = this.runReplacement(
        textToHighlight,
        tuple.regex,
        tuple.delegate
      );
    });
    return textToHighlight;
  };
}

export type RegexHighlighterDelegate = (regexMatch: string) => string;

export interface ILanguage {
  reservedKeywords: string[];
  literals: string[];
}
