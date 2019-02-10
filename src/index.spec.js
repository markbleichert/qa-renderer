/* eslint-disable */
import { Runtime } from './index';
import data from '../qa-data-config';

describe('QARunner', () => {
    let runner;

    beforeEach(() => {
        runner = new Runtime(data);
        runner.start();
    });

    afterEach(() => {
       runner = null;
    });

    test('should render first question', () => {
        expect(runner.currentNode).toBe(data.nodes[0]);
        expect(runner.currentNode.id).toEqual('1');
        expect(runner.currentNode.question).not.toBe(null);
    });

    test('should render next question when answer is no', () => {
        runner.moveNext('no');

        expect(runner.currentNode).toBe(data.nodes[1]);
        expect(runner.currentNode.id).toEqual('2');
        expect(runner.currentNode.question).not.toBe(null);
    });

    test('should render endpoint when answer is yes', () => {
        runner.moveNext('yes');

        expect(runner.currentNode).toBe(data.nodes[4]);
        expect(runner.currentNode.id).toEqual('5');
        expect(runner.currentNode.type).toEqual('Endpoint');
    });
});
