import { createSourceFile, forEachChild, Node, ScriptTarget, StringLiteral, SyntaxKind } from 'typescript';

export interface StripWhitespaceOptions {
  shouldStripWhitespace?: ShouldStripWhitespace;
}

export interface ShouldStripWhitespace {
  (value: string): boolean;
}

export interface StringReplacement {
  end: number;
  start: number;
  text: string;
}

export interface Result {
  code: string;
  replacements: StringReplacement[];
}

export default class StripWhitespace {
  private options: StripWhitespaceOptions;
  private shouldStripWhitespace: ShouldStripWhitespace;

  constructor(options?: StripWhitespaceOptions) {
    this.options = options = options ? options : {};
    this.shouldStripWhitespace = options.shouldStripWhitespace ? options.shouldStripWhitespace : returnTrue;
  }

  public strip(code: string): Result {
    const sourceFile = createSourceFile('', code, ScriptTarget.Latest, true);
    const replacements = this.getStringReplacements(sourceFile);

    const sortedReplacements = this.sortReplacements(replacements);
    code = this.makeAllReplacements(code, sortedReplacements);
    return { code, replacements: sortedReplacements };
  }

  private stripString(fatString: string): string {
    return fatString.replace(/[\s]+/g, ' ');
  }

  private formatString(strippedString: string): string {
    return JSON.stringify(strippedString);
  }

  private getStringReplacements(startingNode: Node): StringReplacement[] {
    const stringList: StringReplacement[] = [];
    const walk = this.createWalker((node) => {
      if (node.kind !== SyntaxKind.StringLiteral) {
        return;
      }

      // make sure this string is not part of an property assignment { "a": 123 }
      if (node.parent && node.parent.kind === SyntaxKind.PropertyAssignment) {
        if (node.parent.getChildAt(0) === node) {
          return;
        }
      }

      const text = (node as StringLiteral).text;
      if (!this.shouldStripWhitespace(text)) {
        return;
      }

      const strippedText = this.stripString(text);
      if (text === strippedText) {
        return;
      }

      stringList.push({
        end: node.getEnd(),
        start: node.getStart(),
        text: this.formatString(strippedText)
      });
    });
    walk(startingNode);
    return this.sortReplacements(stringList);
  }

  private makeAllReplacements(code: string, replacements: StringReplacement[]): string {
    const codeBuffer = [];
    let cursor = 0;
    for (let replacement of replacements) {
      codeBuffer.push(code.substring(cursor, replacement.start));
      codeBuffer.push(replacement.text);
      cursor = replacement.end;
    }
    codeBuffer.push(code.substring(cursor, code.length));

    return codeBuffer.join('');
  }

  private sortReplacements(replacements: StringReplacement[]) {
    return replacements.sort((a, b) => a.start > b.start ? 1 : a.start < b.start ? -1 : 0);
  }

  private createWalker(traverser: (node: Node) => void) {
    const walker = (node: Node) => {
      traverser(node);
      forEachChild(node, walker);
    };
    return walker;
  }
}

function returnTrue() {
  return true;
}
