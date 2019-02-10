function createElement(tagName, attrib = 'class', name) {
    const el = document.createElement(tagName);
    el.setAttribute(attrib, name);

    return el;
}

function createContainer(id) {
    let container = document.getElementById(id);

    if (!container) {
        container = createElement('div', 'id', id);
        document.body.appendChild(container);
    }
    return container;
}

class Runtime {
    constructor(dialog, elementId) {
        this.elementId = elementId;
        this.dialog = dialog;
        this.el = createContainer(elementId);
    }

    getRootNode() {
        return this.findNodeById(this.dialog.root);
    }

    start() {
        this.renderDialog(this.getRootNode());
    }

    renderDialog(node) {
        this.currentNode = node;

        this.reset(true);

        this.renderComponent(node);
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
        default:
        }
    }

    renderOption(option) {
        const elOption = createElement('button', 'class', 'option');
        elOption.textContent = option.text;
        elOption.setAttribute('data-option-id', option.id);

        elOption.addEventListener('click', this.onOptionClick.bind(this));

        return elOption;
    }

    renderQuestion(node) {
        const elContent = createElement('div', 'class', 'content');
        const elOptions = createElement('div', 'class', 'options');

        for (let i = 0; i < node.options.length; i++) {
            elOptions.appendChild(this.renderOption(node.options[i]));
        }

        const elQuestion = createElement('h3', 'class', 'question-header');
        elQuestion.innerHTML = node.question;

        elContent.appendChild(elQuestion);
        elContent.appendChild(elOptions);

        this.el.appendChild(elContent);
    }

    renderEndpoint(node) {
        const elEndpoint = createElement('div', 'class', 'content');
        const elContent = createElement('h2', 'class', 'content-header');
        elContent.innerHTML = node.content;

        elEndpoint.appendChild(elContent);
        this.el.appendChild(elEndpoint);
    }

    findNodeById(id) {
        let nextNode;
        for (let i = 0; i < this.dialog.nodes.length; i++) {
            const node = this.dialog.nodes[i];
            if (node.id === id) {
                nextNode = node;
                break;
            }
        }
        return nextNode;
    }

    findConnectorById(optionId) {
        let connectorOut;
        for (let i = 0; i < this.dialog.connectors.length; i++) {
            const connector = this.dialog.connectors[i];
            if (connector.source.id === this.currentNode.id && connector.source.port === optionId) {
                connectorOut = connector;
                break;
            }
        }
        return connectorOut;
    }

    moveNext(optionId) {
        const connectorOut = this.findConnectorById(optionId);
        const nextNode = this.findNodeById(connectorOut.target.id);

        if (nextNode) {
            this.renderDialog(nextNode);
        }
    }

    onOptionClick(e) {
        const elOption = e.target;
        const optionId = elOption.getAttribute('data-option-id');

        this.moveNext(optionId);
    }
}

export { Runtime };
