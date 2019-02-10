/* eslint-disable */
import { Runtime } from './index';
import data from '../qa-data-config';

describe('QARunner', () => {
    test('should render first question', () => {
        const runner = new Runtime();

        runner.renderDialog(data);

        expect(runner.currentNode).toBe(data.nodes[0]);
        expect(runner.currentNode.id).toEqual('1');
        expect(runner.currentNode.question).not.toBe(null);
    });
});
