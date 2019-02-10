export default {
    root: '1',
    nodes: [{
        id: '1',
        type: 'Question',
        question: 'Are you a dork?',
        options: [{
            id: 'yes',
            text: 'Yes'
        }, {
            id: 'no',
            text: 'No'
        }]
    }, {
        id: '2',
        type: 'Question',
        question: 'Are you a geek?',
        options: [{
            id: 'yes',
            text: 'Yes'
        }, {
            id: 'no',
            text: 'No'
        }]
    }, {
        id: '3',
        type: 'Question',
        question: 'Are you a technology freak?',
        options: [{
            id: 'yes',
            text: 'Yes'
        }, {
            id: 'no',
            text: 'No'
        }]
    }, {
        id: '4',
        type: 'Question',
        question: 'Do you have programming skills?',
        options: [{
            id: 'expert',
            text: 'expert'
        }, {
            id: 'some',
            text: 'some'
        }, {
            id: 'no',
            text: 'No'
        }]
    }, {
        id: '5',
        type: 'Endpoint',
        content: 'We do not employ dorks!'
    }, {
        id: '6',
        type: 'Endpoint',
        content: 'Ok you are hired !'
    }, {
        id: '7',
        type: 'Endpoint',
        content: 'Sorry bye!'
    }, {
        id: '20',
        type: 'Endpoint',
        content: 'Go work for google then !'
    }],

    connectors: [{
        id: '8',
        type: 'connector',
        source: {
            id: '1',
            port: 'no'
        },
        target: {
            id: '2'
        }
    }, {
        id: '9',
        type: 'connector',
        source: {
            id: '1',
            port: 'yes'
        },
        target: {
            id: '5'
        }
    }, {
        id: '10',
        type: 'connector',
        source: {
            id: '2',
            port: 'yes'
        },
        target: {
            id: '3'
        }
    }, {
        id: '11',
        type: 'connector',
        source: {
            id: '2',
            port: 'no'
        },
        target: {
            id: '4'
        }
    }, {
        id: '12',
        type: 'connector',
        source: {
            id: '2',
            port: 'yes'
        },
        target: {
            id: '3'
        }
    }, {
        id: '13',
        type: 'connector',
        source: {
            id: '3',
            port: 'no'
        },
        target: {
            id: '7'
        }
    }, {
        id: '14',
        type: 'connector',
        source: {
            id: '3',
            port: 'yes'
        },
        target: {
            id: '4'
        }
    }, {
        id: '15',
        type: 'connector',
        source: {
            id: '4',
            port: 'no'
        },
        target: {
            id: '7'
        }
    }, {
        id: '16',
        type: 'connector',
        source: {
            id: '4',
            port: 'some'
        },
        target: {
            id: '6'
        }
    }, {
        id: '17',
        type: 'connector',
        source: {
            id: '4',
            port: 'expert'
        },
        target: {
            id: '20'
        }
    }]
};
