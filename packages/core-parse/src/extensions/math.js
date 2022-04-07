/** Mathematics role and directive.
 *
 * Note node naming follows https://github.com/syntax-tree/mdast-util-math
 */
import { u } from 'unist-builder'

import { RoleProcessor } from '../roleProcessor.js'
import { DirectiveProcessor } from '../directiveProcessor.js'

class MathRole extends RoleProcessor {
    run() {
        return [u('inlineMath', { value: this.node.value })]
    }
}

export class MathDirective extends DirectiveProcessor {
    static required_arguments = 0
    static optional_arguments = 0
    static final_argument_whitespace = false
    static has_content = true
    static option_spec = {
        label: null,
    }
    run() {
        const node = u('math', { value: this.node.body })
        if (this.node.options.label) {
            // @ts-ignore
            node.label = this.node.options.label
        }
        return [node]
    }
}

export const mathExtension = {
    name: 'math',
    /** @type {Record<string, {processor: typeof RoleProcessor}>} */
    roles: { math: { processor: MathRole } },
    /** @type {Record<string, {processor: typeof DirectiveProcessor}>} */
    directives: { math: { processor: MathDirective } },
}