import { micromark } from 'micromark'

import { mystCommentMmarkExt, mystCommentHtmlExt } from '../src/index.js'

const fixtures = ['%', '% ', '% abc', '% &', '- a\n% b', '% abc\n% def']

describe('Convert source to HTML', () => {
    test.each(fixtures)(`%j`, (content) => {
        const options = {
            extensions: [mystCommentMmarkExt],
            htmlExtensions: [mystCommentHtmlExt],
        }
        const htmlText = micromark(content, options)
        expect(htmlText).toMatchSnapshot()
    })
})
