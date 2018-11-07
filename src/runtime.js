
export default class Runtime {
    constructor() {
        console.log('hello runtime !');
    }

    renderDialog(dialog, node) {
        this.dialog = dialog;

        if (!node) {
            for (let i = 0; i < dialog.nodes.length; i++) {
                if (dialog.nodes[i].id === dialog.root) {
                    node = dialog.nodes[i];
                    break;
                }
            }
        }

        // create a container for this flow
        if (!this.el) {
            this.el = this.createElement('div', 'dialog');
        }

        // clean container and set to current item
        this.reset(true);

        this.renderComponent(node)

        this.currentNode = node;

        return this.el;
    }

    reset(clean) {
        if (clean) {
            this.el.textContent = '';
        }
    }

    renderComponent(node) {
        switch (node.type) {
            case 'Question':
                this.renderQuestion(node);
                break;
            case 'Endpoint':
                this.renderEndpoint(node);
                break;
        }
    }

    createElement(tagName, className) {
        const el = document.createElement(tagName);
        el.setAttribute('class', className);

        return el;
    }

    renderOption(option) {
        const elOption = this.createElement('button', 'option');
        elOption.textContent = option.text;
        elOption.setAttribute('data-option-id', option.id);

        elOption.addEventListener('click', this.onOptionClick.bind(this));

        return elOption;
    }

    renderQuestion(node) {
        const elContent = this.createElement('div', 'content');
        const elOptions = this.createElement('div', 'options');

        for (let i = 0; i < node.options.length; i++) {
            elOptions.appendChild(this.renderOption(node.options[i]));
        }

        const elQuestion = this.createElement('h3', 'question-header');
        elQuestion.innerHTML = node.question;

        elContent.appendChild(elQuestion);
        elContent.appendChild(elOptions);

        this.el.appendChild(elContent);
    }

    renderEndpoint(node) {
        const elEndpoint = this.createElement('div', 'content');
        const elContent = this.createElement('h2', 'content-header');
        elContent.innerHTML = node.content;

        elEndpoint.appendChild(elContent);
        this.el.appendChild(elEndpoint);
    }

    onOptionClick(e) {
        const elOption = e.target;
        const optionId = elOption.getAttribute('data-option-id');

        let connectorOut;
        for (let i = 0; i < this.dialog.connectors.length; i++) {
            const connector = this.dialog.connectors[i];
            if (connector.source.id === this.currentNode.id && connector.source.port === optionId) {
                connectorOut = connector;
                break;
            }
        }

        if (connectorOut) {
            let nextNode;
            for (let i = 0; i < this.dialog.nodes.length; i++) {
                const node = this.dialog.nodes[i];
                if (node.id === connectorOut.target.id) {
                    nextNode = node;
                    break;
                }
            }

            if (nextNode) {
                this.renderDialog(this.dialog, nextNode);
            }
        }
    }
}